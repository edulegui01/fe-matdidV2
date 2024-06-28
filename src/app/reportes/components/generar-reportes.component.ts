import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalMessage } from 'src/app/class/global-message';
import { MENU_URLS } from 'src/app/components/navbar/routes';
import { Cliente } from 'src/app/class/cliente';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteData } from 'src/app/class/clienteData';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { ThisReceiver } from '@angular/compiler';
import { PaginatorEs } from 'src/app/utils/paginatorEs';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/class/settings';
import { CustomDialogComponent } from 'src/app/components/custom-dialog/components/custom-dialog.component';
import { ReporteService } from '../services/reportes.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-generar-reportes-list',
  templateUrl: '../templates/generar-reporte.component.html',
  styleUrls: ['../styles/generar-reportes.component.scss']
})
export class GenerarReportesListComponent  implements OnInit {
  
  dataSource!:ClienteData;
  clienteToEdit!:any;
  routerInstant!:Router;
  paginatorRange = GlobalMessage.PAGINATOR_RANGE;
  resultsLength!: Observable<number>;
  pageEvent!:PageEvent;
  filterForm!:FormGroup;
  viewText = GlobalMessage.VIEW_LABELS;
  deleteDefaultMessage = 'EL REGISTRO';
  paginatorRef!: MatPaginator;
  @ViewChild(MatPaginator) paginatorf!: MatPaginator;

  optionList = [
    {
        optionText:"REPORTE DE INVENTARIO",
        value: "/inventario/report"
    },
    {
      optionText:"REPORTE DE VENTAS",
      value: "/reporte/vendidos"
    },
    {
      optionText:"REPORTE DE COMPRAS",
      value: "/reporte/comprados"
    },
    {
      optionText:"REPORTE DE PAGOS",
      value: "/reporte/pagos"
    },
    {
      optionText:"REPORTE DE COBROS",
      value: "/reporte/cobros"
    }
  ]

  pdfView:any = '';
  
  
  
  

  constructor(private reporteService:ReporteService, private paginator: MatPaginatorIntl, private fb:FormBuilder, 
    private routerInstance: Router, private dialogInstance: MatDialog, private datePipe: DatePipe,) {
  }

  ngOnInit(): void {
    this.initDataSource();
    
    this.filterForm = this.fb.group({
      filtroSelect: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      cedula: [''],
    })


   
  }

  ngAfterViewInit() {
        this.paginatorRef = this.paginatorf;
        
  }



  initDataSource(){
    //this.reporteService.getClientes().subscribe( (clienteData:ClienteData) => this.dataSource = clienteData)
  }

  generarPDF(){
    
    const fechaDesde = this.datePipe.transform(this.filterForm.controls['fechaDesde'].value,'YYYY-MM-dd');
    const fechaHasta = this.datePipe.transform(this.filterForm.controls['fechaHasta'].value,'YYYY-MM-dd');
    
    this.reporteService.getPdfInventario(this.filterForm.value.filtroSelect,fechaDesde,fechaHasta).subscribe(res  =>{
      let blob:Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      this.pdfView = url;
      //window.open(url);
    })

    
  }

  doFilter(){
    
    let cedula = this.filterForm.value.cedula;
    let name = this.filterForm.value.name;

    console.log(cedula);
    
    //this.proveedorService.getClientes('0','10',cedula,name).subscribe((clienteData:ClienteData) => this.dataSource = clienteData);
  }












 







  

  
}

