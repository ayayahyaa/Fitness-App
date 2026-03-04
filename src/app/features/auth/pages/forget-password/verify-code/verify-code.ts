import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthApiService } from '@elevate-super-fitness/auth-api';

import { Message } from 'primeng/message';
import { InputOtpModule } from 'primeng/inputotp';

import { CtrlError } from '../../../components/ctrl-error/ctrl-error';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-code',
  imports: [
    Message,
    CtrlError,
    SubmitBtn,
    ReactiveFormsModule,
    InputOtpModule,
    TranslateModule,
  ],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode implements OnInit {
  form: FormGroup;

  error = signal<string>('');
  message = signal<string>('');
  isSubmitting = signal<boolean>(false);

  steps = output();

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthApiService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.message.set('');
      this.error.set('');

      const subscription = this._authService
        .verifyCode(this.form.value)
        .subscribe({
          next: () => {
            this.steps.emit();
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

  onResendCode() {
    const email = sessionStorage.getItem('forgetEmail');

    if (!email) {
      this.error.set('Something went wrong, Please try again later!!');
    } else {
      this.isSubmitting.set(true);
      this.message.set('');
      this.error.set('');
      this.form.reset();

      const subscription = this._authService
        .forgetPassword({ email })
        .subscribe({
          next: () => this.message.set('Code resent successfully'),
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
