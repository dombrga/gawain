import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../supabase/auth/auth.service";
import { switchMap, of } from "rxjs";

export const activateGuardTask: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  const guard = authService.user$.pipe(
    switchMap(user => {
      if(user) {
        return of(true);
      }
      const urlTree = router.createUrlTree(['login']);
      return of(urlTree);
    })
  )

  return guard;
}

export const activateGuardLogin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  const guard = authService.user$.pipe(
    switchMap(user => {
      if(user) {
        const urlTree = router.createUrlTree(['tasks']);
        return of(urlTree);
      }

      return of(true);
    })
  )

  return guard;
}

export const activateGuard404: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  console.log('404 guard', route.url, state.url)

  authService.user$.pipe(
    switchMap(user => {
      if(user) {
        return of(true);
      }
      const urlTree = router.createUrlTree(['login']);
      // return of(false);
      return of(urlTree);
    })
  )
  return true
}