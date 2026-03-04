import { Component, input, signal } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  imports: [FormsModule],
  templateUrl: './base-input.html',
  styleUrl: './base-input.scss',
})
export class BaseInput {
  control = input.required<AbstractControl<string>>();
  type = input.required<string>();
  placeholder = input.required<string>();
  value = '';
  showPassword = signal<boolean>(false);

  onChange() {
    this.control().setValue(this.value);
  }

  togglePassword() {
    this.showPassword.update((cur) => !cur);
  }
}
