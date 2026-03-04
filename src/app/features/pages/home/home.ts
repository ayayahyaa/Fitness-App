import { Component } from '@angular/core';
import { Aboutus } from '@shared/components/ui/about-us/about-us';
import { HealthyNutritions } from '../../meals-categories/components/healthy-nutritions';
import { WhyUs } from '../../components/why-us/why-us';
import { Workouts } from '../../workouts/workouts';
import { Hero } from '../../hero/hero';

@Component({
  selector: 'app-home',
  imports: [Aboutus, HealthyNutritions, WhyUs, Workouts, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
