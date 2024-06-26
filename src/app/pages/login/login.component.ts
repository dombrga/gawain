import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/app/services/supabase/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule, RouterLink,
    ReactiveFormsModule,
    IonContent,
    IonInput, IonButton, IonLabel, IonText,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  // form
  loginForm: FormGroup;
  isLoading = false;

  message?: string
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.authService.user$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(u => {
        if(u) this.router.navigateByUrl('/tasks')
      })
  }

  get email() {
    return this.loginForm.get('email')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  handleLogin() {
    console.log('logging in');
    this.isLoading = true;
    this.authService.login(this.email, this.password)
      .subscribe({
        next: ({ data, error }) => {
          if(error) {
            this.message = `${error.message}`;
            return;
          }

          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.error('error login', e);
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  handleLogOut() {
    this.authService.logOut().subscribe({
      next: () => {
        console.log('login comp logging out');
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
