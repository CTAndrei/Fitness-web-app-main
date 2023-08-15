import { AuthService } from "src/app/shared-module/authentication/auth.service";
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import {Observable, of, map, take, delay} from 'rxjs'

export const IncorectCredentials = (userAuth: AuthService) => (control: AbstractControl): Observable<ValidationErrors | null> => {

        const {user, password} = control.value;
        console.log(user)
        console.log(password)

        return userAuth.checkUserOrPasswordValidity(user, password).pipe(
                delay(200),
                map((res) => {
                        console.log(res)
                        return res ? {emailOrPasswordError: true} : null; 
                }),
        )
        
        
    
}
