import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, defer, of, switchMap, throwError } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth
  private auth: SupabaseAuthClient;

  // user
  private user = new BehaviorSubject<User | null | undefined>(null);
  get user$() {
    return this.user.asObservable();
  }
  setUser(u: User | null | undefined) {
    this.user.next(u)
  }

  constructor(
    private supabase: SupabaseService,
    private router: Router,
  ) { 
    this.auth = this.supabase.supabase.auth;

    this.auth.onAuthStateChange((event, session) => {
      console.log('auth change', event, session?.user)
      if (event === 'INITIAL_SESSION') {
        this.setUser(session?.user ? session.user : null);
      } else if (event === 'SIGNED_IN') {
        this.setUser(session?.user)
      } else if (event === 'SIGNED_OUT') {
        this.setUser(null);
      // } else if (event === 'PASSWORD_RECOVERY') {
      // } else if (event === 'TOKEN_REFRESHED') {
      } else if (event === 'USER_UPDATED') {
        this.user.next(session?.user);
      }
    })
  }

  // for route guard
  // isLoggedIn() {
  //   return this.user$
  //     .pipe(
  //       switchMap(user => {
  //         const url = this.router.url;
  //         if(user) {
  //           return of(true);
  //         }
          
  //         this.router.navigateByUrl('/login')
  //         return of(false);
  //         // you can also do this
  //         // const urlTree = this.router.createUrlTree(['login']);
  //         // return of(urlTree);
  //       })
  //     );
  // }

  register(email: string, password: string) {
    return defer(() => this.auth.signUp({ email, password}));
  }

  login(email: string, password: string) {
    return defer(() => this.auth.signInWithPassword({ email, password }))
      .pipe(
        // add http interceptor?
        catchError((e) => {
          return throwError(() => e);
        })
      );
  }

  logOut() {
    return defer(() => this.auth.signOut({ scope: 'local' }));
  }

  // getSession() {
  //   return defer(() => this.auth.getSession());
  // }

  // getUser() {
  //   return defer(() => this.auth.getUser());
  // }
}
