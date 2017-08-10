import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';


const appRoutes: Routes = [
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full'},
	{ path:	'sign-up', component: SignupComponent },
	{ path: 'sign-in', component: SigninComponent },
	{ path: 'home', component: HomeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule{

}