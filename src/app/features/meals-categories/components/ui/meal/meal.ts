import { Component, inject, input, } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MealDTO } from '../../../types/meal-response.interface';
import { Store } from '@ngrx/store';
import { mealsActions } from '../../../store/actions';

@Component({
  selector: 'app-meal',
  imports: [NgOptimizedImage],
  templateUrl: './meal.html',
  styleUrl: './meal.scss',
})
export class Meal {
  meal = input.required<MealDTO>();
  _store = inject(Store);

  getMealDetails(meal:MealDTO) {
    console.log(meal);
    
    this._store.dispatch(mealsActions.selectMeal({ mealID: meal.idMeal }));
    this._store.dispatch(mealsActions.getMealDetail({ mealID: meal.idMeal }));
  }
}
