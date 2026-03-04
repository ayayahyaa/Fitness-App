import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectIsLoading,
  selectMealsCategoriesData,
} from '../../../store/reducers';
import { MealsCategoriesStateInterface } from '../../../types/mealsState.interface';
import { AsyncPipe } from '@angular/common';
import { mealsActions } from '../../../store/actions';
import { LoadingComponent } from '../../../../../shared/components/ui/loading/loading.component';
import { MealsCategoryDTO } from '../../../../../shared/types/mealCategory.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Card } from '@shared/components/business/card/card';

@Component({
  selector: 'app-meals-categories',
  imports: [CarouselModule, AsyncPipe, LoadingComponent, TranslateModule, Card],
  templateUrl: './meals-categories.html',
  styleUrl: './meals-categories.scss',
})
export class MealsCategories implements OnInit {
  showAll = false;
  private store = inject(Store);
  data$: Observable<MealsCategoriesStateInterface>;
  private router = inject(Router);

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.prepareDataStream();
    this.loadMealsCategories();
  }

  private prepareDataStream(): void {
    this.data$ = combineLatest({
      mealsCategories: this.store.select(selectMealsCategoriesData),
      isLoading: this.store.select(selectIsLoading),
    });
  }

  private loadMealsCategories(): void {
    this.store.dispatch(mealsActions.getMealsGroups());
  }

  getVisibleCategories(mealsCategories: MealsCategoryDTO[]) {
    return this.showAll ? mealsCategories : mealsCategories.slice(0, 3);
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

  readMore(category: MealsCategoryDTO) {
    this.router.navigate(['/healthy'], {
      queryParams: {
        tab: category.idCategory,
      },
    });
  }
}
