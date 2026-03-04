import { Component } from '@angular/core';
import { PrimaryBtn } from "../../shared/components/ui/primary-btn/primaryBtn";
import { Banner } from "../../shared/components/ui/banner/banner";
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-hero',
  imports: [PrimaryBtn, Banner,TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
