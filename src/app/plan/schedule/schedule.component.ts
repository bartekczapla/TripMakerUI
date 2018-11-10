import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, ListResultDtoOfPlanListDto, PlanListDto, EntityDtoOfGuid } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  animations: [appModuleAnimation()]
})
export class ScheduleComponent extends PagedListingComponentBase<PlanListDto>  {

   @Input() parameters: FormParameters;

  constructor(injector: Injector,private _planService: PlanServiceProxy)
  {
            super(injector);
  }


protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.loadPlan();
    finishedCallback();
}

  protected delete(entity: PlanListDto): void {
    throw new Error("Method not implemented.");
  }

  loadPlan() {
    console.log('test');
    this._planService.getPlanAsync(this.parameters.placeInfo.formattedAddress,
      this.parameters.placeInfo.locality,   this.parameters.placeInfo.adminArea,   this.parameters.placeInfo.country,this.parameters.placeInfo.placeId
    )
        .subscribe((result: ListResultDtoOfPlanListDto) => {
          console.log(result);
            //this.events = result.items;
        });
}

}
