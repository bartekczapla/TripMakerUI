import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanDto,  } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { AppComponentBase } from '@shared/app-component-base';
import { Moment } from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  animations: [appModuleAnimation()]
})
export class ScheduleComponent implements OnInit   {

  //@Input() parameters: FormParameters;
  //plan:PlanDto;
  @Input() plan:PlanDto;
  loading:boolean=false;


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
