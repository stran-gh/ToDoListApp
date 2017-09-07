import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatabaseService } from '../services/database.service';
import { Chore } from '../models/chore.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent{

	currentUser: string;
	choresList: Chore[] = [];
	choreDescription: string;
	
	

	constructor(private userService: UserService, private databaseService: DatabaseService){}

	ngOnInit(){
		this.userService.currentUser.subscribe(
			(currentUser:string) => {
				this.currentUser = currentUser;
			}
		);
	}

	
	
	displayChores(){
			return this.databaseService.getChores(this.currentUser).then(
				(result) => {
					this.choresList = result;
				}
			);
	}

	onAddChore(f: NgForm){
		this.databaseService.storeChore(this.currentUser, f.value.choreTitle, f.value.choreDescription);
		this.displayChores();
	}

	onDeleteChore(chore){
		this.databaseService.deleteChore(chore);
		this.displayChores();
	}


}