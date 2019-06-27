import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {FormParameters} from './models/form-parameters.interface';
import { IGooglePlace } from '@app/models/google-place.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [appModuleAnimation()]
})
export class FormComponent implements OnInit {

  @Output() formSave: EventEmitter<any> = new EventEmitter<any>();
  parameters: FormParameters=new FormParameters();
  formCounter: number;
  public placeInfo: IGooglePlace;
  bsInlineValue = new Date();
  mytime: Date = new Date();
  constructor(private zone:NgZone) { }

  ngOnInit() {
    this.formCounter=1;
  }

  changeCounter(direction: string){
    var today=new Date();
    console.log(today.toLocaleString())
    console.log(today.getDay())
    console.log(today.toUTCString())
    console.log(today.toLocaleDateString())
    switch(direction){
      case 'up':
      this.formCounter+=1;
      break;

      case 'down':
      this.formCounter-=1;
      break;    
    }
  }

  save(){
   // this.parameters.placeInfo= this.placeInfo;
   console.log(this.parameters)
    this.formSave.emit(this.parameters);
  }

    //Method to be invoked everytime we receive a new instance 
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    let placeInfo={
      formattedAddress: addrObj['formatted_address'],
      locality: addrObj['locality'],
      adminArea: addrObj['admin_area_l1'],
      country: addrObj['country'],
      placeId: addrObj['place_id']
    };
    this.parameters.placeInfo=placeInfo;
    // this.zone.run(() => {
    //   this.addr = addrObj;
    //   this.addrKeys = Object.keys(addrObj);
    // });
  }

}
