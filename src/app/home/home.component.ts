import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements OnInit {


    menuItem: MenuItem= new MenuItem("", "", "", "/plan");

    constructor(   private _router: Router, injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    
    navigateToPlan(){
        this._router.navigate(['plan'])
    }

}
