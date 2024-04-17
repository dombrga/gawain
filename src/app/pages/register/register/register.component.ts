import { AuthService } from '@/app/services/supabase/auth/auth.service';
import { UserLogin } from '@/app/types/User.type';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';
import { AuthError } from '@supabase/supabase-js';
import { Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput, IonButton,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle,
  ]
})
export class RegisterComponent implements OnInit {
  destroy$ = new Subject()

  // form
  registerForm: FormGroup
  isLoading = false;
  // id, type(task or note), hours, task, tags[], isDone, createdDate(isostring), updatedDate(isostring), comments[]?

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }

  private _finalize() {
    return finalize(() => {
      console.log('finalizing')
      this.isLoading = false;
    })
  }

  handleSubmit() {
    this.isLoading = true;
    const { email, password } = this.registerForm.value as UserLogin;
    this.authService.signUp(email, password)
      .pipe(
        this._finalize(),
      )
      .subscribe({
        next: e => {
          this.router.navigateByUrl('')
        },
        error: (e: AuthError) => {
          console.log('error signup', e);
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
