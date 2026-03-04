import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MealsCategoriesDTO } from '../../../shared/types/mealCategoriesRes.interface';
import { MealDTO, MealsByCategoryDTO } from '../types/meal-response.interface';
import { MealDetailsDTO } from '../types/meal-details-response.interface';

export const mealsActions = createActionGroup({
  source: 'healthy meals',
  events: {
    //Get
    'Get Meals Groups': emptyProps(),
    'Get Meals Groups success': props<MealsCategoriesDTO>(),
    'Get Meals Groups failure': emptyProps(),

    //Get Meals by Category Name
    'Get Meals By Groups Name': props<{ groupName: string }>(),
    'Get Meals By Groups Name success': props<MealsByCategoryDTO>(),
    'Get Meals By Groups Name failure': emptyProps(),

    //Get Meal detail
    'Get Meal detail': props<{ mealID: string }>(),
    'Get Meal detail success': props<MealDetailsDTO >(),
    'Get Meal detail failure': emptyProps(),

    selectCategory: props<{ category: string }>(),
    selectMeal: props<{ mealID: string }>(),
  },
});
