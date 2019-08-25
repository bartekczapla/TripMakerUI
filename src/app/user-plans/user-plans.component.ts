import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserPlansServiceProxy, UserPlansListDto, ListResultDtoOfUserPlansListDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './user-plans.component.html',
  styleUrls: ['./user-plans.component.less'],
  animations: [appModuleAnimation()]
})
export class UserPlansComponent extends PagedListingComponentBase<UserPlansListDto> {

  userPlans: UserPlansListDto[]=[];
  loading=false;

  constructor(
    injector: Injector, private _userPlansService: UserPlansServiceProxy, 
    //private translate:TranslateService
  ) {
      super(injector);
  }


  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.loadUserPlans();
    finishedCallback();
  }  

  protected delete(entity: UserPlansListDto): void {
    abp.message.confirm(
      '',
      this.translate.instant('SureToDeleteThisPlan'),
      (result: boolean) => {
          if (result) {
              this._userPlansService.deleteAsync(entity.id)
                  .subscribe(() => {
                      abp.notify.info(this.translate.instant('Deleted'));
                      this.refresh();
                  });
          }
      }
  );
  }  

  loadUserPlans(){
      this.loading=true;
      this._userPlansService.getAllUserPlansAsync()
          .subscribe((result:ListResultDtoOfUserPlansListDto)=>{
              this.loading=false;
              this.userPlans=result.items;
          }, error => {
            this.loading=false;
          })
            
  }

  formatTimeString(time:string):string {
      if(time != null && time !== undefined){
            return time.substring(0,time.length-3);
      } else {
          return '';
      }
  }

}
