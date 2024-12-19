import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//Services
import { PolizaService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { PolizaRequest, PolizaModel, GetBeneficiarioRequest, BeneficiarioRequest, BeneficiarioModel } from '@Models/Polizas';
import { CustomTableComponent } from '@Component/Table';

@Component({
  selector: 'app-polizas',
  standalone: true,
  imports: [CustomTableComponent, NbCardModule, NbInputModule, NbButtonModule, ReactiveFormsModule, NbSelectModule,NgIf, NgFor],
  templateUrl: './polizas.component.html'
})
export class PolizaComponent implements OnInit{
  constructor() { }
  private fb = inject(FormBuilder)
  private polizaService = inject(PolizaService)
  private sweetAlertService = inject(SweetAlertService)

  beneficiariosList: BeneficiarioModel[] = [];

  form = this.fb.nonNullable.group({
    folio: [0],
    nombre: ['', [Validators.required]],
    direccionParticular: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    poblacion: ['', [Validators.required]],
    domicilioCobro: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    telEmpresa: ['', [Validators.required]],
    calleEmpresa: ['', [Validators.required]],
    beneficiario: [''],
    edad: [''],
    parentesco: [''],
    vendedor: ['', [Validators.required]],
    promotor: ['', [Validators.required]],
  })

  formBeneficiario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    edad: [0, [Validators.required]],
    parentesco: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getFolio()
  }

  finalizar(): void {
    this.resetForm();
    this.resetFormBeneficiario();
    this.getFolio();
  }

  getFolio() {
    this.polizaService.getFolio().subscribe((data) => {
      this.form.patchValue({
        folio: data.response.data[0].Consecutivo
      });
    })
  }

  getAllBeneficiarios() {
    const { folio } = this.form.getRawValue();
    const request: GetBeneficiarioRequest = {
      consecutivo: folio
    }
    this.polizaService.getAllBeneficiarios(request).subscribe((data) => {
      this.beneficiariosList = data.response.data;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { nombre, direccionParticular, colonia, telefono, poblacion, domicilioCobro, empresa, telEmpresa, calleEmpresa, beneficiario, edad, parentesco, vendedor, promotor } = this.form.getRawValue();
      const request: PolizaRequest = {
        nombre: nombre,
        direccionParticular: direccionParticular,
        colonia: colonia,
        telefono: telefono,
        poblacion: poblacion,
        domicilioCobro: domicilioCobro,
        empresa: empresa,
        telEmpresa: telEmpresa,
        calleEmpresa: calleEmpresa,
        beneficiario: beneficiario,
        edad: edad,
        parentesco: parentesco,
        vendedor: vendedor,
        promotor: promotor
      }

      const serviceCall = this.polizaService.insertPoliza(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.getAllBeneficiarios();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  onSubmitBeneficiario(): void{
    if (this.formBeneficiario.valid) {
      const { nombre, edad, parentesco} = this.formBeneficiario.getRawValue();
      const { folio } = this.form.getRawValue();
      const request: BeneficiarioRequest = {
        consecutivoPoliza: folio,
        nombre: nombre,
        edad: edad,
        parantesco: parentesco,
        usuario: 1
      }

      const serviceCall = this.polizaService.insertBeneficiario(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetFormBeneficiario();
          this.getAllBeneficiarios();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.formBeneficiario.markAllAsTouched();
    }
  }

  resetFormBeneficiario(): void{
    this.formBeneficiario.reset({
      nombre: '',
      edad: 0,
      parentesco: ''
    })
  }

  resetForm(): void{
    this.form.reset({
      nombre: '',
      direccionParticular: '',
      colonia: '',
      telefono: '',
      poblacion: '',
      domicilioCobro: '',
      empresa: '',
      telEmpresa: '',
      calleEmpresa: '',
      beneficiario: '',
      edad: '',
      parentesco: '',
      vendedor: '',
      promotor: '',
    })
  }

  editBeneficiario(data: PolizaModel){
    console.log(data)
  }

  deleteBeneficiario(Id: number) {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar esta póliza?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("borrado");
      }
    });
  }
  
}
