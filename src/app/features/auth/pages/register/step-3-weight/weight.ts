import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { onWeight } from '@store/register/register.actions';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { RegisterHeader } from '../../../components/register-header/register-header';
import { NumberPicker } from '../../../components/number-picker/number-picker';
import { Progress } from '../../../components/progress/progress';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weight',
  imports: [
    RegisterHeader,
    SubmitBtn,
    FormsModule,
    NumberPicker,
    Progress,
    TranslateModule,
  ],
  templateUrl: './weight.html',
  styleUrl: './weight.scss',
})
export class Weight {
  steps = output();

  weight = signal<number>(0);

  numbersRange = Array.from({ length: 90 }, (_, i) => i + 40);

  private _store = inject(Store);

  onSelect(val: number) {
    this.weight.set(val);
  }

  onSubmit() {
    if (!this.weight()) return;

    this._store.dispatch(onWeight({ weight: this.weight() }));

    this.steps.emit();
  }
}
