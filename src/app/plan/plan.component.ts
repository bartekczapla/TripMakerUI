import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import {FormComponent} from './form/form.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FormParameters } from '@app/plan/form/models/form-parameters.interface';
import { ScheduleComponent } from '@app/plan/schedule/schedule.component';
import { PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  animations: [appModuleAnimation()]
})
export class PlanComponent extends AppComponentBase implements OnInit {

  isForm:boolean=true;
  loading:boolean=false;
  parameters:FormParameters;
  plan: PlanDto;
  @ViewChild(ScheduleComponent) schedule: ScheduleComponent;

  constructor(
    injector: Injector, private _planService: PlanServiceProxy, 
  ) {
      super(injector);
  }

  ngOnInit() {
  }
  
  generatePlan(params: FormParameters)
  {
    this.isForm=false;
    this.parameters=params;
    this.getTestPlan();
  }


  getTestPlan(){
    this.loading=true;
    this._planService.getTestPlanAsync()
        .pipe(finalize(()=>{
          this.loading=false;
        }))
        .subscribe((result:PlanDto)=>{
          this.plan=result.clone();
        })
  }

}
