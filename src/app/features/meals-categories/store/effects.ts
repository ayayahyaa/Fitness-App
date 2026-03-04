import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MealsCategories } from '../services/meals-categories';
import { catchError, concat, EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
import { mealsActions } from './actions';
import { MealsCategoriesDTO } from '../../../shared/types/mealCategoriesRes.interface';
import { MealsByCategoryDTO } from '../types/meal-response.interface';
import { MealDetailsDTO } from '../types/meal-details-response.interface';
import { selectSelectedMeal } from './reducers';
import { Store } from '@ngrx/store';
 
export const getMealsCategoriesEffect = createEffect(
  (actions$ = inject(Actions), mealsCategories = inject(MealsCategories)) => {
    return actions$.pipe(
      ofType(mealsActions.getMealsGroups),
      switchMap(() => {
        return mealsCategories.getAllCategories().pipe(
          map((mealsGroupEsponse: MealsCategoriesDTO) => {
            return mealsActions.getMealsGroupsSuccess(mealsGroupEsponse);
          }),
          catchError((err) => {
            console.log(err);
            return of(mealsActions.getMealsGroupsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
 
export const getMealsEffect = createEffect(
  (
    actions$ = inject(Actions),
    mealsCategories = inject(MealsCategories),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(mealsActions.getMealsByGroupsName),
      withLatestFrom(store.select(selectSelectedMeal)),
      switchMap(([{ groupName }, selected]) =>
        mealsCategories.getMealsByCategory(groupName).pipe(
          switchMap((mealsResponse: MealsByCategoryDTO) => {
            const firstMeal = mealsResponse.meals[0]?.idMeal;

            return concat(
              // always emit success first
              of(mealsActions.getMealsByGroupsNameSuccess(mealsResponse)),

              // auto-load first meal only if no previous selection
              !selected && firstMeal
                ? of(mealsActions.getMealDetail({ mealID: firstMeal }))
                : EMPTY
            );
          }),
          catchError(() => of(mealsActions.getMealsByGroupsNameFailure()))
        )
      )
    );
  },
  { functional: true }
);


export const getMealDetailsEffect = createEffect(
  (actions$ = inject(Actions), mealsCategories = inject(MealsCategories)) => {
    return actions$.pipe(
      ofType(mealsActions.getMealDetail, mealsActions.selectMeal),
      switchMap(({ mealID }) => {
        return mealsCategories.getMealDetails(mealID).pipe(
          map((mealDetailsResponse: MealDetailsDTO) => {
            return mealsActions.getMealDetailSuccess(mealDetailsResponse);
          }),
          catchError(() => {
            return of(mealsActions.getMealDetailFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
 