import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-estadistica',
  templateUrl: '../templates/estadistica.component.html',
  styleUrls: ['../styles/estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {


  
  constructor(public estadisticaService:EstadisticaService) { }

  ngOnInit(): void {
   this.renderGrafic([]);
  }

  renderGrafic(dataGrafico:any[]){
    const ventasGrafico = new Chart("cantidadProducto", {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [{
          label: 'Libros vendidos',
          data: [1,2,3,4,5,6,7,8,9],
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

    const cantidadVentas = new Chart("cantidadVentas", {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Libros vendidos',
          data: [],
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

    const cobradoMes = new Chart("cobradoMes", {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Libros vendidos',
          data: [],
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

    const pagadoMes = new Chart("pagadoMes", {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Libros vendidos',
          data: [],
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


}