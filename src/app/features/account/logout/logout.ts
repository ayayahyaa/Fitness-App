import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@elevate-super-fitness/auth-api';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-logout',
  imports: [TranslateModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  private readonly _authService = inject(AuthApiService);
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _router = inject(Router);

  logout() {
    console.log('logout');

    this._authService.logout().subscribe({
      next: (res) => {
        this._localStorage.remove('logged-user');
        this._router.navigate(['/auth']);

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
