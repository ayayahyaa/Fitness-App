import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { Taps } from '../../shared/components/business/taps/taps';
import { SectionTitle } from "../../shared/components/ui/section-title/sectionTitle";
import { TranslateModule, } from '@ngx-translate/core';
import { Caursoul } from "../../shared/components/business/caursoul/caursoul";
import { MusclesServices } from '../../shared/services/muscles/muscles-services';
import { Muscle } from '../../shared/interfaces/all-muscles';
import { GlobalData } from '../../shared/interfaces/global-data/global-data';


@Component({
  selector: 'app-workouts',
  imports: [Taps, SectionTitle, TranslateModule, Caursoul, ],
  templateUrl: './workouts.html',
  styleUrl: './workouts.scss',
})
export class Workouts implements OnInit{
  data:GlobalData[] = [];
  private _musclesServices = inject(MusclesServices)
  private _destroyRef = inject(DestroyRef);
  muscles: Muscle[] = [];
  muscleGroupsSignal = signal([]);
  @Input() muscle: Muscle[] = [];

  selectedGroupIdSignal = signal<string | null>(null);

  ngOnInit() {
    this.loadMuscleGroups();
  }

loadMuscleGroups() {
  const subscription = this._musclesServices.getAllMsclesByGroups().subscribe({
    next: (groups) => {
      this.muscleGroupsSignal.set(groups);
      if (groups.length > 0) {
        const firstId = groups[0]._id;
        this.selectedGroupIdSignal.set(firstId);
        this.onGroupSelected(firstId);
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
  this._destroyRef.onDestroy(() => subscription.unsubscribe());
}

  onGroupSelected(groupId: string) {
  this.selectedGroupIdSignal.set(groupId);
  const subscription = this._musclesServices.getAllMuscles(groupId).subscribe({
    next: (res) => {
      this.muscles = res;
      this.data = this.muscles.map(muscle => ({
        id: muscle._id,
        label: muscle.name,
        image: muscle.image
      }));
    },
    error: (err) => {
      console.log(err);
    }
  });
  this._destroyRef.onDestroy(() => subscription.unsubscribe());
}
}
