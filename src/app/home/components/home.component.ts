import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import {Chart, registerables} from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.scss']
})
export class HomeComponent implements OnInit {

  datosEstadisticos:any;
  dataGrafico!:any;


  
  constructor(public homeService:HomeService) { }

  ngOnInit(): void {

    this.initDataSource();
    this.initGraf();
    
  }


  initDataSource(){
    this.homeService.getEstadistica().subscribe( (estadistica:any) => this.datosEstadisticos = estadistica);
  }

  initGraf(){
    const hoy = new Date();

    this.homeService.getGraficoData(hoy.getFullYear()).subscribe(result => {
      this.renderGrafic(result);

    });

  }

  renderGrafic(dataGrafico:any[]){
    const ventasGrafico = new Chart("ventasChart", {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [{
          label: 'Libros vendidos',
          data: dataGrafico,
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

  formatearNumero(number:number){
    return '₲ '+new Intl.NumberFormat("es-CL").format(number);
  }



}
