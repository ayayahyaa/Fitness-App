import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-number-picker',
  imports: [CarouselModule, FormsModule],
  templateUrl: './number-picker.html',
  styleUrl: './number-picker.scss',
})
export class NumberPicker {
  numbersRange = input.required<number[]>();
  unit = input.required<string>();
  ctrlName = input<string>();
  payload = output<number>();

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  handleClick(val: number) {
    this.payload.emit(val);
  }
}





