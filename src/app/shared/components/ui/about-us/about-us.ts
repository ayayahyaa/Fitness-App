import { Component, inject, input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitle } from '../section-title/sectionTitle';
import { PrimaryBtn } from '../primary-btn/primaryBtn';
import { TranslateService } from '@ngx-translate/core';
import { Feature } from '@shared/interfaces/feature/feature';

@Component({
  selector: 'app-about-us',
  imports: [SectionTitle, TranslateModule, PrimaryBtn,],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class Aboutus implements OnInit {
  paddingSpace = input.required<boolean>();
  private readonly translate = inject(TranslateService);
    features: Feature[] = [];

  ngOnInit() {
    this.translate.stream('Features').subscribe((data: Feature[]) => {
      this.features = data;
    });
  }
}