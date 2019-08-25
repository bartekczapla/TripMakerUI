import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleComponent } from '@app/plan/schedule/schedule.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePlanInput, PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
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
  parameters:CreatePlanInput;
  plan: PlanDto;

  @ViewChild(ScheduleComponent) schedule: ScheduleComponent;

  constructor(
    injector: Injector, private router: Router, private _planService: PlanServiceProxy, 
  ) {
      super(injector);
  }

  ngOnInit() {
  }
  
  generatePlan(params: CreatePlanInput)
  {
    this.isForm=false;
    this.parameters=params;
    this.createPlan();
  }

  createPlan() {
    this.loading=true;
    this._planService.createAsync(this.parameters)
        .pipe(finalize(()=>{
          this.loading=false;
        }))
        .subscribe((result:PlanDto)=>{
          this.plan=result.clone();
        }, error => {   
            this.message.error('Ups...Formularz został wypełniony niepoprawnie. Sprobuj jeszcze raz!')
            this.router.navigateByUrl('/home');
        })
  }


}
