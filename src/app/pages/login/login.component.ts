import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appName = 'My App';
  loginForm!: FormGroup;
  loading =  false;

  constructor(private fb: FormBuilder, private us: UsuarioService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  ingresar(){
    this.us.getUsuario().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
      });
      if(user){
        alert("Usuario encontrado");
        this.carga();
        this.router.navigate(['home']);
      }else{
        this.errorMessage();
      }
    },err=>{
      alert("Algo salio mal")
    })
    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    // console.log(email);
    // console.log(password);

    // if(email == 'mario@gmail.com' && password == '123456'){
    //   this.router.navigate(['home']);
    // } else{
    //   this.errorMessage();
    // }
  }

  errorMessage(){
    this._snackBar.open('Email y/o contraseña es incorrecta', 'Cancelar',{
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition:'bottom',
    })
  }

  carga(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

}
