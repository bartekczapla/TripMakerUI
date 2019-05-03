import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector:'trending-destination',
    templateUrl: './trending-destination.component.html',
    styleUrls: ['../home.component.less']
})
export class TrendingDestinationComponent extends AppComponentBase implements OnInit {



    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    

}
