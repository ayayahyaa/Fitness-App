import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { onGoal } from '@store/register/register.actions';
import { RegisterHeader } from '../../../components/register-header/register-header';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { OptionPicker } from '../../../components/option-picker/option-picker';
import { Progress } from '../../../components/progress/progress';
import { goalOptions } from '@shared/constants/constansts';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-goal',
  imports: [
    RegisterHeader,
    SubmitBtn,
    FormsModule,
    OptionPicker,
    Progress,
    TranslateModule,
  ],
  templateUrl: './goal.html',
  styleUrl: './goal.scss',
})
export class Goal {
  options = goalOptions;

  steps = output();

  goal = signal<string>('');

  private _store = inject(Store);

  onSelect(val: string) {
    this.goal.set(val);
  }

  onSubmit() {
    if (!this.goal()) return;

    this._store.dispatch(onGoal({ goal: this.goal() }));

    this.steps.emit();
  }
}
