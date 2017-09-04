import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent{

	currentUser: string;
	choreName: string;
	
	

	constructor(private userService: UserService, private databaseService: DatabaseService){}

	ngOnInit(){
		this.userService.currentUser.subscribe(
			(currentUser:string) => {
				this.currentUser = currentUser;
			}
		);
	}

	addNewChore(){
		this.databaseService.storeChore(this.currentUser, this.choreName);
	}
	



}