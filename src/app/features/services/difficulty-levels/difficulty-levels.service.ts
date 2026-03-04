import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@env/env';
import { map, Observable } from 'rxjs';
import { LevelsResponse } from '../../Interfaces/levels/levels';
import { ExercisesResponse } from '../../Interfaces/exercise/exercise';

@Injectable({
  providedIn: 'root',
})
export class DifficultyLevelsService {

  private readonly http = inject(HttpClient);

  getDifficultyLevels(muscleId : string): Observable<LevelsResponse> {
    return this.http.get<LevelsResponse>(`${env.baseURL}/levels/difficulty-levels/by-prime-mover?primeMoverMuscleId=${muscleId}`)
    .pipe( map( res => res))
  }

    getExercisesByMuscleAndLevel(oneId : string, twoId : string): Observable<ExercisesResponse> {
    return this.http.get<ExercisesResponse>(`${env.baseURL}/exercises/by-muscle-difficulty?primeMoverMuscleId=${oneId}&difficultyLevelId=${twoId}`)
    .pipe( map( res => res))
  }

}




