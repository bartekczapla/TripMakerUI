import { Component, Injector, OnInit, ViewChild} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ContactModel } from './contact.model';
import {HomeServiceProxy, ContactUsDto } from '@shared/service-proxies/service-proxies';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector:'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['../home.component.less']
})
export class ContactComponent extends AppComponentBase implements OnInit {

    model:ContactModel=new ContactModel();
    EmailRegex:RegExp=new RegExp('/[^@]+@[^\.]+\..+/');

    constructor(injector: Injector, private _homeService: HomeServiceProxy, private _translate: TranslateService) 
    {
        super(injector);
    }

    ngOnInit(){

    }
    
    sendContactUs(){
        if(this.validate()){
            var input=new ContactUsDto();
            input.email=this.model.Email;
            input.name=this.model.Name;
            input.message=this.model.Message;

            this._homeService.createContactUsAsync(input)
                .subscribe((result:boolean)=> {
                    if(result){
                        this.model=new ContactModel();
                        abp.notify.success(this._translate.instant("WeWillContactYouASAP"));
                    }
                })
        }
        else {
            abp.notify.error(this._translate.instant("InvalidForm"));
        }

    }


    private validate():boolean {
        var errorsNum:number=0;
        // if(!this.EmailRegex.test(this.model.Email)){
        //     errorsNum+=1;
        // }

        if(!this.model.Email){
            errorsNum+=1;
        }

        if(!this.model.Name){
            errorsNum+=1;
        }

        if(!this.model.Message){
            errorsNum+=1;
        }

        if(errorsNum > 0)
            return false;

        return true;
    }


}
