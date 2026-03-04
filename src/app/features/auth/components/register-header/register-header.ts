import { Component, input } from '@angular/core';

@Component({
  selector: 'app-register-header',
  templateUrl: './register-header.html',
  styleUrl: './register-header.scss',
})
export class RegisterHeader {
  heading = input.required<string>();
  description = input.required<string>();
}
