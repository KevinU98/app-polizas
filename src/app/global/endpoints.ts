import { environment } from '@Environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const polizas = {
  getFolio: `${environment.urlBase}Polizas/Getconsecutivo`,
  get: `${environment.urlBase}Polizas/GetPolizas`,
  insert: `${environment.urlBase}Polizas/InsertPoliza`,
}

export const beneficiarios = {
  get: `${environment.urlBase}Polizas/GetBeneficiarios`,
  insert: `${environment.urlBase}Polizas/InsertBeneficiario`,
}