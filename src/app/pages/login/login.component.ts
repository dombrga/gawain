import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, finalize, map } from 'rxjs';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonRow, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '@/app/services/supabase/auth/auth.service';
import { CommonModule } from '@angular/common';
import { SupabaseAuthResponse, UserLogin } from '@/app/types/User.type';
import { AuthResponse, AuthResponsePassword, AuthTokenResponsePassword } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput, IonButton,
    IonGrid, IonRow, IonCol,
    IonText,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  destroy$ = new Subject()

  // form
  loginForm: FormGroup
  isLoading = false;
  // id, type(task or note), hours, task, tags[], isDone, createdDate(isostring), updatedDate(isostring), comments[]?

  message?: string
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value as UserLogin;
    this.authService.login(email, password)
      .subscribe({
        next: (e) => {
          if(e.error) {
            this.message = `${e.error.message}`
            return
          }
          
          console.log('logged in', e)
          this.authService.loggedInUser = e.data
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.error(e)
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  handleSignout() {
    this.authService.signOut().subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
