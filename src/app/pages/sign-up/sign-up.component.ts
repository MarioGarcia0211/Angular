import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  regForm!: FormGroup;

  constructor(private fb:FormBuilder, private us: UsuarioService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  registrar(){
    if (this.regForm.valid) {
      this.us.agregarUsuario(this.regForm.value).subscribe({
        next:(res)=>{
          alert("Usuario creado correctamente");
          this.regForm.reset();
          this.router.navigate(['sign-in']);
        },
        error:()=>{
          alert("Error al registrarte")
        }
      })
    }
  }

}
