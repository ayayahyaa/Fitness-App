import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectMealDetail,
  selectSelectedMeal,
} from '../../../store/reducers';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';
import { mealsActions } from '../../../store/actions';
import { LoadingComponent } from '../../../../../shared/components/ui/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-meal-details',
  imports: [NgOptimizedImage, AsyncPipe, LoadingComponent, TranslateModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.scss',
})
export class MealDetails implements OnInit, OnDestroy {
  _store = inject(Store);
  private destroy$ = new Subject<void>();
  mealDetails$ = combineLatest({
    mealDetails: this._store.select(selectMealDetail),
    isLoading: this._store.select(selectIsLoading),
  });
  ngOnInit(): void {
    this._store
      .select(selectSelectedMeal)
      .pipe(
        filter((mealID) => !!mealID),
        takeUntil(this.destroy$)
      ) // wait until id is set

      .subscribe((mealID) => {
        console.log(mealID);
        this._store.dispatch(mealsActions.getMealDetail({ mealID: mealID }));
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
