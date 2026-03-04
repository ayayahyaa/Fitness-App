import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { of, tap } from 'rxjs';
import { CookiesService } from './cookies.service';
import { Theme } from '../../shared/types/theme.type';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  // private readonly currentTheme = signal<Theme>('light');
  private readonly document = inject(DOCUMENT);
  // Cookie utility instance
  private _CookiesService = inject(CookiesService);
  // Create a signal with the initial theme value
  theme = signal<string>(
    this._CookiesService.getCookie(this.storageKey) || 'light'
  );
 
  setTheme(theme: Theme) {
    this.setHtmlTheme(theme); // Apply to <html>
    this.theme.set(theme);
  }
  // getTheme(): string {
  //   return this._CookiesService.getCookie(this.storageKey);
  //   // ('light' as Theme)) as Theme;
  // }
  getTheme() {
    return this.theme; // returns signal<string>
  }

  initialTheme() {
    let currentTheme = this.theme();
    //get '' if no theme
    currentTheme = currentTheme == '' ? 'light' : currentTheme;
    if (currentTheme) {
      // console.log('current theme', currentTheme);
      this.setTheme(currentTheme as Theme);
    }

    return of(currentTheme).pipe(
      tap(() => {
        //console.log(`Init Theme is  ==> ${currentTheme}`);
      })
    );
    // this.setCurrentTheme(currentTheme as Theme);
  }

  // setCurrentTheme(theme: Theme) {
  //   this.currentTheme.set(theme);
  //   //this.cookieUtils.setCookie(this.storageKey, theme);
  // }
  toggleTheme() {
    // if(this.cookieUtils.getCookie(this.storageKey)=='') {currentTheme='litt'}
    const currentTheme =
      this._CookiesService.getCookie(this.storageKey) ?? 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    this._CookiesService.setCookie(this.storageKey, newTheme);
  
  }

  private setHtmlTheme(theme: string) {
    // this.document.documentElement.classList.remove('light', 'dark');
    // this.document.documentElement.classList.add(theme);
    this.document.documentElement.setAttribute('data-theme', theme);
    // this.cookieUtils.setCookie(this.storageKey, theme);
  }


}
