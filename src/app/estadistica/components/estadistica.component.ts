import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
//import { Moment } from 'moment';




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

  anhoActual:any = this.hoy.getFullYear()

  montoMes:any=[];
  pagadoMes:any=[];

  anhoList:any=[this.anhoActual-10,this.anhoActual-9,this.anhoActual-8,this.anhoActual-7,this.anhoActual-6,
    this.anhoActual-5,this.anhoActual-4,this.anhoActual-3,this.anhoActual-2,this.anhoActual-1,this.anhoActual
  ]
  
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
    anho1: [this.anhoActual],
    anho2: [this.anhoActual],
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
        },
        aspectRatio: 2
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






  renderGrafico2(){
    this.montosGrafico = new Chart("montosVentas", {
      type: 'pie',
      data: {
        labels: this.clientes,
        datasets: [{
          label: 'Monto total',
          data: this.montoTotal,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
          
        },
        aspectRatio: 2
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
          borderWidth: 1,
          backgroundColor:'#C6FABB'
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
          label: 'TOTAL PAGADO',
          data: this.pagadoMes,
          borderWidth: 1,
          backgroundColor:'#FB9595'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
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
    
    
    this.estadisticaService.getVentasPorMes(this.filterForm.controls['anho1'].value).subscribe((result:any) =>{ 
      this.montoMes = result.monto;
      this.cobradoMes.destroy()
      this.renderGrafico3()
    })
  }

  onGraficoCuatro(){
    
    
    this.estadisticaService.getPagadosPorMes(this.filterForm.controls['anho2'].value).subscribe((result:any) =>{
      this.pagadoMes = result.monto;
      this.pagadoMesGrafico.destroy()
      this.renderGrafico4()
    })
  }


}