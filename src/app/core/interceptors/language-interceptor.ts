import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { CookiesService } from '../services/cookies.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  //get used language
  const cookies = inject(CookiesService);
  // Create a signal with the initial theme value
  const appLanguage = signal<string>(cookies.getCookie('lang') || 'en');
  //ignore meals API
  const isMealDb = req.url.includes('www.themealdb.com');

  if (!isMealDb)
    req = req.clone({
      setHeaders: {
        'accept-language': appLanguage(),
      },
    });

  return next(req);
};
