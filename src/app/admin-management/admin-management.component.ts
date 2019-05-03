import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
    templateUrl: './admin-management.component.html',
    styleUrls: ['./admin-management.component.less'],
    animations: [appModuleAnimation()]
})
export class AdminManagementComponent extends AppComponentBase implements OnInit {



    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    

}
