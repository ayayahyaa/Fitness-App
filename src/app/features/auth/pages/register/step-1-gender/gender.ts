import { Component, inject, Input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { onGender } from '@store/register/register.actions';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { RegisterHeader } from '../../../components/register-header/register-header';
import { Progress } from '../../../components/progress/progress';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-gender',
  imports: [RegisterHeader, SubmitBtn, FormsModule, Progress, TranslateModule],
  templateUrl: './gender.html',
  styleUrl: './gender.scss',
})
export class Gender {
  steps = output();

  gender = signal<string>('');

  private _store = inject(Store);

  @Input() descriptionClass = '';


  onSubmit() {
    if (!this.gender()) return;

    this._store.dispatch(onGender({ gender: this.gender() }));

    this.steps.emit();
  }
}
