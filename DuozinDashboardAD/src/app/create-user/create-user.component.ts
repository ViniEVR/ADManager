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

  username: string = "";
  password: string = "";
  displayName: string = "";
  grupoSelecionado: string = "Financeiro"; // valor padrão do dropdown
  email: string = "";
  
  
  resetForm(){
    this.username = "";
    this.password = "";
    this.displayName = "";
    this.grupoSelecionado = "Financeiro";
    this.email = "";
  }

  runScript(scriptName: string) {
    if (!this.username || !this.password || !this.displayName || !this.email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    this.http.get(`http://localhost:3000/run-script/scripts/${scriptName}?Username=${this.username}&Password=${this.password}&DisplayName=${this.displayName}&Email=${this.email}&Group=${this.grupoSelecionado}`)

      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 200) {
              
              console.log(err.error);
            } else if (err.status === 500) {
              alert('Tivemos um problema com o servidor, tente novamente mais tarde!');
            }
          } else {
            console.error(err);
          }
          return throwError(err);
        })
      )
      .subscribe((res) => {
        if (res) {

          let retorno = JSON.stringify(res)
          if(retorno.includes("UPN")){
            alert("Já existe um usuário com essa conta ou email, favor alterar")
            this.email = "";
            this.username = "";
          } else if(retorno.includes("A senha") && (this.password).length < 8){
            alert('Usuário criado com sucesso, mas quando possível altere a senha!')
            this.resetForm()
          }else if(retorno.includes("A senha")){
            alert('Usuário criado com sucesso!')
            this.resetForm()
          }else if(retorno.includes("existe")){
            alert('Já existe um usuário com essa conta, favor alterar')
          }else{
            alert('Ocorreu um erro de comunicação com o servidor, tente novamente mais tarde!')
          }

        }
      });
  }
}

