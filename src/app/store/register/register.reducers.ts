import { createReducer, on } from '@ngrx/store';
import * as actions from './register.actions';
import { RegisterData } from '@shared/types/auth-register';

const initialState: RegisterData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
  gender: '',
  height: 0,
  weight: 0,
  age: 0,
  goal: '',
  activityLevel: '',
};

export const registerReducers = createReducer(
  initialState,

  on(actions.onInfo, (state, value) => ({ ...state, ...value })),

  on(actions.onGender, (state, value) => ({ ...state, ...value })),

  on(actions.onAge, (state, value) => ({ ...state, ...value })),

  on(actions.onWeight, (state, value) => ({ ...state, ...value })),

  on(actions.onHeight, (state, value) => ({ ...state, ...value })),

  on(actions.onGoal, (state, value) => ({ ...state, ...value })),

  on(actions.onLevel, (state, value) => ({ ...state, ...value }))
);
