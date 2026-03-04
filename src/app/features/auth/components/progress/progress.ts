import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Knob } from 'primeng/knob';

@Component({
  selector: 'app-progress',
  imports: [Knob, FormsModule],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {
  @Input({ required: true }) stepNum!: number;
}
