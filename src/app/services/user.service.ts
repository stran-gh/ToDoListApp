import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Chore } from '../models/chore.model';

@Injectable()
export class UserService{
	userArray:string[] = [];
	currentUser = new EventEmitter<string>();

	setUser(user){
		this.currentUser = user;
	}

	
	
}