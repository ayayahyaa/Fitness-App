import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsCategoriesDTO } from '../../../shared/types/mealCategoriesRes.interface';
import { MealsByCategoryDTO } from '../types/meal-response.interface';
import { MealDetailsDTO } from '../types/meal-details-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MealsCategories {
  baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  http = inject(HttpClient);
  getAllCategories(): Observable<MealsCategoriesDTO> {
    const url = `${this.baseUrl}/categories.php`;
    return this.http.get<MealsCategoriesDTO>(url);
  }

  getMealsByCategory(categoryName: string): Observable<MealsByCategoryDTO> {
    const url = `${this.baseUrl}/filter.php?c=${categoryName}`;
    return this.http.get<MealsByCategoryDTO>(url);
  }

  getMealDetails(idMeal: string): Observable<MealDetailsDTO> {
    const url = `${this.baseUrl}/lookup.php?i=${idMeal}`;
    return this.http.get<MealDetailsDTO>(url);
  }
}
