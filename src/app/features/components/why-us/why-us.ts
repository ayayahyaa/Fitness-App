import { Component } from '@angular/core';
import { SectionTitle } from "../../../shared/components/ui/section-title/sectionTitle";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-us',
  imports: [SectionTitle, TranslateModule],
  templateUrl: './why-us.html',
  styleUrl: './why-us.scss',
})
export class WhyUs {}
