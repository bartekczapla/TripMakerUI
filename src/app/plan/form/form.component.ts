import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent, MatSelectionListChange, MatSliderChange } from '@angular/material';
import { PlanElementType } from '@app/enums/plan-element-type.enum';
import { IGooglePlace } from '@app/models/google-place.interface';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePlanInput } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { TimepickerConfig } from 'ngx-bootstrap';

import { AtractionDurationPreference } from './models/AtractionDurationPreference.enum';
import { AtractionPopularityPreference } from './models/AtractionPopularityPreference.enum';
import { DistanceTypePreference } from './models/DistanceTypePreference.enum';
import { FoodPreference } from './models/FoodPreference.enum';
import { GoogleTravelMode } from './models/google-travel-mode.enum';
import { PricePreference } from './models/PricePreference.enum';
import { ISelect } from './models/select.interface';

 
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 30,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false
  });
}
 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [appModuleAnimation()],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class FormComponent extends AppComponentBase implements OnInit {

  @Output() formSave: EventEmitter<CreatePlanInput> = new EventEmitter<CreatePlanInput>();
  parameters: CreatePlanInput=new CreatePlanInput();
  //isLinear = true;

  travelModes: ISelect[]=[
    {Name: 'Samochód/taxi', Value: GoogleTravelMode.Driving},
    {Name: 'Pieszo', Value: GoogleTravelMode.Walking},
    {Name: 'Rower', Value: GoogleTravelMode.Bicycling},
    {Name: 'Transport publiczny', Value: GoogleTravelMode.Transit},
  ]

  distancePreferences: ISelect[]=[
    {Name: 'Najbliższe', Value: DistanceTypePreference.OnlyClosest},
    {Name: 'Średnie dystance', Value: DistanceTypePreference.MediumDistances},
    {Name: 'Nawet dalekie', Value: DistanceTypePreference.LongDistances},
    {Name: 'Bez znaczenia', Value: DistanceTypePreference.NotMatter},
  ]


  atractionDurationPreference: ISelect[]=[
    {Name: 'Szybkie tempo', Value: AtractionDurationPreference.Fast},
    {Name: 'Umiarkowane tempo', Value: AtractionDurationPreference.Medium},
    {Name: 'Wolne tempo', Value: AtractionDurationPreference.Slow},
  ]


  atractionPopularityPreference: ISelect[]=[
    {Name: 'Najpopularniejsze', Value: AtractionPopularityPreference.MostPopular},
    {Name: 'Zróżnicowane atrakcje', Value: AtractionPopularityPreference.MixedPopular},
    {Name: 'Mało znane', Value: AtractionPopularityPreference.NotWellKnown},
    {Name: 'Bez znaczenia', Value: AtractionPopularityPreference.NotMatter},
  ]

  foodPreference: ISelect[]=[
    {Name: 'Na własną rękę', Value: FoodPreference.OnTheirOwn},
    {Name: 'Zróżnicowane', Value: FoodPreference.Mixed},
    {Name: 'Jedynie restauracje', Value: FoodPreference.OnlyRestaurant}
  ]

  pricePreference: ISelect[]=[
    {Name: 'Najtańsze', Value: PricePreference.Cheapest},
    {Name: 'Średnie ceny', Value: PricePreference.MediumPrices},
    {Name: 'Bez znaczenia', Value: PricePreference.NoMatter}
  ]


  startTime=new Date(0,0,0,8,0,0);
  endTime=new Date(0,0,0,20,0,0);

  today=new Date();
  startDate=new Date();
  endDate=new Date();

  public placeInfo: IGooglePlace;

  constructor(
    injector: Injector
  ) {
      super(injector);
  }


  ngOnInit() {
    this.parameters.startDate=moment(new Date());
    this.parameters.endDate=moment(new Date());
    this.parameters.hasAccomodationBooked=false;
    this.parameters.startTime='08:00';
    this.parameters.endTime='20:00';
    this.parameters.maxWalkingKmsPerDay=0;
    this.parameters.averageSleep=8;
    this.parameters.preferedTravelModes=[];
  }
  onStartDate(event:MatDatepickerInputEvent<Date>) {
    this.parameters.startDate=moment(event.value);
  }
  onStartTime(value:Date) {
    this.parameters.startTime=value.toLocaleTimeString();
  }
  onEndDate(event:MatDatepickerInputEvent<Date>) {
    this.parameters.endDate=moment(event.value);
  }
  onEndTime(value:Date) {
    this.parameters.endTime=value.toLocaleTimeString();
  }

  setAddress(addrObj) {
    let placeInfo={
      formattedAddress: addrObj['formatted_address'],
      locality: addrObj['locality'],
      adminArea: addrObj['admin_area_l1'],
      country: addrObj['country'],
      placeId: addrObj['place_id']
    };
    this.parameters.placeId=placeInfo.placeId;
    this.parameters.placeName=placeInfo.locality;
  }

  onHasAccomodation(event:MatSliderChange) {
    if(!event.value) {
      this.parameters.accomodationId=null;
    }
  }

  setAccomodation(addrObj) {
    let placeInfo={
      formattedAddress: addrObj['formatted_address'],
      locality: addrObj['locality'],
      adminArea: addrObj['admin_area_l1'],
      country: addrObj['country'],
      placeId: addrObj['place_id']
    };
    //this.parameters.planAccomodation=new PlanAccomodationDto();
    this.parameters.accomodationId=placeInfo.placeId;
    //this.parameters.planAccomodation.placeName=placeInfo.locality;
  }

  //2. Movement

  travelModesSelectionChange(event:MatSelectionListChange) {
    var matlistOptions=event.source.selectedOptions.selected;
    let travelModes:number[]=[];
    matlistOptions.forEach(x=>travelModes.push(x.value))
    this.parameters.preferedTravelModes=travelModes;
  }

  onAvergaeSleepChange(event: MatSliderChange) {
      this.parameters.averageSleep=event.value;
  }

  //3. Ogolne preferencje

  //4. Szczegolne preferencje
  sortedPlanElements: ISelect[]=[
      {Name: 'Zabawa w parku rozrywki', Value: PlanElementType.Entertainment},
      {Name: 'Wypoczynek w SPA', Value: PlanElementType.Relax},
      {Name: 'Spacer po lesie', Value: PlanElementType.Activity},
      {Name: 'Zwiedzanie muzeum', Value: PlanElementType.Culture},
      {Name: 'Podziwianie lokalnych zabytków', Value: PlanElementType.Sightseeing},
      {Name: 'Wyjście do baru', Value: PlanElementType.Partying},
      {Name: 'Zakupy w galerii handlowej', Value: PlanElementType.Shopping},
  ]

  dropSortedPlanElements(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sortedPlanElements, event.previousIndex, event.currentIndex);
    let tab:number[]=[];
    this.sortedPlanElements.forEach(x=>tab.push(x.Value));
    this.parameters.sortedPlanElements=tab;
  }

  allPlanElements: ISelect[]=[
    {Name: 'Gra w kręgle', Value: PlanElementType.Entertainment},
    {Name: 'Odpoczynek w saunie', Value: PlanElementType.Relax},
    {Name: 'Trening na siłowni', Value: PlanElementType.Activity},
    {Name: 'Sztuka w teatrze', Value: PlanElementType.Culture},
    {Name: 'Zwiedzanie zabytkowych kościołów', Value: PlanElementType.Sightseeing},
    {Name: 'Zabawa na dyskotece', Value: PlanElementType.Partying},
    {Name: 'Zakupy lokalnych wyrobów', Value: PlanElementType.Shopping},
    {Name: 'Wycieczka do ZOO', Value: PlanElementType.Entertainment},
    {Name: 'Masaż', Value: PlanElementType.Relax},
    {Name: 'Wspinaczka górska', Value: PlanElementType.Activity},
    {Name: 'Galeria sztuki', Value: PlanElementType.Culture},
    {Name: 'Podziwianie piękna natury', Value: PlanElementType.Sightseeing},
    {Name: 'Odkrywanie nocnego życia miejsca', Value: PlanElementType.Partying},
    {Name: 'Wyjazd na miejscowy bazar', Value: PlanElementType.Shopping},
  ]

  preferedPlanElements: ISelect[]=[];



  dropPreferedPlanElements(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    let tab:number[]=[];
    this.preferedPlanElements.forEach(x=>tab.push(x.Value));
    this.parameters.preferedPlanElements=tab;
  }


  validate(notify:boolean):boolean {
    var errorCount=0;
    if(!this.parameters.placeName || !this.parameters.placeId) {
      errorCount+=1;
      if(notify) this.notify.error('Brak celu podróży!');
    }
    if(this.parameters.hasAccomodationBooked && !this.parameters.accomodationId) {
      errorCount+=1;
      if(notify) this.notify.error('Brak zdefiniowanego miejsca zakwaterowania!');
    }
    if(this.parameters.startDate.startOf('day').add(this.startTime.getHours(),'hour').add(this.startTime.getMinutes(),'minute').isAfter(this.parameters.endDate.startOf('day').add(this.endTime.getHours(),'hour').add(this.endTime.getMinutes(),'minute'))) {
      errorCount+=1;
      if(notify) this.notify.error('Data początkowa nie może być później niż końcowa!');
    }
    if(!this.parameters.preferedTravelModes || this.parameters.preferedTravelModes.length === 0) {
      errorCount+=1;
      if(notify) this.notify.error('Brak preferowanych środków transportu!');
    }
    if(!this.parameters.preferedPlanElements || this.parameters.preferedPlanElements.length === 0) {
      errorCount+=1;
      if(notify) this.notify.error('Trzeba wybrać przynajmniej 1 interesujący Cię typ atrakcji w sekcji "Rodzaje atrakcji"!');
    }
    if(!this.parameters.atractionDurationPreference) {
      errorCount+=1;
      if(notify) this.notify.error('Nie wybrano tempa zwiedzania atrakcji!');
    }
    return errorCount === 0;
  }

  checkErrors() {
    this.validate(true);
  }
  
  createPlan(){
     console.log(this.parameters)
     //this.formSave.emit(this.parameters);
   }

}
