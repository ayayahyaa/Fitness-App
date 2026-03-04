export interface LoggedUserDataRes {
  message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    photo: string;
    createdAt: string;
    passwordResetCode: string;
    passwordResetExpires: string;
    resetCodeVerified: boolean;
  };
}
