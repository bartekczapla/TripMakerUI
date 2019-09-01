import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanDto,  } from '@shared/service-proxies/service-proxies';
import { Moment } from 'moment';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  animations: [appModuleAnimation()]
})
export class ScheduleComponent implements OnInit   {

  //@Input() parameters: FormParameters;
  //plan:PlanDto;
  @Input() plan:PlanDto;
  loading:boolean=false;


  title = 'app';
  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]}

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }
  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // STATIC DATA FOR THE CHART IN JSON FORMAT.
    chartData = [
        {
          label: '1st Year',
          data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
        },
        { 
          label: '2nd Year',
          data: [47, 9, 28, 54, 77, 51, 24]
        }
      ];
    
      // CHART COLOR.
      colors = [
        { // 1st Year.
          backgroundColor: 'rgba(77,83,96,0.2)'
        },
        { // 2nd Year.
          backgroundColor: 'rgba(30, 169, 224, 0.8)'
        }
      ]
  constructor()
  {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   // this.getTestPlan();
  }

  checkIfFirstDate(index:number):boolean {
    if(this.plan !== undefined){
      if(index === 0) return true;
      else {
        var actualDate=this.plan.elements[index].start.toDate().getDate();
        var previousDate=this.plan.elements[index-1].start.toDate().getDate();

        return actualDate !== previousDate;

        //return this.plan.elements[index].start.diff(this.plan.elements[index-1].start,'days') !==0;
        // console.log(this.plan.elements[3].start.diff(this.plan.elements[2].start,'days'))
        // console.log(this.plan.elements[3].start.toDate().getDate())
      }      
    }
    else return false;

  }

  mapDateToString(date:Moment):string{
    return date.toDate().toLocaleDateString();
  }



  // protected delete(entity: PlanListDto): void {
  //   throw new Error("Method not implemented.");
  // }

  loadPlan() {
    // console.log('test');
    // this._planService.getPlanAsync(this.parameters.placeInfo.formattedAddress,
    //   this.parameters.placeInfo.locality,   this.parameters.placeInfo.adminArea,   this.parameters.placeInfo.country,this.parameters.placeInfo.placeId,
    //   this.parameters.startDate,this.parameters.endDate
    // )
    //     .subscribe((result: ListResultDtoOfPlanListDto) => {
    //       console.log(result);
    //         //this.events = result.items;
    //     });
}

}
