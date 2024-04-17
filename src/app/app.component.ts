import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonMenu, IonMenuButton, IonMenuToggle, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    IonApp, 
    IonButton, IonButtons,
    IonContent,
    IonGrid, IonRow, IonCol,
    IonMenu, IonMenuButton, IonMenuToggle,
    IonToolbar, IonHeader, IonFooter, IonTitle,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(
    
  ) {
    
  }
}
