import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';

import { NgxLoginComponent } from '../modules/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NgxLoginComponent,


    NbAuthModule.forRoot({
        forms: {
          login: {
            redirectDelay: 0, // Opcional: agrega un retraso en redirección, si es necesario
            showMessages: {
              success: true,
            },
          },
        },
      }),  ],
  declarations: [
  ],
})
export class NgxAuthModule {
}