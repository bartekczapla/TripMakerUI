import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector:'how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['../home.component.less']
})
export class HowItWorksComponent extends AppComponentBase implements OnInit {



    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    

}
