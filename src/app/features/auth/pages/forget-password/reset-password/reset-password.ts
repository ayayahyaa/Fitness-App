import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';

import { AuthApiService } from '@elevate-super-fitness/auth-api';

import { env } from '@env/env';
import { equalValues } from '@shared/utils/validateRePassword';
import { CtrlError } from '../../../components/ctrl-error/ctrl-error';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { BaseInput } from '../../../components/base-input/base-input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    Message,
    CtrlError,
    SubmitBtn,
    BaseInput,
    TranslateModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  form: FormGroup;

  error = signal<string>('');
  isSubmitting = signal<boolean>(false);

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthApiService);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(`${sessionStorage.getItem('forgetEmail') ?? ''}`, [
        Validators.required,
        Validators.email,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(env.passwordREG),
      ]),
      rePassword: new FormControl('', [Validators.required, equalValues]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.error.set('');

      const formData = {
        email: this.form.controls.email.value,
        newPassword: this.form.controls.newPassword.value,
      };

      const subscription = this._authService.resetPassword(formData).subscribe({
        next: () => {
          sessionStorage.removeItem('forgetEmail');

          this._router.navigate(['/auth/login']);
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
