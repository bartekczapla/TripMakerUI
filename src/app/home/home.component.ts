import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements OnInit {


    menuItem: MenuItem= new MenuItem("", "", "", "/app/form");

    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){
        console.log(this.permission.isGranted);
    }
    

}
