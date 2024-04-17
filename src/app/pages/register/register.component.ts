import { AuthService } from '@/app/services/supabase/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonLabel, IonRow, IonText } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput, IonButton, IonText, IonLabel,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle,
  ]
})
export class RegisterComponent implements OnInit {
  destroy$ = new Subject();

  // form
  registerForm: FormGroup;
  isLoading = false;
  message = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.registerForm.get('email')?.value;
  }

  get password() {
    return this.registerForm.get('password')?.value;
  }

  handleRegister() {
    this.isLoading = true;
    this.authService.register(this.email, this.password)
      .subscribe({
        next: (e) => {
          if(e.error) {
            this.message = `${e.error.message}`;
            return
          }
          this.router.navigateByUrl('/tasks')
        },
        error: (e) => {
          console.log('error register', e);
        }
      })
      .add(() => {
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
