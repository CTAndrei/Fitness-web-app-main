import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) {}
  loading = new Subject<boolean>();
  userDoesNotExist = new Subject<boolean>();
  userOrPasswordIncorect = new Subject<boolean>();

  // verifyUser(value:string): Promise<boolean>{
  //    return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const getUser = JSON.parse(localStorage.getItem('users')!);
  //       let checkedUser = getUser.find((user:any) => user.name == value)
  //       let notExistent = false;
  //       if(!checkedUser){
  //         notExistent = true;
  //         resolve(notExistent)
  //       }
  //       resolve(notExistent);
  //     }, 1000);
  //    }) 
      
  // }

  verifyUser(value:string): Observable<boolean>{
     
            const getUser = JSON.parse(localStorage.getItem('users')!);
            let checkedUser = getUser.find((user:any) => user.name == value)
            let notExistent = false;
            if(!checkedUser){
              notExistent = true;
              return of(notExistent)
            }
            return of(notExistent);
        
 }

  // checkUserOrPasswordValidity(value:string, password: string): Promise<boolean>{
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const getUser = JSON.parse(localStorage.getItem('users')!);
  //       let checkedUser = getUser.find((user:any) => user.name == value)
  //       let credentialsError = false;
        
  //       if(checkedUser?.name !== value || checkedUser?.password !== password){
  //         credentialsError = true;
  //         resolve(credentialsError);
  //       }
  //       resolve(credentialsError);
  //     }, 1000);
  //   }) 
  // }

  checkUserOrPasswordValidity(value:string, password: string): Observable<boolean>{
      
        const getUser = JSON.parse(localStorage.getItem('users')!);
        let checkedUser = getUser.find((user:any) => user.name == value)
        let credentialsError = false;
        
        if(checkedUser?.name !== value || checkedUser?.password !== password){
          credentialsError = true;
          return of(credentialsError);
        }
        return of(credentialsError);
  
  }

  // // Validate responses from the functions above and return a boolean value
  // validForm(areCredentialsInvalid:boolean, notExistentUser: boolean): Promise<boolean>{
    
    
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if(!areCredentialsInvalid && !notExistentUser){
          
          
  //         resolve(true);
  
  //       }
  //       resolve(false);
  //     }, 3000);
  //   })
  // }

  validForm(areCredentialsInvalid:boolean, notExistentUser: boolean, activeUser:string): void{
    
      
      this.loading.next(false);
      this.userOrPasswordIncorect.next(false);
      this.userDoesNotExist.next(false);
    
      setTimeout(() => {
        if(!areCredentialsInvalid && !notExistentUser){
          
          this.loading.next(true);
          const getUser = JSON.parse(localStorage.getItem('users')!);
          let checkedUser = getUser.find((user:any) => user.name == activeUser);
          localStorage.setItem('loggedUser', JSON.stringify(checkedUser));
          this.route.navigate(['scheduler']);
  
        }

        if(notExistentUser){
          this.loading.next(true);
          console.log("notExistentUser")
          this.userDoesNotExist.next(true);
        }

        if(areCredentialsInvalid){
          this.loading.next(true);
          console.log("areCredentialsInvalid")
          this.userOrPasswordIncorect.next(true);
        }
          
        
        
      }, 2000);

  }

  getCurrentUser(){
    const user = JSON.parse(localStorage.getItem('loggedUser')!);
    return user;
  }
  
}
