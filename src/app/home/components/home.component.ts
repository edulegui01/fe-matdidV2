import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Chart } from 'angular-highcharts';



@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.scss']
})
export class HomeComponent implements OnInit {

  datosEstadisticos:any;



  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Ventas de Libros'
    },
    credits: {
      enabled:false
    },
    series: [
      {
        name: 'ventas de libros',
        data: [10,2,3,5,8,9,0,9,5]
      } as any
    ]
  })
  
  constructor(public homeService:HomeService) { }

  ngOnInit(): void {

    this.initDataSource();
  }


  initDataSource(){
    this.homeService.getEstadistica().subscribe( (estadistica:any) => this.datosEstadisticos = estadistica);
  }


}
