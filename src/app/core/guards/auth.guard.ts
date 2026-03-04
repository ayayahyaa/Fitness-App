import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';

export const authGuard: CanActivateFn = () => {
  const _localStorageService = inject(LocalStorageService);
  const _router = inject(Router);

  const token = _localStorageService.get('logged-user');

  if (!token) {
    _router.navigate(['/auth/login']);
    return false;
  } else return true;
};
