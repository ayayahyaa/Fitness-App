import { createFeature, createReducer, on } from '@ngrx/store';
import { MealsStateInterface } from '../types/mealsState.interface';
import { mealsActions } from './actions';

const initialState: MealsStateInterface = {
  isLoading: false,
  mealsCategories: null,
  meals: null,
  mealDetail: null,
  selectedCategoryOfMeals: null,
  selectedMeal: null,
  error: null,
};

export const MealsFeature = createFeature({
  name: 'Healthy',
  reducer: createReducer(
    initialState,
    on(mealsActions.getMealsGroups, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(mealsActions.getMealsGroupsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      mealsCategories: action.categories,
      selectedCategoryOfMeals:
        state.selectedCategoryOfMeals ?? action.categories[0].strCategory,
      // selectedCategoryOfMeals: action.categories[0].strCategory,
    })),
    on(mealsActions.getMealsGroupsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    /////////////////Meals/////////////
    on(mealsActions.getMealsByGroupsName, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(mealsActions.getMealsByGroupsNameSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      meals: action.meals,
      selectedMeal: state.selectedMeal ?? action.meals[0].idMeal,
    })),
    on(mealsActions.getMealsByGroupsNameFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    /////////////////Meal Details/////////////
    on(mealsActions.getMealDetail, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(mealsActions.getMealDetailSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      mealDetail: action.meals[0],
      selectedMeal: action.meals[0].idMeal,
    })),
    on(mealsActions.getMealDetailFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    //select category/////////////
    on(mealsActions.selectCategory, (state, action) => ({
      ...state,
      selectedCategoryOfMeals: action.category,
      selectedMeal: null, // reset for new category
    })),

    //select meal/////////////
    on(mealsActions.selectMeal, (state, action) => ({
      ...state,
      selectedMeal: action.mealID,
    }))
  ),
});
export const {
  name: healthyFeatureKey, // feature name
  reducer: healthyReducer, // feature reducer
  selectIsLoading, //  selector for `loading` property
  selectError, // selector for `error` property
  selectMealsCategories: selectMealsCategoriesData,
  selectMealDetail,
  selectMeals,
  selectSelectedCategoryOfMeals,
  selectSelectedMeal, // feature selector
} = MealsFeature;
