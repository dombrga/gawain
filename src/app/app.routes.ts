import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  // { path: 'login2', component: LoginComponent2, title: 'home' },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
