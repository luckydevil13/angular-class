import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CoursesComponent } from './courses';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { CourseComponent } from './course';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'course', component: CourseComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
