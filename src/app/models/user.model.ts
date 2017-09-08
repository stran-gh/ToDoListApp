import { Chore } from './chore.model';

export class User{
	constructor(public user: string, public chore: Chore, public choreCount: number){

	}
}