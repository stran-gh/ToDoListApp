import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Injectable()
export class DatabaseService{
	constructor(private http: Http){}


	storeUser(user: string){
		return this.http.post('https://todoproject-8af70.firebaseio.com/data.json', new User(user));
	}

	getUsers() : Promise<any> {
		var data = firebase.database().ref("data");
		let userArray: string[] = [];
		return new Promise<any>((resolve, reject) => {
			data.on('value', function(snapshot) {

				userArray = [];
				var dataList = snapshot.val();

				for( let key in dataList ){
					userArray.push(dataList[key].user);
				}
				//console.log(userArray);
				resolve(userArray);
			});
		})
	}

	deleteUser(user: string){
		console.log("deleting user from databaseservice");
		var database = firebase.database().ref("data");

		database.once('value', function(snapshot) {
				var test = snapshot.val();

				for(let key in test){
					if(user == (test[key].user)){
						firebase.database().ref("/data/" + key).remove();
					}
				}
			});	
	}
}