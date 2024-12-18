import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

//Services
import { PolizaService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { CustomTableComponent } from '@Component/Table';
import { PolizaModel } from '@Models/Polizas';

@Component({
  selector: 'app-lista-polizas',
  standalone: true,
  imports: [CustomTableComponent, NbCardModule, NbInputModule, NbButtonModule, ReactiveFormsModule, NbSelectModule,NgIf, NgFor],
  templateUrl: './lista-polizas.component.html'
})
export class ListaPolizasComponent implements OnInit{
  constructor() { }
  private polizaService = inject(PolizaService)
  private sweetAlertService = inject(SweetAlertService)

  polizasList: PolizaModel[] = [];

  ngOnInit(): void {
    this.getAllPolizas()
  }

  getAllPolizas() {
    this.polizaService.getAllPolizas().subscribe((data) => {
      this.polizasList = data.response.data;
    })
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