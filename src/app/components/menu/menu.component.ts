import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { MenuItem } from '@/app/types/navigation.type';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    IonContent, IonList,
    IonToolbar, IonHeader, IonTitle,
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

  constructor() { }

  ngOnInit() {}

}
