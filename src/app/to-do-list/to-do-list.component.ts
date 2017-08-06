import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent{
	constructor(private userService:UserService){}
	userName = this.userService.user;

}