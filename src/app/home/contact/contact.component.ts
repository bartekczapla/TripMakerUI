import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactModel } from './contact.model';

@Component({
    selector:'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['../home.component.less']
})
export class ContactComponent extends AppComponentBase implements OnInit {

    model:ContactModel=new ContactModel();

    constructor(injector: Injector) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    

}
