import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalData } from '../../../interfaces/global-data/global-data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule , TranslateModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Output() cardClick = new EventEmitter<GlobalData>();
  @Input()data: GlobalData;

  handleClick() {
    this.cardClick.emit(this.data);
  }
}