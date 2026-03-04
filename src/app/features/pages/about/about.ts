import { Component } from '@angular/core';

import { Aboutus } from '@shared/components/ui/about-us/about-us';

@Component({
  selector: 'app-about',
  imports: [Aboutus],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
