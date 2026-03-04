import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
/**
 * Cookie options interface
 */
export interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
  maxAge?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  /**
   * Default cookie options
   */
  DEFAULT_COOKIE_OPTIONS: CookieOptions = {
    path: '/',
    sameSite: 'lax',
    secure: true,
  };
  constructor() {}
  private readonly cookies = inject(SsrCookieService);

  /**
   * Set a cookie
   * @param name Cookie name
   * @param value Cookie value
   * @param options Cookie options
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    const cookieOptions = { ...this.DEFAULT_COOKIE_OPTIONS, ...options };
    this.cookies.set(name, value);
  }
  getCookie(name: string): string {
    return this.cookies.get(name);
  }

  deleteCookie(name: string): void {
    this.cookies.delete(name);
  }
}
