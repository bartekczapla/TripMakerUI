import { Component, OnInit, Input, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanElementDto, PlanRouteDto, PlanElementyTypeEntityDtoElementType  } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'plan-element',
  templateUrl: './plan-element.component.html',
  styleUrls: ['../schedule.component.scss'],
  animations: [appModuleAnimation()]
})
export class PlanElementComponent implements OnInit  {

 @Input() element: PlanElementDto;
 @Input() route: PlanRouteDto;
  hasRoute:boolean;
  minutes:string;
  isSleep=false;
  isEating=false;

  ngOnInit(): void {
    this.hasRoute=this.route !== null && this.route !== undefined;
    if(this.hasRoute) {
      this.minutes=(this.route.duration/60).toFixed();

    }
    this.isSleep=(this.element.planElementTypes.findIndex(x=>x.elementType===PlanElementyTypeEntityDtoElementType._2) > -1);
    this.isEating=(this.element.planElementTypes.findIndex(x=>x.elementType===PlanElementyTypeEntityDtoElementType._1) > -1) && this.element.planElementTypes.length === 1;
  }


}


// formattedAddress: string | undefined;
// planElementTypes: PlanElementyTypeEntityDto[] | undefined;
// openingHours: PlanElementOpeningHourEntityDto[] | undefined;
// rating: number | undefined;
// price: number | undefined;
// planId: number | undefined;
// popularity: number | undefined;
// endingRoute: PlanRouteDto | undefined;
// scorePosition: number | undefined;
// normalizedScore: number | undefined;