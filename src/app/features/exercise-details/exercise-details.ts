import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DifficultyLevelsService } from './../services/difficulty-levels/difficulty-levels.service';
import { ActivatedRoute } from '@angular/router';
import { DifficultyLevel } from '../Interfaces/levels/levels';
import { Exercise } from '../Interfaces/exercise/exercise';
import { TranslateModule, } from '@ngx-translate/core';
import { MealsCategories } from "../meals-categories/components/business/meals-categiories-carousel/meals-categories";


@Component({
  selector: 'app-exercise-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, MealsCategories],
  templateUrl: './exercise-details.html',
  styleUrl: './exercise-details.scss',
})
export class ExerciseDetails implements OnInit{

  // Call Services
  private readonly _difficultyLevelsService = inject(DifficultyLevelsService);
  private readonly _activatedRoute = inject(ActivatedRoute)

  // Variables
  readonly visibleCount = 3;
  currentLevelIndex = signal(0);
  difficultyLevels = signal<DifficultyLevel[]>([]);
  exercises = signal<Exercise[]>([]);
  selectedLevelId = signal<string | null>(null);
  selectedExercise = signal<Exercise| null>(null);


ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe(params => {
    const muscleId = params.get('id');  
    if (muscleId) {
      this._difficultyLevelsService.getDifficultyLevels(muscleId).subscribe({
        next: (res) => {
          console.log('Levels from API:', res);
          this.difficultyLevels.set(res.difficulty_levels);

          if (res.difficulty_levels?.length > 0) {
            const firstLevelId = res.difficulty_levels[0].id;
            this.selectedLevelId.set(firstLevelId);
            this.loadExercises(muscleId, firstLevelId); 
          }
        },
        error: (err) => console.error('Error loading levels:', err)
      });
    }
  });
}

private loadExercises(muscleId: string, levelId: string) {
  this._difficultyLevelsService.getExercisesByMuscleAndLevel(muscleId, levelId).subscribe({
    next: (res) => {
      console.log('Exercises for level:', levelId, res);
      this.exercises.set(res.exercises)
      if (res.exercises?.length) {
        this.selectedExercise.set(res.exercises[0])
      }
    },
    error: (err) => console.error('Error loading exercises:', err)
  });
}

selectLevel(levelId: string) {
  this.selectedLevelId.set(levelId);
  console.log('levelId =>', levelId);

  const muscleId = this._activatedRoute.snapshot.paramMap.get('id');
  if (muscleId) {
    this.loadExercises(muscleId, levelId); 
  }
}

  selectExercise(ex: Exercise) {
      this.selectedExercise.set(ex);
    }

  visibleLevels = computed(() => {
    const all = this.difficultyLevels();
    const start = this.currentLevelIndex();
    return all.slice(start, start + this.visibleCount);
  });

  nextLevel() {
  const maxStart = Math.max(0, this.difficultyLevels().length - this.visibleCount);
  this.currentLevelIndex.update(i => Math.min(i + 1, maxStart));
}

  prevLevel() {
    this.currentLevelIndex.update(i => Math.max(0, i - 1));
  }

}