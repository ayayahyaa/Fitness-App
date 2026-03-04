import { Route } from '@angular/router';
import { loggedUserGuard } from './core/guards/logged.user.guard';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [loggedUserGuard],
    loadComponent: () =>
      import('../app/layouts/auth-layout/auth-layout').then(
        (c) => c.AuthLayout
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('../app/features/auth/pages/login/login').then((c) => c.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../app/features/auth/pages/register/register').then(
            (c) => c.Register
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            '../app/features/auth/pages/forget-password/forget-password'
          ).then((c) => c.ForgetPassword),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/layouts/app-layout/appLayout').then((m) => m.AppLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/features/pages/home/home').then((c) => c.Home),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('../app/features/pages/about/about').then((m) => m.About),
      },
      {
        path: 'healthy',
        loadComponent: () =>
          import('../app/features/healthy-page/healthy-page').then((m) => m.HealthyPage),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            '../app/features/meals-categories/components/ui/healthy-details/healthy-details').then((m) => m.HealthyDetails),
      },
      {
        path: 'exercise/:id',
        loadComponent: () =>
          import(
            '../app/features/exercise-details/exercise-details').then((m) => m.ExerciseDetails),
      },
      {
        path: 'classes',
        loadComponent: () =>
          import('../app/features/classes/classes').then((m) => m.Classes),
      },
      {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/features/account/account').then((m) => m.Account),
      },
    ],
  },
];
