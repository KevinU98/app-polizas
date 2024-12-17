import { Injectable } from '@angular/core';
import Swal, {SweetAlertOptions, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor() { }

  private defaultConfirmButtonColor = '#d33';
  private defaultCancelButtonColor = '#3085d6';
  private defaultCustomClass = {
    popup: 'dark:bg-dark-bg',
    title: 'dark:text-white',
    validationMessage: 'dark:bg-dark-bg text-white',
  };

  fire(options: SweetAlertOptions): Promise<SweetAlertResult<any>>{
    return Swal.fire(options);
  }

  confirm(options?: SweetAlertOptions) {
    return Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: options?.confirmButtonColor || this.defaultConfirmButtonColor,
      cancelButtonColor: options?.cancelButtonColor || this.defaultCancelButtonColor,
      customClass: { ...this.defaultCustomClass, ...options?.customClass },
      ...options,
    });
  }

  success(title: string, text: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'dark:bg-dark-bg',
        title: 'dark:text-white',
        validationMessage: 'dark:bg-dark-bg text-white',
      }
    });
  }

  error(title: string, text: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'dark:bg-dark-bg',
        title: 'dark:text-white',
        validationMessage: 'dark:bg-dark-bg text-white',
      }
    });
  }
}
