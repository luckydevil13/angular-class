import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CoursesComponent } from './courses';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
