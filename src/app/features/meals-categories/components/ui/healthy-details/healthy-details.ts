import { Meal } from './../meal/meal';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
// import { Taps } from '../meals-group-taps/taps';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectMeals,
  selectMealsCategoriesData,
  selectSelectedCategoryOfMeals,
} from '../../../store/reducers';
import { combineLatest, map, Observable, take } from 'rxjs';
import { MealsCategoryDTO } from '../../../../../shared/types/mealCategory.interface';
import { mealsActions } from '../../../store/actions';
import { MealDetails } from '../meal-details/meal-details';
import { LoadingComponent } from '../../../../../shared/components/ui/loading/loading.component';
import { GlobalData } from '@shared/interfaces/global-data/global-data';
import { Taps } from '@shared/components/business/taps/taps';

@Component({
  selector: 'app-healthy-details',
  imports: [Taps, AsyncPipe, Meal, MealDetails, LoadingComponent],
  templateUrl: './healthy-details.html',
  styleUrl: './healthy-details.scss',
})
export class HealthyDetails implements OnInit {
  // data: GlobalData | null = null;
  selectedMeal: GlobalData | null = null;
  selectedGroupId = signal<string | null>(null);
  private _store = inject(Store);

  mealsData$ = combineLatest({
    meals: this._store.select(selectMeals),
    isLoading: this._store.select(selectIsLoading),
  });

  mealsCategories!: Observable<MealsCategoryDTO[]>;

  ngOnInit(): void {
    //this.data = history.state.data ?? null;
    this.initMealsGroups();
    // if (this.data) {
    //   this.selectedMeal = this.data;
    // }
  }

  private initMealsGroups(): void {
    this._store.dispatch(mealsActions.getMealsGroups());

    this.mealsCategories = this._store.select(selectMealsCategoriesData);

    this._store
      .select(selectSelectedCategoryOfMeals)
      .pipe()
      .subscribe((groupName) => {
        console.log(groupName);
        //get group-id from group-name
        this.mealsCategories
          .pipe(
            map(
              (categories) =>
                categories.find((c) => c.strCategory === groupName)
                  ?.idCategory ?? null
            ),
            take(1)
          )
          .subscribe((id) => {
            this.selectedGroupId.set(id);
          });
        ///   this.selectedGroupId.set(groupId());
        //   this._store.dispatch(
        //   mealsActions.selectCategory({ category:groupName })
        // );
        this._store.dispatch(mealsActions.getMealsByGroupsName({ groupName }));
      });
  }

  onGroupSelected(groupId: string): void {
    // get group name from group id
    this.mealsCategories
      .pipe(
        map(
          (categories) =>
            categories.find((c) => c.idCategory === groupId)?.strCategory ??
            null
        ),
        take(1)
      )
      .subscribe((groupName) => {
        this._store.dispatch(mealsActions.getMealsByGroupsName({ groupName }));
      });
  }

  // goToDetails(meal: GlobalData): void {
  //   this.selectedMeal = meal;
  // }
}
