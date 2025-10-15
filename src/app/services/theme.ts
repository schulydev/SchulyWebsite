import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'schuly-theme';
  theme = signal<Theme>('system');
  isDark = signal(false);

  constructor() {
    // Load saved theme or default to system
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    // Update isDark based on theme
    effect(() => {
      const theme = this.theme();
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (theme === 'system') {
        this.isDark.set(systemPrefersDark);
      } else {
        this.isDark.set(theme === 'dark');
      }

      this.applyTheme();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.theme() === 'system') {
        this.isDark.set(e.matches);
        this.applyTheme();
      }
    });
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme() {
    const currentTheme = this.theme();
    if (currentTheme === 'light') {
      this.setTheme('dark');
    } else if (currentTheme === 'dark') {
      this.setTheme('system');
    } else {
      this.setTheme('light');
    }
  }

  private applyTheme() {
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
