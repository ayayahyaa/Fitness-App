import { MealsCategoryDTO } from '../../../shared/types/mealCategory.interface';
import { MealDetailDTO } from './meal-details-response.interface';
import { MealDTO } from './meal-response.interface';

export interface MealsStateInterface {
  isLoading: boolean;
  mealsCategories: MealsCategoryDTO[]|null;
  meals: MealDTO[] | null;
  mealDetail: MealDetailDTO | null;
  selectedCategoryOfMeals: string | null;
  selectedMeal:string|null;
  error: null;
}

export interface MealsCategoriesStateInterface {
  isLoading: boolean;
  mealsCategories: MealsCategoryDTO[] | null;
}
