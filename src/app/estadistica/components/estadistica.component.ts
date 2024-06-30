import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
//import { Moment } from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-estadistica',
  templateUrl: '../templates/estadistica.component.html',
  styleUrls: ['../styles/estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  filterForm!:FormGroup;

  ventasGrafico:any;
  montosGrafico:any;
  cobradoMes:any;
  pagadoMesGrafico:any;

  hoy = new Date();
  productosGrafico:any = [];
  cantidadGrafico:any = [];
  montoTotal:any = [];
  clientes:any = [];


  montoMes:any=[];
  pagadoMes:any=[];

  date = new FormControl(moment());
  
  constructor(public estadisticaService:EstadisticaService,private fb:FormBuilder,private datePipe: DatePipe,) { }

  ngOnInit(): void {
   this.renderGrafic([]);
   this.renderGrafico2();
   this.renderGrafico3();
   this.renderGrafico4();
    let desde = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
    const fechaDesde = this.datePipe.transform(desde,'YYYY-MM-dd');
    const fechaHasta = this.datePipe.transform(this.hoy,'YYYY-MM-dd');

    

   this.filterForm = this.fb.group({
    fechaDesde1: [''],
    fechaHasta1: [''],
    fechaDesde2: [''],
    fechaHasta2: [''],
    anho1: [moment()],
    anho2: [moment()],
  })
  
  this.estadisticaService.getCantidadProductoVendidos(fechaDesde,fechaHasta).subscribe((estadisticaData:any) => {
    
    this.productosGrafico = estadisticaData.productos;
    this.cantidadGrafico = estadisticaData.cantidad;
    this.ventasGrafico.destroy()
    this.renderGrafic([])
  })

  this.estadisticaService.getMontosPorVentas(fechaDesde,fechaHasta).subscribe((estadisticaData:any) => {
    this.montoTotal = estadisticaData.montoTotal;
    this.clientes = estadisticaData.clientes;
    this.montosGrafico.destroy()
    this.renderGrafico2()
  })

  this.estadisticaService.getVentasPorMes(this.hoy.getFullYear()).subscribe((result:any) =>{
    console.log(result)
    this.montoMes = result.monto;
    this.cobradoMes.destroy()
    this.renderGrafico3()
  })

  this.estadisticaService.getPagadosPorMes(this.hoy.getFullYear()).subscribe((result:any) =>{
    console.log(result)
    this.pagadoMes = result.monto;
    this.pagadoMesGrafico.destroy()
    this.renderGrafico4()
  })


  }

  renderGrafic(dataGrafico:any[]){
    this.ventasGrafico = new Chart("cantidadProducto", {
      type: 'pie',
      data: {
        labels: this.productosGrafico,
        datasets: [{
          label: 'Libros vendidos',
          data: this.cantidadGrafico,
          borderWidth: 1,
          
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    

    

    // const pagadoMes = new Chart("pagadoMes", {
    //   type: 'line',
    //   data: {
    //     labels: [],
    //     datasets: [{
    //       label: 'Libros vendidos',
    //       data: [],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

  }

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.filterForm.controls['anho1'].value;
    ctrlValue!.year(normalizedYear.year());
    this.filterForm.controls['anho1'].setValue(ctrlValue);
    dp.close();

    console.log(this.datePipe.transform(this.filterForm.controls['anho1'].value,'YYYY'))
  }


  chosenYearHandler2(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.filterForm.controls['anho2'].value;
    ctrlValue!.year(normalizedYear.year());
    this.filterForm.controls['anho2'].setValue(ctrlValue);
    dp.close();

    
  }




  renderGrafico2(){
    this.montosGrafico = new Chart("montosVentas", {
      type: 'pie',
      data: {
        labels: this.clientes,
        datasets: [{
          label: 'Libros vendidos',
          data: this.montoTotal,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderGrafico3(){
    this.cobradoMes = new Chart("cobradoMes", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [{
          label: 'TOTAL COBRADO',
          data: this.montoMes,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderGrafico4(){
    this.pagadoMesGrafico = new Chart("pagadoMes", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [{
          label: 'TOTAL COBRADO',
          data: this.pagadoMes,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  onGraficoUno(){

    
    const fechaDesde = this.datePipe.transform(this.filterForm.controls['fechaDesde1'].value,'YYYY-MM-dd');
    const fechaHasta = this.datePipe.transform(this.filterForm.controls['fechaHasta1'].value,'YYYY-MM-dd');
    
    this.estadisticaService.getCantidadProductoVendidos(fechaDesde,fechaHasta).subscribe((result:any) => {
      
      this.productosGrafico = result.productos
      this.cantidadGrafico = result.cantidad
      this.ventasGrafico.destroy()
      this.renderGrafic([])

      
    })
  }

  onGraficoDos(){
    const fechaDesde = this.datePipe.transform(this.filterForm.controls['fechaDesde2'].value,'YYYY-MM-dd');
    const fechaHasta = this.datePipe.transform(this.filterForm.controls['fechaHasta2'].value,'YYYY-MM-dd');
    
    this.estadisticaService.getMontosPorVentas(fechaDesde,fechaHasta).subscribe((result:any) => {
      
      this.montoTotal = result.montoTotal
      this.clientes = result.clientes
      this.montosGrafico.destroy()
      this.renderGrafico2()

      
    })
  }

  onGraficoTres(){
    
    const anho = this.datePipe.transform(this.filterForm.controls['anho1'].value,'YYYY');
    this.estadisticaService.getVentasPorMes(anho).subscribe((result:any) =>{
      this.montoMes = result.monto;
      this.cobradoMes.destroy()
      this.renderGrafico3()
    })
  }

  onGraficoCuatro(){
    
    const anho = this.datePipe.transform(this.filterForm.controls['anho2'].value,'YYYY');
    this.estadisticaService.getPagadosPorMes(anho).subscribe((result:any) =>{
      this.pagadoMes = result.monto;
      this.pagadoMesGrafico.destroy()
      this.renderGrafico4()
    })
  }


}