import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './services/auth-guard.service';


const appRoutes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full'},
	{ path:	'sign-up', component: SignupComponent },
	{ path: 'sign-in', component: SigninComponent },
	{ path: 'home', component: HomeComponent
	//,canActivate: [AuthGuard]
	 }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule{

}