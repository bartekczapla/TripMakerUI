import { Component, OnInit, ViewChild } from '@angular/core';
import {FormComponent} from './form/form.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { ScheduleComponent } from '@app/plan/schedule/schedule.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  animations: [appModuleAnimation()]
})
export class PlanComponent implements OnInit {

  isForm:boolean=true;
  parameters:FormParameters;
  @ViewChild(ScheduleComponent) schedule: ScheduleComponent;

  constructor() {
    this.isForm=true;
   }

  ngOnInit() {
  }
  
  generatePlan(params: FormParameters)
  {
    this.isForm=false;
    this.parameters=params;
    console.log(this.parameters);
  }

}
