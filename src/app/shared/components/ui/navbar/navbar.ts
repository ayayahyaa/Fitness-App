import { Component, inject, signal, ViewChild, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrimaryBtn } from '../primary-btn/primaryBtn';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ThemeService } from 'src/app/core/services/theme-service.service';
@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    PrimaryBtn,
    CommonModule,
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    TranslateModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  visible = false;
  themeService = inject(ThemeService);
  private readonly _localStorageService = inject(LocalStorageService);
  isLogged = signal<string>(this._localStorageService.get('logged-user'));
  closeCallback(e): void {
    this.drawerRef.close(e);
  }
  ngOnInit() {
    this.themeService.initialTheme();
  }
}
