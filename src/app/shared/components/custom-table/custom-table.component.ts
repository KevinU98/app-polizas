import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbIconModule,NbButtonModule, NbInputModule, NbCardModule } from '@nebular/theme';
@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, NbIconModule, FormsModule, NbButtonModule, NbCardModule, CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit{
  @Input() keyRow: string = "Id";
  @Input() tableHead: string = "Tabla";
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() keys: any[] =[];
  @Input() hasSearch: boolean = false;
  @Input() hasExport: boolean = false;
  @Input() hasEdit: boolean = false;
  @Input() hasDelete: boolean = false;
  
  @Output() editEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmit: EventEmitter<any> = new EventEmitter();

  //Buscar elemento
  elementoBuscado: string = "";

  //Paginacion
  currentPage: number = 1;
  currentPerPage: number = 10;
  totalItems: number = 0;

  //Sorting
  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {}

  ngOnInit(): void {
    this.totalItems = this.data.length;
  }


  get filtrarDatos(): any[] {
    const elemento = this.elementoBuscado.toLowerCase();
    const filteredData = !elemento ? this.data : this.data.filter(row =>
        this.keys.some(key =>
          row[key].toString().toLowerCase().includes(elemento)
        )
      )
    

    this.totalItems = filteredData.length;
    return filteredData.slice((this.currentPage - 1) * this.currentPerPage, this.currentPage  * this.currentPerPage)
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.lastPage) {
      this.currentPage = page
    }
  }

  get lastPage(): number {
    return Math.ceil(this.totalItems / this.currentPerPage)
  }

  sortTable(key: string): void {
    if (this.sortKey == key) {
      this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.data.sort((a,b) => {
      const valorA = a[key]
      const valorB = b[key]

      if (valorA == null || valorB == null) return 0

      const comparacion = valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
      return this.sortDirection == 'asc' ? comparacion : -comparacion;
    })
  }

  editRow(data: any){
    this.editEmit.emit(data)
  }

  deleteRow(data: any){
    this.deleteEmit.emit(data[this.keyRow])
  }
}
