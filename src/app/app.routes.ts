import { Routes } from '@angular/router';
import { CoursesComponent } from './courses';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { CourseComponent } from './course';
import { AuthGuard } from './app.auth.guard';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'course/new', pathMatch: 'full', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'course/:id,', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
