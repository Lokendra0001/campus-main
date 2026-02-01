import { Routes } from '@angular/router';
import { SignIn } from './components/signIn/SignIn';
import { SignUp } from './components/signUp/signUp';
import { Home } from './components/home/home';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { About } from './components/about/about';
import { Retrive } from './components/retrive/retrive';
import { Submit } from './components/submit/submit';
import { Admin } from './components/admin/admin';
import { Dashboard } from './components/admin/dashboard/dashboard';


export const routes: Routes = [

  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignUp },
  { path: '', component: Home },
  { path: 'about' , component:About},
  {path: 'submit' , component:Submit},
  { path: 'retrive_item' , component: Retrive},
  { path: '**', redirectTo: 'signin' },
  { path : 'Admin' , component : Admin},
  { path : 'dashboard' , component: Dashboard }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
