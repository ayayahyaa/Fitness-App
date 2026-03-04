import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner implements OnInit {
  private readonly translate = inject(TranslateService);
  bannerItems: string[] = [];
  settings: Record<string, string> = {};

  ngOnInit() {
    this.translate.stream('BannerItems').subscribe((data: string[]) => {
      this.bannerItems = data;

      this.settings = {
        '--numItems': `${this.bannerItems.length}`,
        '--width': '180px',
        '--height': '40px',
        '--speed': '25s',
        '--gap': '15px',
        '--single-slide-speed': 'calc(var(--speed) / var(--numItems))',
        '--track-width':
          'calc((var(--width) + var(--gap)) * (var(--numItems) - 1))',
      };
    });
  }
}
