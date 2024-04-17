import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { activateGuard } from './services/guard/guard.service';
import { TasksComponent } from './pages/tasks/tasks/tasks.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', title: 'index', redirectTo: 'tasks', pathMatch: 'full', },
  { path: 'tasks', component: TasksComponent, canActivate: [activateGuard], },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
