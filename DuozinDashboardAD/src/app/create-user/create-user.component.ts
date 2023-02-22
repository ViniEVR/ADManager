import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass'],
})
export class CreateUserComponent {
  constructor(private http: HttpClient) {}


  username: string = "teste";
  password: string = "123456";
  displayName: string = "vinicius.teste";
  email: string = "vinimice42@gmail.com";
  runScript(scriptName: string) {
    
    this.http.get(`http://localhost:3000/run-script/scripts/${scriptName}?Username=${this.username}&Password=${this.password}&DisplayName=${this.displayName}&Email=${this.email}`)

      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 200) {
              console.log(err.error);
            } else {
              console.error(err);
            }
          } else {
            console.error(err);
          }
          return throwError(err);
        })
      )
      .subscribe((res) => {
        if (res) {
          console.log(res);
        }
      });
  }
}
