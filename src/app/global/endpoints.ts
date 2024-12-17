import { environment } from '@Environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const polizas = {
  get: `${environment.urlBase}Polizas/GetPolizas`,
  insert: `${environment.urlBase}Polizas/InsertPoliza`,
}