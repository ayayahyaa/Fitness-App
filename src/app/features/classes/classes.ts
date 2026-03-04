import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SectionTitle } from "../../shared/components/ui/section-title/sectionTitle";
import { Taps } from "../../shared/components/business/taps/taps";
import { TranslateModule } from '@ngx-translate/core';
import { Muscle } from '../../shared/interfaces/all-muscles';
import { MusclesServices } from '../../shared/services/muscles/muscles-services';
import { GlobalData } from '../../shared/interfaces/global-data/global-data';
import { Router } from '@angular/router';
import { MultiRowCarousel } from "@shared/components/business/multi-row-carousel/multi-row-carousel";

@Component({
  selector: 'app-classes',
  imports: [Taps, SectionTitle, TranslateModule, MultiRowCarousel],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class Classes implements OnInit {
  private _musclesServices = inject(MusclesServices);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  data:GlobalData[] = [];
  muscles: Muscle[] = [];
  muscleGroupsSignal = signal([]);
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
    console.log(groupId)
    this.data = [];
    this.selectedGroupIdSignal.set(groupId);
    const subscription = this._musclesServices.getAllMuscles(groupId).subscribe({
      next:(res)=> {
        console.log(res)
        this.muscles = res;
        this.data = this.muscles.map(muscle=>({
          id: muscle._id,
          label: muscle.name,
          image: muscle.image
        }))
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  goToDetails(cardData: GlobalData) {
    console.log(cardData.id, cardData.name);
    this._router.navigate(['/exercise', cardData.id], {
      state: { data: cardData },
    });
}
}