import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Card } from '../card/card';
import { GlobalData } from '../../../interfaces/global-data/global-data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-row-carousel',
  imports: [CarouselModule, Card, TranslateModule],
  templateUrl: './multi-row-carousel.html',
  styleUrls: ['./multi-row-carousel.scss'],
})
export class MultiRowCarousel implements OnChanges {
  @Input() data: GlobalData[] = [];
  @Output() itemClicked = new EventEmitter<GlobalData>();
  groupedItems: GlobalData[][] = [];

  @HostListener('window:resize')
  onResize() {
    this.buildGroups();
  }

  ngOnChanges() {
    this.buildGroups();
  }

  buildGroups() {
    if (this.data?.length) {
      this.groupedItems = [];
      let cols;
      const w = window.innerWidth;
      if (w >= 1024) {
        cols = 3; // desktop
      } else if (w >= 768) {
        cols = 2; // tablet
      } else {
        cols = 1; // phone
      }
      const rows = 2; // max rows
      const size = cols * rows;
      for (let i = 0; i < this.data.length; i += size) {
        this.groupedItems.push(this.data.slice(i, i + size));
      }
    }
  }

  getRowsCount(group: GlobalData[]): number {
    let cols: number;
    const w = window.innerWidth;
    if (w >= 1024) {
      cols = 3;
    } else if (w >= 768) {
      cols = 2;
    } else {
      cols = 1;
    }
    return Math.ceil(group.length / cols);
  }

  goToDetails(data: GlobalData) {
    this.itemClicked.emit(data);
  }
}