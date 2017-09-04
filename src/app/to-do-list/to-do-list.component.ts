import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent{

	currentUser: string;
	
	// choreList: string[] = [];
	// choreToAdd: string;

	constructor(private userService:UserService){}

	ngOnInit(){
		this.userService.currentUser.subscribe(
			(currentUser:string) => {
				this.currentUser = currentUser;
				console.log("ngoninit todolistcomponent");
			}
		);
	}

	// addNewItem(){
	// 	if(this.choreToAdd == null || this.choreToAdd == ""){
	// 		//do nothing
	// 	}
	// 	else{
	// 		this.choreList.push(this.choreToAdd);
	// 		this.choreToAdd = "";
	// 	}
	// 	console.log(this.choreList);
	// }



}