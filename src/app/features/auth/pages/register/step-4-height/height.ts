import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { onHeight } from '@store/register/register.actions';
import { SubmitBtn } from '../../../components/submit-btn/submit-btn';
import { RegisterHeader } from '../../../components/register-header/register-header';
import { NumberPicker } from '../../../components/number-picker/number-picker';
import { Progress } from '../../../components/progress/progress';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-height',
  imports: [
    RegisterHeader,
    SubmitBtn,
    FormsModule,
    NumberPicker,
    Progress,
    TranslateModule,
  ],
  templateUrl: './height.html',
  styleUrl: './height.scss',
})
export class Height {
  steps = output();

  height = signal<number>(0);

  numbersRange = Array.from({ length: 50 }, (_, i) => i + 160);

  private _store = inject(Store);

  onSelect(val: number) {
    this.height.set(val);
  }

  onSubmit() {
    if (!this.height()) return;

    this._store.dispatch(onHeight({ height: this.height() }));

    this.steps.emit();
  }
}
