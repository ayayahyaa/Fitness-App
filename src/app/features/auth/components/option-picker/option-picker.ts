import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-option-picker',
  imports: [TranslateModule],
  templateUrl: './option-picker.html',
  styleUrl: './option-picker.scss',
})
export class OptionPicker {
  options = input.required<{ label: string; value: string }[]>();

  payload = output<string>();

  handleClick(val: string) {
    this.payload.emit(val);
  }
}
