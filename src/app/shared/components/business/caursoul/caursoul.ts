import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Card } from "../card/card";
import { GlobalData } from '../../../interfaces/global-data/global-data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-caursoul',
  standalone: true,
  imports: [CarouselModule, Card, TranslateModule],
  templateUrl: './caursoul.html',
  styleUrl: './caursoul.scss',
})
export class Caursoul {
  @Input() data: GlobalData[] = [];
  @Output() itemClicked = new EventEmitter<GlobalData>();
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 3 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 3 },
    { breakpoint: '767px', numVisible: 2, numScroll: 2 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

goToDetails(data: GlobalData) {
  this.itemClicked.emit(data);
}
}


