import { Component, inject, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { onInfo } from '@store/register/register.actions';
import { env } from '@env/env';
import { equalValues } from '@shared/utils/validateRePassword';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { CtrlError } from '../../../components/ctrl-error/ctrl-error';
import { BaseInput } from '../../../components/base-input/base-input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  imports: [
    SubmitBtn,
    CtrlError,
    ReactiveFormsModule,
    RouterLink,
    BaseInput,
    TranslateModule,
  ],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info implements OnInit {
  form: FormGroup;

  steps = output();

  private _store = inject(Store);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
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
      this._store.dispatch(onInfo(this.form.value));
      this.steps.emit();
    }
  }
}
