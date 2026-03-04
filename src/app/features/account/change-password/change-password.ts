import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { env } from '@env/env';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { BaseInput } from '../../auth/components/base-input/base-input';
import { CtrlError } from '../../auth/components/ctrl-error/ctrl-error';
import { SubmitBtn } from '../../auth/components/submit-btn/submit-btn';
import { Message } from 'primeng/message';
import { AuthApiService } from '@elevate-super-fitness/auth-api';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-change-password',
  imports: [
    TranslateModule,
    DialogModule,
    ReactiveFormsModule,
    BaseInput,
    CtrlError,
    SubmitBtn,
    Message,
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword implements OnInit {
  form: FormGroup;

  passwordVisible = false;

  isSubmitting = signal<boolean>(false);
  error = signal<string>('');

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthApiService);
  private readonly _localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordREG),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordREG),
      ]),
    });
  }

  showPasswordDialog() {
    this.passwordVisible = true;
  }

  onSubmitPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.error.set('');

      const subscription = this._authService
        .changePassword(this.form.value)
        .subscribe({
          next: (res) => {
            this._localStorage.set('logged-user', res);
            this.form.reset();
            this.passwordVisible = false;
          },
          error: (err) => {
            this.error.set(err);
            this.isSubmitting.set(false);
          },
          complete: () => {
            this.isSubmitting.set(false);
          },
        });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
