import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent{
	constructor(private userService:UserService){}
	userArray:string[] = this.userService.userArray;
	
}