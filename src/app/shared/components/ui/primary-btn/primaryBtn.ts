import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-btn',
  imports: [CommonModule],
  templateUrl: './primaryBtn.html',
  styleUrl: './primaryBtn.scss',
})
export class PrimaryBtn {
  @Input() text = 'Button';
  @Input() type: 'filled' | 'outlined' = 'filled';
}