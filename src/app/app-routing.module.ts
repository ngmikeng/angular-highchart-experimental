import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROOT_PATH } from './core/core.const';

const routes: Routes = [
  { path: `${ROOT_PATH}`, loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', redirectTo: `${ROOT_PATH}` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
