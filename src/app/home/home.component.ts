import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppComponentBase implements OnInit {


    menuItem: MenuItem= new MenuItem("", "", "", "/app/form");

    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    

}
