import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./login/reset-password/reset-password.module').then(
            (m) => m.ResetPasswordPageModule
          ),
      },
      {
        path: 'verify',
        loadChildren: () =>
          import('./login/verify-code/verify-code.module').then(
            (m) => m.VerifyCodePageModule
          ),
      },
      {
        path: 'new-password',
        loadChildren: () =>
          import('./login/new-password/new-password.module').then(
            (m) => m.NewPasswordPageModule
          ),
      },
    ],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'add-official',
    loadChildren: () =>
      import('./add-official/add-official.module').then(
        (m) => m.AddOfficialPageModule
      ),
  },
  {
    path: 'add-vehicle',
    loadChildren: () =>
      import('./add-vehicle/add-vehicle.module').then(
        (m) => m.AddVehiclePageModule
      ),
  },
  {
    path: 'identify',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./identify/identify.module').then(
            (m) => m.IdentifyPageModule
          ),
      },
      {
        path: 'vehicle-details',
        loadChildren: () =>
          import('./identify/vehicle-details/vehicle-details.module').then(
            (m) => m.VehicleDetailsPageModule
          ),
      },
    ],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'scan',
    loadChildren: () =>
      import('./scan/scan.module').then((m) => m.ScanPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'report',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportPageModule),
      },
      {
        path: 'make-report',
        loadChildren: () =>
          import('./report/make-report/make-report.module').then(
            (m) => m.MakeReportPageModule
          ),
      },
    ],
  },

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
