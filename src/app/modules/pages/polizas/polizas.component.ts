import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

//Services
import { PolizaService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { PolizaRequest, GetPolizasResponse, PolizaModel } from '@Models/Polizas';
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

  // polizasList: PolizaModel[] = [];
  polizasList: PolizaModel[] = [
    {
      Id: 1,
      Nombre: 'Juan Pérez',
      DireccionParticular: 'Calle Falsa 123',
      Colonia: 'Centro',
      Telefono: '555-123-4567',
      Poblacion: 'Ciudad A',
      DomicilioCobro: 'Domicilio 123',
      Empresa: 'Empresa XYZ',
      TelEmpresa: '555-789-4561',
      CalleEmpresa: 'Avenida Principal 456',
      Beneficiario: 'Ana López',
      Edad: '35',
      Parentesco: 'Hermano',
      Vendedor: 'Carlos Ramírez',
      Promotor: 'Laura Mendoza',
      Renovacion: 1,
    },
    {
      Id: 2,
      Nombre: 'María González',
      DireccionParticular: 'Calle Sol 456',
      Colonia: 'Norte',
      Telefono: '555-234-5678',
      Poblacion: 'Ciudad B',
      DomicilioCobro: 'Cobro 456',
      Empresa: 'Empresa ABC',
      TelEmpresa: '555-456-7890',
      CalleEmpresa: 'Avenida Sur 789',
      Beneficiario: 'Pedro Martínez',
      Edad: '42',
      Parentesco: 'Padre',
      Vendedor: 'Karla Torres',
      Promotor: 'Sandra Gómez',
      Renovacion: 0,
    },
    {
      Id: 3,
      Nombre: 'Pedro Martínez',
      DireccionParticular: 'Avenida Luna 789',
      Colonia: 'Este',
      Telefono: '555-345-6789',
      Poblacion: 'Ciudad C',
      DomicilioCobro: 'Cobro 789',
      Empresa: 'Empresa 123',
      TelEmpresa: '555-567-8901',
      CalleEmpresa: 'Calle Norte 456',
      Beneficiario: 'Lucía Pérez',
      Edad: '28',
      Parentesco: 'Esposa',
      Vendedor: 'José Suárez',
      Promotor: 'Claudia Ruiz',
      Renovacion: 1,
    }
  ];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    direccionParticular: ['', [Validators.required]],
    colonia: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    poblacion: ['', [Validators.required]],
    domicilioCobro: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    telEmpresa: ['', [Validators.required]],
    calleEmpresa: ['', [Validators.required]],
    beneficiario: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    parentesco: ['', [Validators.required]],
    vendedor: ['', [Validators.required]],
    promotor: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getAllPolizas()
  }

  getAllPolizas() {
    // this.polizaService.getAllPolizas().subscribe((data) => {
    //   this.polizasList = data.response.data;
    // })
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
          this.getAllPolizas();
          this.resetForm();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
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

  editPoliza(data: PolizaModel){
    console.log(data)
  }

  deletePoliza(Id: number) {
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
