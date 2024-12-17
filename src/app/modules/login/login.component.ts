import { Component, inject } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

import { NbInputModule, NbButtonModule, NbToastrService, NbToastrModule} from '@nebular/theme';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { LoginRequest } from 'src/app/core/models/login/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NbInputModule, NbButtonModule, NbToastrModule],
  providers: [NbToastrService],
  styleUrls: ['./login.component.scss']
})
export class NgxLoginComponent extends NbLoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(LoginService)
  private toastr = inject(NbToastrService)

  form = this.fb.nonNullable.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    this.router.navigate(['/home']);
    // if (this.form.valid) {
    //   const { usuario, password } = this.form.getRawValue();
    //   const request: LoginRequest = {
    //     username: usuario,
    //     userpassword: password
    //   };
    //   this.auth.auth(request)
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res)
    //         const data = res.response.data;
    //         if (data.Token != null) {
    //         localStorage.setItem('token', data.Token);
    //         localStorage.setItem('idUsuario', data.Usuario.Id.toString());
    //         localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
    //         localStorage.setItem('usuario', data.Usuario.NombreUsuario);
    //         localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
    //           this.toastr.success("Bienvenido")
    //           this.router.navigate(['/home']);
    //         }
    //         else {
    //           this.toastr.warning("Usuario o contraseña inválidos")
    //           this.resetForm()
    //         }
    //       },
    //       error: (err) => {
    //         this.toastr.danger("Ha ocurrido un error: " + err.message);
    //         console.log(err);
    //         this.resetForm();
    //       }
    //     });
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

  resetForm(): void{
    this.form.reset({
      usuario: "",
      password: ""
    })
  }
}
