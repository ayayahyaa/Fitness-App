import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { env } from '../../../core/env/env';
import { Muscles, MusclesGroup } from '../../interfaces/muscles-groups';
import { AllMuscles , Muscle } from '../../interfaces/all-muscles';

@Injectable({
  providedIn: 'root',
})
export class MusclesServices {
  private readonly http = inject(HttpClient)


  getAllMsclesByGroups(): Observable<MusclesGroup[]> {
    return this.http.get<Muscles>(`${env.baseURL}/muscles`)
      .pipe( map(res => res.musclesGroup));
  }

  getAllMuscles(groupId: string): Observable<Muscle[]> {
    return this.http.get<AllMuscles>(`${env.baseURL}/musclesGroup/${groupId}`)
      .pipe(map(res => res.muscles));
  }
}
