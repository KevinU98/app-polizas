import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbActionComponent, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import html2pdf from 'html2pdf.js';

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

  exportPoliza(polizas:PolizaModel) {
    let poliza: PolizaModel = {
      Id: 1217,
      Fecha: '17/06/2024',
      Nombre: 'Juan Pérez',
      DireccionParticular: 'Calle Hidalgo #505 Nte',
      Telefono: '821-110-4745',
      Colonia: 'Centro',
      Poblacion: 'Linares, N.L.',
      DomicilioCobro: 'Domicilio Principal',
      Empresa: 'Ejemplo SA de CV',
      TelEmpresa: '555-555-5555',
      CalleEmpresa: 'Av. Insurgentes Sur',
      beneficiarios: [
        { Id: 1, Nombre: 'Ana Pérez', Edad: 25, Parantesco: 'Hija', ConsecutivoPoliza: 2, usuario: 0 },
        { Id: 2, Nombre: 'Luis Pérez', Edad: 30, Parantesco: 'Hijo', ConsecutivoPoliza: 2, usuario: 0 },
        { Id: 3, Nombre: 'María López', Edad: 60, Parantesco: 'Madre', ConsecutivoPoliza: 2, usuario: 0 }
      ],
      Vendedor: 'Carlos González',
      Promotor: 'Pedro Ramírez',
      Beneficiario: '',
      Edad: '',
      Parentesco: '',
      Renovacion: 0
    };
    const beneficiariosHTML = poliza.beneficiarios.map((benef, index) => `
      <tr>
          <td class="border border-slate-700 p-2" colspan="2"><strong>BENEFICIARIO (${index + 1}): </strong>${benef.Nombre}</td>
          <td class="border border-slate-700 p-2" colspan="2"><strong>EDAD: </strong>${benef.Edad}</td>
          <td class="border border-slate-700 p-2" colspan="2"><strong>PARENTESCO: </strong>${benef.Parantesco}</td>
      </tr>
    `).join('');

    const content = `
    <div class="grid grid-cols-10 grid-rows-1 text-xs">
      <!-- Encabezado -->
      <div class="col-span-8">
        CELESTIAL SEG Seguros Funerarios
        <p>Calle Miguel Hidalgo #505 Nte, Col. Centro, Linares, N.L. Tel: 821-110-47-45</p>
      </div>
      <div class="col-span-2 text-center">
        <table class="w-full">
          <tr>
           <td class="font-bold">Folio</td>
          </tr>
          <tr>
           <td>N° ${poliza.Id}</td>
          </tr>
          <tr>
           <td class="font-bold">Fecha</td>
          </tr>
          <tr>
           <td>${poliza.Fecha}</td>
          </tr>
        </table>
      </div>
    </div>
      <div class="mt-3 text-xs">
          <table class="border-collapse border border-slate-500 w-full">
              <tbody>
                  <tr>
                      <td class="border border-slate-700 p-2" colspan="6"><strong>NOMBRE: </strong>${poliza.Nombre}</td>
                  </tr>
                  <tr>
                      <td class="border border-slate-700 p-2" colspan="3"><strong>DIRECCIÓN PARTICULAR: </strong>${poliza.DireccionParticular}</td>
                      <td class="border border-slate-700 p-2" colspan="3"><strong>POBLACIÓN: </strong>${poliza.Poblacion}</td>
                  </tr>
                  <tr>
                      <td class="border border-slate-700 p-2" colspan="6"><strong>DOMICILIO DE COBRO:</strong>${poliza.DomicilioCobro}</td>
                  </tr>
                  <tr>
                      <td class="border border-slate-700 p-2" colspan="2"><strong>EMPRESA EN QUE TRABAJA: </strong>${poliza.Empresa}</td>
                      <td class="border border-slate-700 p-2" colspan="2"><strong>TEL: </strong>${poliza.TelEmpresa}</td>
                      <td class="border border-slate-700 p-2" colspan="2"><strong>CALLE: </strong>${poliza.CalleEmpresa}</td>
                  </tr>
                  ${beneficiariosHTML}
              </tbody>
          </table>
      </div>
      <div class="mt-1 text-xs">
          <table class="border-collapse border border-slate-500 w-full">
              <tbody>
                  <tr>
                      <td class="border border-slate-700 p-2"><strong>NOMBRE DEL VENDEDOR: </strong> ${poliza.Vendedor}</td>
                      <td class="border border-slate-700 p-2"><strong>NOMBRE DEL PROMOTOR: </strong></td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div class="mt-[50px] text-center grid grid-cols-8 grid-rows-2 text-xs">
          <div class="col-span-4">
              <div class="w-2/3 h-0.5 bg-gray-500 mx-auto mb-2"></div>
              <span class="font-bold">EL VENDEDOR</span>
          </div>
          <div class="col-span-4">
              <div class="w-2/3 h-0.5 bg-gray-500 mx-auto mb-2"></div>
              <span class="font-bold">EL CLIENTE</span>
          </div>
      </div>`;

    const options = {
      margin: 10,
      filename: `poliza-${poliza.Id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(content).save();
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