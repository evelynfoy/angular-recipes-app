import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcZp4vb-fc1wkSwoxuQ67Krh_h4W0AFLI',
            {
                email: email,
                password: password,
                returnSEcureToken: true
            }
        );
    }
}