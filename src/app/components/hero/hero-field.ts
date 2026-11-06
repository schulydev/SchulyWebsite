// Animated dot field behind the hero, drawn by one WebGL fragment shader.
// Loaded lazily by the hero after first paint. It only runs while the hero is
// on screen and the tab is visible, at no more than 30 frames a second.

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_dpr;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  float sp = 22.0 * u_dpr;
  vec2 frag = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 cell = floor(frag / sp);
  vec2 centre = (cell + 0.5) * sp;
  float d = length(frag - centre);
  vec2 uv = centre / u_res;

  float t = u_time * 0.05;
  vec2 q = cell * 0.085;
  float n = noise(q + vec2(t, -t * 0.6)) * 0.65 + noise(q * 2.1 - vec2(t * 1.3, t)) * 0.35;
  float band = sin((uv.x * 1.3 + uv.y * 0.9) * 5.0 - u_time * 0.3) * 0.5 + 0.5;
  float e = smoothstep(0.46, 1.0, n * 0.75 + band * 0.4);

  vec2 v = (uv - vec2(0.5, 0.28)) * vec2(1.05, 1.7);
  float mask = smoothstep(0.9, 0.05, length(v));
  // Keep the column behind the copy calm so the text stays easy to read.
  mask *= 1.0 - 0.65 * (1.0 - smoothstep(0.16, 0.4, abs(uv.x - 0.5)));

  float r = mix(0.85, 1.7, e) * u_dpr;
  float dotA = 1.0 - smoothstep(r - 0.6 * u_dpr, r + 0.6 * u_dpr, d);
  float a = dotA * mask * (0.12 + e * 0.85);
  vec3 col = mix(vec3(0.6, 0.64, 0.72), vec3(0.31, 0.66, 1.0), e);
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/** Starts the field on `canvas`. Returns a stop function, or null when WebGL is unavailable. */
export function startField(canvas: HTMLCanvasElement, onFirstFrame: () => void): (() => void) | null {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uDpr = gl.getUniformLocation(program, 'u_dpr');

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const resize = () => {
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uDpr, dpr);
  };
  resize();

  let raf = 0;
  let last = 0;
  let onScreen = true;
  let first = true;
  const start = performance.now();

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < 33) return;
    last = now;
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (first) {
      first = false;
      onFirstFrame();
    }
  };

  const play = () => {
    if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) play();
    else pause();
  });
  io.observe(canvas);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVisibility);

  play();

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
