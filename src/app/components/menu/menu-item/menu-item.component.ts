import { MenuItem } from '@/app/types/navigation.type';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonItem, IonLabel,
  ]
})
export class MenuItemComponent implements OnInit {
  
  @Input() link!: MenuItem;

  constructor() { }

  ngOnInit() {}

}
