import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { CtrlError } from '../../../components/ctrl-error/ctrl-error';
import { BaseInput } from '../../../components/base-input/base-input';
import { Message } from 'primeng/message';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '@elevate-super-fitness/auth-api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  imports: [
    ReactiveFormsModule,
    SubmitBtn,
    CtrlError,
    BaseInput,
    Message,
    TranslateModule,
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail implements OnInit {
  form: FormGroup;

  error = signal<string>('');
  isSubmitting = signal<boolean>(false);

  steps = output();

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthApiService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.isSubmitting.set(true);
      this.error.set('');

      const subscription = this._authService
        .forgetPassword(this.form.value)
        .subscribe({
          next: () => {
            sessionStorage.setItem('forgetEmail', this.form.value.email);

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
}
