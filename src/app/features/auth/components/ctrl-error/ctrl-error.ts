import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-ctrl-error',
  imports: [MessageModule, TranslateModule],
  templateUrl: './ctrl-error.html',
  styleUrl: './ctrl-error.scss',
})
export class CtrlError {
  inputCtrl = input.required<AbstractControl | null>();
  fieldName = input<string>();
}
