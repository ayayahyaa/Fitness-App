import { Component } from '@angular/core';
import { MealsCategories } from './business/meals-categiories-carousel/meals-categories';
import { SectionTitle } from '../../../shared/components/ui/section-title/sectionTitle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-healthy-nutritions',
  imports: [SectionTitle, MealsCategories, TranslateModule],
  templateUrl: './healthy-nutritions.html',
  styleUrl: './healthy-nutritions.scss',
})
export class HealthyNutritions {}
