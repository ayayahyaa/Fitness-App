import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { AuthApi } from './base/authApi';
import { LoginApiData, LoginRes } from './interfaces/loginRes';
import { LoginData } from './interfaces/loginData';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { RegisterData } from './interfaces/registerData';
import { Code, CodeRes } from './interfaces/verifyCodeData';
import { AuthApiAdaptorService } from './adaptor/authApi.adaptor';
import {
  LogoutRes,
  SetPassword,
  SetPasswordRes,
} from './interfaces/setPasswordData';
import {
  ForgetPasswordData,
  ForgetPasswordRes,
} from './interfaces/forgetPasswordData';
import { BASE_URL } from './base/token';
import { LoggedUserDataRes } from './interfaces/loggedUserDataRes';
import { EditProfileData, EditProfileRes } from './interfaces/editProfile';
import {
  ChangePasswordData,
  ChangePasswordRes,
} from './interfaces/changePassword';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  private readonly _http = inject(HttpClient);
  private readonly _authAdaptor = inject(AuthApiAdaptorService);
  private readonly _baseURL = inject(BASE_URL);

  loggedUserData() {
    return this._http
      .get<LoggedUserDataRes>(`${this._baseURL}${AuthEndPoint.PROFILE_DATA}`)
      .pipe(
        map((res) => res.user),
        catchError(() =>
          throwError(
            () => new Error('Could not get profile data, try again later!!')
          )
        )
      );
  }

  editProfile(data: EditProfileData) {
    return this._http
      .put<EditProfileRes>(`${this._baseURL}${AuthEndPoint.EDIT_PROFILE}`, data)
      .pipe(
        map((res) => res.user),
        catchError(() =>
          throwError(
            () => new Error('Could not edit profile, try again later!!')
          )
        )
      );
  }

  changePassword(data: ChangePasswordData) {
    return this._http
      .patch<ChangePasswordRes>(
        `${this._baseURL}${AuthEndPoint.CHANGE_PASSWORD}`,
        data
      )
      .pipe(
        map((res) => res.token),
        catchError(() =>
          throwError(
            () => new Error('Password is incorrect, please try again!!')
          )
        )
      );
  }

  login(data: LoginData): Observable<LoginRes> {
    return this._http
      .post<LoginApiData>(`${this._baseURL}${AuthEndPoint.SIGNIN}`, data)
      .pipe(
        map((res) => this._authAdaptor.adapt(res)),
        catchError(() =>
          throwError(() => new Error('Incorrect email or password!!'))
        )
      );
  }

  register(data: RegisterData): Observable<LoginRes> {
    return this._http
      .post<LoginApiData>(`${this._baseURL}${AuthEndPoint.SIGNUP}`, data)
      .pipe(
        map((res) => this._authAdaptor.adapt(res)),
        catchError(() =>
          throwError(() => new Error('Email or user name already exists!!'))
        )
      );
  }

  forgetPassword(data: ForgetPasswordData): Observable<ForgetPasswordRes> {
    return this._http
      .post<ForgetPasswordRes>(
        `${this._baseURL}${AuthEndPoint.FORGET_PASSWORD}`,
        data
      )
      .pipe(
        map((res) => res),
        catchError(() => throwError(() => new Error('Email is not exist!!')))
      );
  }

  verifyCode(data: Code): Observable<CodeRes> {
    return this._http
      .post<CodeRes>(`${this._baseURL}${AuthEndPoint.VERIFY_CODE}`, data)
      .pipe(
        map((res) => res),
        catchError(() => throwError(() => new Error('Invalid code!!')))
      );
  }

  resetPassword(data: SetPassword): Observable<SetPasswordRes> {
    return this._http
      .put<SetPasswordRes>(
        `${this._baseURL}${AuthEndPoint.RESET_PASSWORD}`,
        data
      )
      .pipe(
        map((res) => res),
        catchError(() =>
          throwError(() => new Error('Incorrect email or password!!'))
        )
      );
  }

  logout(): Observable<LogoutRes> {
    return this._http
      .get<LogoutRes>(`${this._baseURL}${AuthEndPoint.LOGOUT}`)
      .pipe(
        map((res) => res),
        catchError((err) => of(err))
      );
  }
}
