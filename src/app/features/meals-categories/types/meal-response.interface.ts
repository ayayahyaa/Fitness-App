export interface MealDTO {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface MealsByCategoryDTO {
  meals: MealDTO[]|null;
}
