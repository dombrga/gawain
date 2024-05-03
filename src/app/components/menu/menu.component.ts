import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule, NgFor } from '@angular/common';
import { MenuItem } from '@/app/types/navigation.type';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AuthService } from '@/app/services/supabase/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonList,
    IonToolbar, IonHeader, IonTitle, IonItem, IonLabel,
    IonMenu, IonMenuButton, IonMenuToggle,
    MenuItemComponent,
  ]
})
export class MenuComponent implements OnInit {
  links: MenuItem[] = [
    { text: 'Tasks', route: '/tasks' },
    { text: 'Login', route: '/login' },
    { text: 'Register', route: '/register' },
  ];

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      this.isLoggedIn = !!u;
    })
  }

  handleLogout() {
    console.log('logging out')
    this.authService.logOut().subscribe({
      next: () => {
        console.log('logged out')
      }
    })
  }
}
