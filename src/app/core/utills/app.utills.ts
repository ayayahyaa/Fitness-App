import { inject } from '@angular/core';
import { ThemeService } from '../services/theme-service.service';
import { TranslationService } from '../services/translation.service';
import { forkJoin } from 'rxjs';

export const appInit = () => {
  const themeManager = inject(ThemeService);
  const langManger = inject(TranslationService);

  return forkJoin([themeManager.initialTheme(), langManger.initTranslate()]);
};
