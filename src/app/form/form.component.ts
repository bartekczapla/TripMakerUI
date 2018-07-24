import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [appModuleAnimation()]
})

export class FormComponent extends AppComponentBase  implements OnInit {

  constructor(
    injector: Injector
) {
    super(injector);
}

  ngOnInit() {
  }

}
