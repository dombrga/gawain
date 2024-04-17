import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, defer, of, switchMap, throwError } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { AuthResponse, AuthTokenResponsePassword, User } from '@supabase/supabase-js';
import { AuthDetails, SupabaseAuthResponse } from '@/app/types/User.type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: SupabaseAuthClient;
  loggedInUser!: AuthDetails

  constructor(
    private supabase: SupabaseService,
    private http: HttpClient
  ) { 
    this.auth = this.supabase.supabase.auth;
  }

  get isLoggedIn(): boolean {
    return !!this.loggedInUser.user || !!this.loggedInUser.session;
  }

  signUp(email: string, password: string) {
    return defer(() => this.auth.signUp({ email, password}))
      .pipe(
        switchMap(e => {
          if(e.error) {
            return throwError(() => new Error(e.error.message))
          }
          return of(e.data)
        }),
      )
  }

  login(email: string, password: string) {
    return defer(() => this.auth.signInWithPassword({ email, password }))
      .pipe(
        // add http interceptor?
        catchError((e) => {
          return throwError(() => e)
        })
      );
  }

  signOut() {
    return defer(() => this.auth.signOut());
  }
}
