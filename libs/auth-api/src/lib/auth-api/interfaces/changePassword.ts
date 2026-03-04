export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

export interface ChangePasswordRes {
  message: string;
  token: string;
}
