import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [appModuleAnimation()]
})

export class FormComponent extends AppComponentBase  implements OnInit {

formPage:number=1;

  constructor(
    injector: Injector,private translate: TranslateService
) {
    super(injector);
}

  ngOnInit() {
  }


  changeLang(){
    this.translate.use('en');
  }

  
  changeLang2(){
    this.translate.use('pl');
  }

}
