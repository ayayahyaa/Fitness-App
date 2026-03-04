import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MealsCategories } from '../meals-categories/services/meals-categories';
import { Meal } from '../../shared/types/meals-by-categories';
import { SectionTitle } from '../../shared/components/ui/section-title/sectionTitle';
import { Taps } from '../../shared/components/business/taps/taps';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalData } from '../../shared/interfaces/global-data/global-data';
import { MealsCategoryDTO } from '../../shared/types/mealCategory.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { mealsActions } from '../meals-categories/store/actions';
import { MultiRowCarousel } from '@shared/components/business/multi-row-carousel/multi-row-carousel';

@Component({
  selector: 'app-healthy-page',
  imports: [SectionTitle, Taps, TranslateModule, MultiRowCarousel],
  templateUrl: './healthy-page.html',
  styleUrl: './healthy-page.scss',
})
export class HealthyPage implements OnInit {
  private route = inject(ActivatedRoute);
  private _mealsCategories = inject(MealsCategories);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private store = inject(Store);

  data: GlobalData[] = [];
  meals: Meal[] = [];
  mealsGroupsSignal = signal<MealsCategoryDTO[]>([]);
  selectedGroupIdSignal = signal<string | null>(null);
  categories: MealsCategoryDTO[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getAllCategories(params['tab']);
    });
  }

  getAllCategories(tabFromUrl?: string) {
    const subscription = this._mealsCategories.getAllCategories().subscribe({
      next: (res) => {
        const categories = res.categories ?? [];
        this.categories = categories;
        this.mealsGroupsSignal.set(categories);

        if (categories.length > 0) {
          const selectedId =
            tabFromUrl && categories.find((c) => c.idCategory === tabFromUrl)
              ? tabFromUrl
              : categories[0].idCategory;
          this.selectedGroupIdSignal.set(selectedId);
          this.getAllMealsInCard(selectedId);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  getAllMealsInCard(categoryId: string) {
    this.selectedGroupIdSignal.set(categoryId);
    const category = this.categories.find((c) => c.idCategory === categoryId);

    // dispatch selected tab
    this.store.dispatch(
      mealsActions.selectCategory({ category: category?.strCategory ?? '' })
    );
    if (!category) return;
    const subscription = this._mealsCategories
      .getMealsByCategory(category.strCategory)
      .subscribe({
        next: (res) => {
          this.meals = res.meals ?? [];
          this.data = this.meals.map((meal) => ({
            id: meal.idMeal,
            label: meal.strMeal,
            image: meal.strMealThumb,
          }));
          console.log(this.data);
        },
        error: (err) => {
          console.log(err);
        },
      });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  goToDetails(cardData: GlobalData) {
    // dispatch selected meal
    this.store.dispatch(mealsActions.selectMeal({ mealID: cardData.id }));
    console.log(cardData.id, cardData.name);
    this._router.navigate(['/details', cardData.id], {
      state: { data: cardData },
    });
  }
}
