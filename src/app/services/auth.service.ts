import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable()
export class AuthService{
	token: string;
	signInSuccess: boolean = true;

	constructor(private router: Router) {}

	// Creates an authenticated user in firebase.
	signupUser(email: string, password: string){
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(
			error=> console.log(error)
			)
	}
	
	// Checks if the information entered corresponds to an existing user
	// and redirects if true.
	signinUser(email: string, password: string){
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(
			response => {
				this.router.navigate(['/home']);
				firebase.auth().currentUser.getIdToken()
				.then(
					(token: string) => this.token = token
				);
				this.signInSuccess = true;
			}
		)
		.catch(
			error=> {
				console.log(error);
				this.signInSuccess = false;
			}
		);
	}

	// Checks if the firebase token exists. Firebase token is assigned
	// whenever a user is properly signed in.
	isAuthenticated(){
		return this.token != null;
	}

	// Logs user out from firebase and removes token
	logout(){
		firebase.auth().signOut();
		this.token = null;
	}

}