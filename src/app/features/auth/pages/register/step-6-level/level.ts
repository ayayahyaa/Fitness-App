import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from 'libs/auth-api/src/lib/auth-api/auth-api.service';
import { Store } from '@ngrx/store';
import { onLevel } from '@store/register/register.actions';
import { RegisterData } from '@shared/types/auth-register';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { OptionPicker } from '../../../components/option-picker/option-picker';
import { RegisterHeader } from '../../../components/register-header/register-header';
import { Progress } from '../../../components/progress/progress';
import { levelOptions } from '@shared/constants/constansts';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-level',
  imports: [
    RegisterHeader,
    SubmitBtn,
    FormsModule,
    OptionPicker,
    Progress,
    TranslateModule,
  ],
  templateUrl: './level.html',
  styleUrl: './level.scss',
})
export class Level implements OnInit {
  options = levelOptions;

  steps = output<string>();

  level = signal<string>('');
  isSubmitting = signal<boolean>(false);

  data = signal<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    gender: '',
    height: 0,
    weight: 0,
    age: 0,
    goal: '',
    activityLevel: '',
  });

  private _store = inject(Store);
  private readonly _authService = inject(AuthApiService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._store.select('register').subscribe({
      next: (state) => {
        const { type, ...formData } = state;

        this.data.set(formData);
      },
    });
  }

  onSelect(val: string) {
    this.level.set(val);
    this._store.dispatch(onLevel({ activityLevel: val }));
  }

  onSubmit() {
    if (!this.level()) {
      return;
    } else {
      this.isSubmitting.set(true);
      console.log(this.data());

      const subscription = this._authService.register(this.data()).subscribe({
        next: () => this._router.navigate(['auth/login']),
        error: (err) => {
          this.isSubmitting.set(false);

          this.steps.emit(err);
        },
        complete: () => this.isSubmitting.set(false),
      });

      this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
