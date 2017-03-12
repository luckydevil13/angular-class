import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CoursesComponent } from './home/courses';
import { NoContentComponent } from './no-content';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: NoContentComponent },
];
