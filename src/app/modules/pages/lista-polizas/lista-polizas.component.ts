import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { images } from '@Constants';
import html2pdf from 'html2pdf.js';

//Services
import { PolizaService } from '@Services';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

//Models
import { CustomTableComponent } from '@Component/Table';
import { BeneficiarioModel, GetBeneficiarioRequest, PolizaModel } from '@Models/Polizas';

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
  beneficiariosList: BeneficiarioModel[] = [];

  ngOnInit(): void {
    this.getAllPolizas()
  }

  getAllPolizas() {
    this.polizaService.getAllPolizas().subscribe((data) => {
      this.polizasList = data.response.data;
    })
  }

  getAllBeneficiarios(idPoliza:number):any {
    const request: GetBeneficiarioRequest = {
      consecutivo: idPoliza
    }
    this.polizaService.getAllBeneficiarios(request).subscribe((data) => {
      return data.response.data;
    })
  }

  async exportPoliza(poliza:PolizaModel) {
    let beneficiariosHTML = "";
    const obtenerBeneficiarios = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const request: GetBeneficiarioRequest = { consecutivo: poliza.Id };
        this.polizaService.getAllBeneficiarios(request).subscribe(
          (data) => {
            const beneficiarios = data.response.data.map((benef, index) => `
              <tr>
                <td class="border border-slate-500 p-2" colspan="2"><strong>ASEGURADO (${index + 1}): </strong>${benef.Nombre}</td>
                <td class="border border-slate-500 p-2"><strong>EDAD: </strong>${benef.Edad}</td>
                <td class="border border-slate-500 p-2"><strong>PARENTESCO: </strong>${benef.Parantesco}</td>
              </tr>
            `);
            const totalRows = 5;
            const emptyRows = totalRows - beneficiarios.length;
            for (let i = 0; i < emptyRows; i++) {
              beneficiarios.push(`
                <tr>
                  <td class="border border-slate-500 p-2" colspan="2"><strong>ASEGURADO (${beneficiarios.length + 1}): </strong>---</td>
                  <td class="border border-slate-500 p-2"><strong>EDAD: </strong>---</td>
                  <td class="border border-slate-500 p-2"><strong>PARENTESCO: </strong>---</td>
                </tr>
              `);
            }
            resolve(beneficiarios.join(''));
          },
          (error) => reject(error)
        );
      });
    };    
    try {
      beneficiariosHTML = await obtenerBeneficiarios();
    } catch (error) {
      return;
    }
    const content = `
    <style>
      table {
        page-break-inside: avoid;
      }
      tr {
        page-break-inside: avoid;
      }
      td {
        page-break-inside: avoid;
      }
    </style>
    <div class="grid grid-cols-10 items-center ">
      <div class="col-span-7 flex flex-col items-left">
        <img src="../../../assets/dist/image/logo.png" class="h-[130px] w-[300px]" alt="Logotipo" />
      </div>
      <div class="col-span-3 bg-[#21B2F9] text-center text-sm">
          <h4 class="text-white p-4">Póliza de Seguro</h4>
      </div>
    </div>
    <div class="mt-1 border-collapse border border-slate-500 text-xs">
      <table class="w-full">
        <tbody>
          <tr>
            <td class="p-2 border border-slate-500"><strong>PÓLIZA: </strong>35063-02</td>
            <td class="p-2 border border-slate-500"><strong>CONSECUTIVO: </strong>49341</td>
            <td class="p-2 border border-slate-500"><strong>AGENTE: </strong>99</td>
            <td class="p-2 border border-slate-500"><strong>OFICINA: </strong>MATRIZ</td>
          </tr>
          <tr>
            <td class="p-2 border border-slate-500"><strong>ID CLIENTE: </strong>0001508628</td>
            <td class="p-2 border border-slate-500"><strong>MEDIO PAGO: </strong>ANUAL</td>
            <td class="p-2 border border-slate-500"><strong>FORMA PAGO: </strong>ANUAL</td>
            <td class="p-2 border border-slate-500"><strong>DIAS VIGENCIA: </strong>365</td>
          </tr>
          <tr>
            <td class="text-center p-21 border border-slate-500"><strong>DESDE HRS.</strong></td>
            <td class="text-center p-2 border border-slate-500"><strong>HASTA HRS.</strong></td>
            <td class="text-center p-2 border border-slate-500"><strong>FECHA DE EMISIÓN</strong></td>
            <td class="text-center p-2 border border-slate-500"><strong>PLAN</strong></td>
          </tr>
          <tr>
            <td class="text-center p-2 border border-slate-500">31/12/2024 12:00</td>
            <td class="text-center p-2 border border-slate-500">31/12/2025 12:00</td>
            <td class="text-center p-2 border border-slate-500">31/12/2024</td>
            <td class="text-center p-2 border border-slate-500">PLAN MAESTRO ACCIDENTES</td>
          </tr>
        </tbody>
      </table>
      </div>
      <table class="border-collapse border border-slate-500 w-full text-xs">
          <tbody>
            <tr>
              <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center" colspan="4"><strong>DATOS DEL CONTRATANTE</strong></td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2" colspan="4"><strong>NOMBRE: </strong>${poliza.Nombre}</td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2" colspan="3"><strong>DIRECCIÓN PARTICULAR: </strong>${poliza.DireccionParticular}</td>
              <td class="border border-slate-500 p-2"><strong>POBLACIÓN: </strong>${poliza.Poblacion}</td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2" colspan="3"><strong>DIRECCIÓN DE COBRO: </strong>${poliza.DomicilioCobro}</td>
              <td class="border border-slate-500 p-2"><strong>TEL: </strong>${poliza.Telefono}</td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center" colspan="4"><strong>DATOS DE LA EMPRESA EN QUE TRABAJA</strong></td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2" colspan="3"><strong>NOMBRE: </strong>${poliza.Empresa}</td>
              <td class="border border-slate-500 p-2"><strong>TEL: </strong>${poliza.Telefono}</td>
            </tr>
            <tr>
              <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center" colspan="4"><strong>ASEGURADOS</strong></td>
            </tr>
            ${beneficiariosHTML}
        </tbody>
      </table>
    </div>
    <div class="text-xs">
      <table class="border-collapse border border-slate-500 w-full">
        <tbody>
          <tr>
            <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center" colspan="4"><strong>BENEFICIOS CUBIERTOS</strong></td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2 w-1/2" colspan="2"><strong>1.</strong> Gestión del funeral.</td>
            <td class="border border-slate-500 p-2 w-1/2" colspan="2"><strong>2.</strong> Traslado local.</td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2" colspan="2"><strong>3.</strong> Preparación estética del cuerpo.</td>
            <td class="border border-slate-500 p-2" colspan="2"><strong>4.</strong> Embalsamamiento por muerte natural.</td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2" colspan="2"><strong>5.</strong> Ataúd metálico especial.</td>
            <td class="border border-slate-500 p-2" colspan="2"><strong>6.</strong> Capillas de velación (Sala 2) en Funerales Martinez.</td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2" colspan="2"><strong>7.</strong> Servicio de carroza.</td>
            <td class="border border-slate-500 p-2" colspan="2"><strong>8.</strong> 50% de gastos de inhumación en Jardines de San Felipe (tarifa al momento de utilizarlo).</td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2" colspan="2"><strong>9.</strong> El servicio comienza su validez a partir del día 30 de ser liquidado.</td>
            <td class="border border-slate-500 p-2" colspan="2"><strong>10.</strong> Posteriormente, durante el transcurso de los 30 dias, estaría llegando su contrato de póliza para ser firmado y verificar datos correspondientes.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-xs">
      <table class="border-collapse border border-slate-500 w-full">
        <tbody>
          <tr>
            <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center"><strong>NOMBRE DEL VENDEDOR: </strong></td>
            <td class="border border-slate-500 p-2 bg-[#21B2F9] text-white text-center"><strong>NOMBRE DEL PROMOTOR: </strong></td>
          </tr>
          <tr>
            <td class="border border-slate-500 p-2 text-center">${poliza.Vendedor}</td>
            <td class="border border-slate-500 p-2 text-center">${poliza.Promotor}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-[30px] text-center grid grid-cols-8 grid-rows-2 text-xs">
      <div class="col-span-4">
        <div class="w-2/3 h-0.5 bg-gray-500 mx-auto mb-1"></div>
        <span class="font-bold">EL VENDEDOR</span>
      </div>
      <div class="col-span-4">
        <div class="w-2/3 h-0.5 bg-gray-500 mx-auto mb-1"></div>
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