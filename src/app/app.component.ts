import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    IonApp, 
    IonButton,
    IonContent,
    IonGrid, IonRow, IonCol,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(
    
  ) {
    
  }
}
