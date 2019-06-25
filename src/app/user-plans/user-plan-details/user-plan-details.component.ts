import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserPlansServiceProxy, ListResultDtoOfPlanDto, UserPlansListDto, ListResultDtoOfUserPlansListDto, PlanDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './user-plan-details.component.html',
  styleUrls: ['../user-plans.component.less'],
  animations: [appModuleAnimation()]
})
export class UserPlanDetailsComponent extends AppComponentBase implements OnInit {

    plan:PlanDto;
    planId:number;
    loaded:boolean=false;
    constructor(
        injector: Injector,
        private _userPlansService: UserPlansServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._activatedRoute.params.subscribe((params: Params) => {
            var planId:string = params['planId'];
            if(planId !=null){
                this.planId=parseInt(planId,10);
                this.loadPlan();
            }
        });
    }

    loadPlan() {
        this._userPlansService.getDetailAsync(this.planId)
            .subscribe((result:PlanDto) => {
                this.plan=result;
                this.loaded=true;
            })
    }

}


