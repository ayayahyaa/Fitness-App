import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';

import { env } from '@env/env';
import { BaseInput } from '../../components/base-input/base-input';
import { CtrlError } from '../../components/ctrl-error/ctrl-error';
import { SubmitBtn } from '../../components/submit-btn/submit-btn';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthApiService } from 'libs/auth-api/src/lib/auth-api/auth-api.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    RouterLink,
    SubmitBtn,
    CtrlError,
    BaseInput,
    TranslateModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form: FormGroup;

  isSubmitting = signal<boolean>(false);
  error = signal<string>('');

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthApiService);
  private readonly _router = inject(Router);
  private readonly _localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordREG),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.error.set('');
      const subscription = this._authService.login(this.form.value).subscribe({
        next: (res) => {
          this._localStorage.set('logged-user', res.token);
          this._router.navigate(['/']);
        },
        error: (err) => {
          this.error.set(err);
          this.isSubmitting.set(false);
        },
        complete: () => {
          this.isSubmitting.set(false);
          this.form.reset();
        },
      });
      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
