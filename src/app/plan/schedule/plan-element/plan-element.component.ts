import { Component, OnInit, Input, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanElementDto  } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'plan-element',
  templateUrl: './plan-element.component.html',
  styleUrls: ['../schedule.component.scss'],
  animations: [appModuleAnimation()]
})
export class PlanElementComponent   {

 @Input() element: PlanElementDto;
 @Input() even:boolean;



}