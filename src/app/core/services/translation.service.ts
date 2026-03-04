import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  lang = signal<string>('en');
  private readonly langKey = 'lang';

  private readonly cookies = inject(CookiesService);
  private readonly root = inject(DOCUMENT);

  private translate = inject(TranslateService);

  initTranslate() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.use('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');

    const lang = this.cookies.getCookie(this.langKey);

    if (lang) this.changeLang(lang);

    return this.translate.use(lang || 'en');
  }

  changeLang(language: string): void {
    this.translate.use(language);
    this.setHTMLLang(language);
    this.lang.set(language);

    this.cookies.setCookie(this.langKey, language);
  }

  setHTMLLang(lang: string): void {
    if (lang === 'ar') {
      this.root.documentElement.lang = 'ar';
      this.root.documentElement.dir = 'rtl';
    } else {
      this.root.documentElement.lang = 'en';
      this.root.documentElement.dir = 'ltr';
    }
  }
}
