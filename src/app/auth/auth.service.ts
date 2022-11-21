import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcZp4vb-fc1wkSwoxuQ67Krh_h4W0AFLI',
            {
                email: email,
                password: password,
                returnSEcureToken: true
            }
        )
        .pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occured!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
            }
            return throwError(errorMessage);
        }));
    }

    login(email: string, password: string) {

        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcZp4vb-fc1wkSwoxuQ67Krh_h4W0AFLI',
            {
                email: email,
                password: password,
                returnSEcureToken: true
            }
        ) 
    };
}