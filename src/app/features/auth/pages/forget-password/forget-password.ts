import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { VerifyEmail } from './verify-email/verify-email';
import { VerifyCode } from './verify-code/verify-code';
import { ResetPassword } from './reset-password/reset-password';

@Component({
  selector: 'app-forget-password',
  imports: [NgTemplateOutlet, VerifyEmail, VerifyCode, ResetPassword],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
  currentStep!: TemplateRef<unknown>;

  email = viewChild.required<TemplateRef<unknown>>('verifyEmail');
  code = viewChild.required<TemplateRef<unknown>>('verifyCode');
  resetPassword = viewChild.required<TemplateRef<unknown>>('resetPassword');

  ngOnInit(): void {
    this.currentStep = this.email();
  }

  onEmail() {
    this.currentStep = this.code();
  }

  onCode() {
    this.currentStep = this.resetPassword();
  }
}
