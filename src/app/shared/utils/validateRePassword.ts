import { AbstractControl, ValidationErrors } from '@angular/forms';

export function equalValues(control: AbstractControl): ValidationErrors | null {
  const passwordField = control.parent?.get('password')
    ? 'password'
    : 'newPassword';

  const password = control.parent?.get(`${passwordField}`)?.value;
  const confirmPassword = control.value;

  if (!password) return null;

  return password === confirmPassword ? null : { misMatch: true };
}
