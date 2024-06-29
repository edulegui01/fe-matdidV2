import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-estadistica',
  templateUrl: '../templates/estadistica.component.html',
  styleUrls: ['../styles/estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  filterForm!:FormGroup;

  ventasGrafico:any;
  montosGrafico:any;

  hoy = new Date();
  productosGrafico:any = [];
  cantidadGrafico:any = [];
  montoTotal:any = [];
  clientes:any = [];
  
  constructor(public estadisticaService:EstadisticaService,private fb:FormBuilder,private datePipe: DatePipe,) { }

  ngOnInit(): void {
   this.renderGrafic([]);
   this.renderGrafico2();
    let desde = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
    const fechaDesde = this.datePipe.transform(desde,'YYYY-MM-dd');
    const fechaHasta = this.datePipe.transform(this.hoy,'YYYY-MM-dd');

    

   this.filterForm = this.fb.group({
    fechaDesde1: [''],
    fechaHasta1: [''],
    fechaDesde2: [''],
    fechaHasta2: [''],
    anho1: [''],
    anho2: [''],
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


  }

  renderGrafic(dataGrafico:any[]){
    this.ventasGrafico = new Chart("cantidadProducto", {
      type: 'pie',
      data: {
        labels: this.productosGrafico,
        datasets: [{
          label: 'Libros vendidos',
          data: this.cantidadGrafico,
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

    

    // const cobradoMes = new Chart("cobradoMes", {
    //   type: 'bar',
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


}