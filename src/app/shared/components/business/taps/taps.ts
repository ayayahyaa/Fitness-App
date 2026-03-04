import { Component, EventEmitter, Input, Output, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-taps',
  standalone: true,
  templateUrl: './taps.html',
  styleUrls: ['./taps.scss'],
})
export class Taps implements OnInit {
  @Input() carouselType: 'muscles' | 'healthy';
  @Output() tabClicked = new EventEmitter<string>();

  // -------------------
  // Selected tab
  selectedItemId: string | null = null;
  private _selected: string | null = null;
  @Input() set selected(value: string | null) {
    this._selected = value;
    this.selectedItemId = value;
  }
  get selected() {
    return this._selected;
  }

  // -------------------
  // Data
  @Input() _data: { id: string; label: string }[] = [];
  @Input() set data(value: any[]) {
    if (!value) {
      this._data = [];
      return;
    }
    this._data = value.map((item: any, index: number) => ({
      id:
        item.id ||
        item._id ||
        item.code ||
        item.key ||
        item.idCategory ||
        (index + 1).toString(),
      label:
        item.label ||
        item.title ||
        item.name ||
        item.group ||
        item.strCategory ||
        ''
    }));
    this.updateVisibleTabs();
  }
  get data() {
    return this._data;
  }

  // -------------------
  @Input() desktopCount = 8;
  @Input() tabletCount = 6;  
  @Input() mobileCount = 4;  

  // -------------------
  // Slider logic
  startIndex = 0;
  visibleCount = 8; 
  visibleTabs: { id: string; label: string }[] = [];

  ngOnInit() {
    this.updateVisibleCount();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCount();
  }

  updateVisibleCount() {
    const width = window.innerWidth;
    if (width < 640) {           // Mobile
      this.visibleCount = this.mobileCount;
    } else if (width < 1024) {   // Tablet
      this.visibleCount = this.tabletCount;
    } else {                      // Desktop
      this.visibleCount = this.desktopCount;
    }

    this.startIndex = Math.min(
      this.startIndex,
      Math.max(0, this._data.length - this.visibleCount)
    );
    this.updateVisibleTabs();
  }

  // -------------------
  updateVisibleTabs() {
    this.visibleTabs = this._data.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  // -------------------
    selectTab(id: string) {
    this.selectedItemId = id;
    this.tabClicked.emit(id);
  }

  // -------------------
  nextSlide() {
    if (this.startIndex + this.visibleCount < this._data.length) {
      this.startIndex++;
      this.updateVisibleTabs();
    }
  }

  prevSlide() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.updateVisibleTabs();
    }
  }
}