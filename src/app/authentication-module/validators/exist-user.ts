import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, delay, map } from "rxjs";
import { AuthService } from "src/app/shared-module/authentication/auth.service";

export const ExistUser = (userAuth:AuthService) => (control: AbstractControl): Observable<ValidationErrors | null> => {

    const {user} = control.value;

    return userAuth.verifyUser(user).pipe(
        delay(200),
        map((data) => {
            console.log(data)
            return data ? {userNotExistent: true} : null;
        })
    )

}
