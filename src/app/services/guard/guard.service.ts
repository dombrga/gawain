import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../supabase/auth/auth.service";

export const activateGuard: CanActivateFn = (route, state) => {
// export const activateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  console.log('guardinggg');


  
  return authService.isLoggedIn()
  // return true
  // return router.parseUrl('/login')
}