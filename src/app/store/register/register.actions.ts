import { createAction, props } from '@ngrx/store';

export const onInfo = createAction(
  '[register] onInfo',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
  }>()
);

export const onGender = createAction(
  '[register] onGender',
  props<{ gender: string }>()
);

export const onAge = createAction('[register] onAge', props<{ age: number }>());

export const onWeight = createAction(
  '[register] onWeight',
  props<{ weight: number }>()
);

export const onHeight = createAction(
  '[register] onHeight',
  props<{ height: number }>()
);

export const onGoal = createAction(
  '[register] onGoal',
  props<{ goal: string }>()
);

export const onLevel = createAction(
  '[register] onLevel',
  props<{ activityLevel: string }>()
);
