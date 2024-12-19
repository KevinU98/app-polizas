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
                <td class="border border-slate-700 p-2" colspan="2"><strong>BENEFICIARIO (${index + 1}): </strong>${benef.Nombre}</td>
                <td class="border border-slate-700 p-2" colspan="2"><strong>EDAD: </strong>${benef.Edad}</td>
                <td class="border border-slate-700 p-2" colspan="2"><strong>PARENTESCO: </strong>${benef.Parantesco}</td>
              </tr>
            `).join('');
            resolve(beneficiarios);
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
    <div class="grid grid-cols-10 items-center text-xs">
      <div class="col-span-8 flex flex-col items-left">
        <img src="${images.logo}" class="h-[200px] w-[400px]" alt="Logotipo" />
        <p class="text-sm"> Calle Miguel Hidalgo #505 Nte, Col. Centro, Linares, N.L. Tel: 821-110-47-45.</p>
      </div>
      <div class="col-span-2 text-center">
        <table class="text-sm">
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
      </div>
      <div class="mt-1">
        <table class="w-full">
          <tbody>
            <tr class="bg-[#21B2F9] text-white">
              <td class="font-bold border border-slate-700 p-2 text-center text-sm" colspan="2">El servicio funerario incluye</td>
            </tr>
            <tr>
              <td class="p-2 text-sm w-1/2"><strong>1.</strong> Gestión del funeral.</td>
              <td class="p-2 text-sm w-1/2"><strong>2.</strong> Traslado local.</td>
            </tr>
            <tr>
              <td class="p-2 text-sm"><strong>3.</strong> Preparación estética del cuerpo.</td>
              <td class="p-2 text-sm"><strong>4.</strong> Embalsamamiento por muerte natural.</td>
            </tr>
            <tr>
              <td class="p-2 text-sm"><strong>5.</strong> Ataúd metálico especial.</td>
              <td class="p-2 text-sm"><strong>6.</strong> Capillas de velación (Sala 2) en Funerales Martinez.</td>
            </tr>
            <tr>
              <td class="p-2 text-sm"><strong>7.</strong> Servicio de carroza.</td>
              <td class="p-2 text-sm"><strong>8.</strong> 50% de gastos de inhumación en Jardines de San Felipe (tarifa al momento de utilizarlo).</td>
            </tr>
            <tr>
              <td class="p-2 text-sm"><strong>9.</strong> El servicio comienza su validez a partir del día 30 de ser liquidado.</td>
              <td class="p-2 text-sm"><strong>10.</strong> Posteriormente, durante el transcurso de los 30 dias, estaría llegando su contrato de póliza para ser firmado y verificar datos correspondientes.</td>
            </tr>
          </tbody>
        </table>
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