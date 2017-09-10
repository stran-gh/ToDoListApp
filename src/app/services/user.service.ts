import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Chore } from '../models/chore.model';
import { DatabaseService } from './database.service';

@Injectable()
export class UserService{
	currentUser = new EventEmitter<string>();

	constructor(){}

	
	
}