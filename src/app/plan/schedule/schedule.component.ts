import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanDto, PlanFormDto, PlanRouteDto,  } from '@shared/service-proxies/service-proxies';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IGoogleMarker } from './models/google-marker.interface';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [appModuleAnimation()]
})
export class ScheduleComponent implements OnInit   {

  //@Input() parameters: FormParameters;
  //plan:PlanDto;
  selectedDay:Moment;
  @Input() plan:PlanDto;
  loading:boolean=false;
  numberOfDays:number=0;
  daysOfTrip:Moment[]=[];


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
  ];


  title = 'Wektor wagowy planu';
  public barChartLabels: Label[] = ["Cena", "Oceny", "Odległość", "Popularność", "Rozrywka","Relaks","Aktywność","Kultura","Zwiedzania","Imprezowanie","Zakupy"];
  public pieChartData:number[] = [];

  public pieChartType:string = 'bar';
  public pieChartOptions:ChartOptions  =   {
    responsive: true,
    showLines: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: { datalabels: {  anchor: 'end',   align: 'end', }  } };
  
  planLat:number;
  planLng:number;
  markers: IGoogleMarker[]=[];

  constructor()
  {

  }

  ngOnInit(): void {

    this.createBarDataSet();
    this.initGoogleMap();
    this.initDaysList();
  }

  initDaysList() {
    let length=this.plan.elements.length;
    if(length > 0) {
      var lastDay=this.plan.elements[length-1].end.dayOfYear();
      var firstDay=this.plan.elements[0].start.dayOfYear();

      if(lastDay >= firstDay) {
          this.numberOfDays=lastDay-firstDay+1;
      } else {
        this.numberOfDays= (this.plan.elements[0].start.isLeapYear() ? (366- firstDay) : (365- firstDay))+lastDay+1;
      }

      for(let i=0;i< this.numberOfDays;i++) {
        let day=moment(this.plan.elements[0].start, "DD-MM-YYYY").add(i,'days');
        this.daysOfTrip.push(day);
      }

    }
  }

  initGoogleMap() {
    this.selectedDay=this.plan.planForm.startDate;
    this.planLat=this.plan.latitude;
    this.planLng=this.plan.longitude; 
    this.createGoogleMarkers();   
  }

  createGoogleMarkers() {
    this.markers=[];
    this.plan.elements.forEach(element => {
      if(element.start.isSame(this.selectedDay,'day')) {
        this.markers.push({Lat:element.lat, Lng:element.lng, Label: `${element.orderNo}`});
      }
    });
  }

  getEndingRoute(iter:number):PlanRouteDto {
    if(iter<this.plan.elements.length-1)
      return this.plan.elements[iter+1].endingRoute;
    else
      return null;
  }

  isSameDay(cardDay:Moment, elementDay:Moment):boolean {
    return cardDay.isSame(elementDay,'day');
  }


  createBarDataSet() {
    if(this.plan.planFormWeightVector != null) {
      let dataset:number[]=[];
      dataset.push(this.plan.planFormWeightVector.price);
      dataset.push(this.plan.planFormWeightVector.rating);
      dataset.push(this.plan.planFormWeightVector.distance);
      dataset.push(this.plan.planFormWeightVector.popularity);
      dataset.push(this.plan.planFormWeightVector.entertainment);
      dataset.push(this.plan.planFormWeightVector.relax);
      dataset.push(this.plan.planFormWeightVector.activity);
      dataset.push(this.plan.planFormWeightVector.culture);
      dataset.push(this.plan.planFormWeightVector.sightseeing);
      dataset.push(this.plan.planFormWeightVector.partying);
      dataset.push(this.plan.planFormWeightVector.shopping);     
      this.barChartData.push({data:dataset,label:'Wagi', backgroundColor: '#fed136',hoverBackgroundColor:'#dcae09'})

    }
  
  }

  filterMapByDat(day:Moment) {
    this.selectedDay=day;
    this.createGoogleMarkers();
  }

  mapDateToString(date:Moment):string{
    return date.toDate().toLocaleDateString();
  }


  loadPlan() {

}

formatTimeString(time:string):string {
  if(time != null && time !== undefined){
        return time.substring(0,time.length-3);
  } else {
      return '';
  }
}

}
