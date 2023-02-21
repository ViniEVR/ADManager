import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass'],
})

export class CreateUserComponent {
  constructor(private http: HttpClient) {}

  runScript(scriptName: string) {
    this.http
      .get('http://localhost:3000/run-script/scripts/' + scriptName)
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
