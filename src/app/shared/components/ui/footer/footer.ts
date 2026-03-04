import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Banner } from "../banner/banner";
import { ThemeService } from 'src/app/core/services/theme-service.service';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, Banner],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
themeService = inject(ThemeService);

 ngOnInit() {
  this.themeService.initialTheme();
}
}
