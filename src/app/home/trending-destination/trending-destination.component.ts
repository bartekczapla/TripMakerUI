import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { HomeServiceProxy,  ListResultDtoOfSearchedPlaceAndPhoto, ISearchedPlaceAndPhoto } from '@shared/service-proxies/service-proxies';

@Component({
    selector:'trending-destination',
    templateUrl: './trending-destination.component.html',
    styleUrls: ['../home.component.scss']
})
export class TrendingDestinationComponent extends AppComponentBase implements OnInit {

    destinations: ISearchedPlaceAndPhoto[]=[];
    destinationA: ISearchedPlaceAndPhoto;
    destinationB: ISearchedPlaceAndPhoto;
    destinationC: ISearchedPlaceAndPhoto;

    loaded:boolean=false;
    constructor(injector: Injector, private _homeService: HomeServiceProxy,) 
    {
        super(injector);
    }

    ngOnInit(){
        this.getTrendingDestination();
    }
    
    getTrendingDestination(){
        this.loaded=false;
        this._homeService.getMostSearchedPlacesAsync()
            .subscribe((result: ListResultDtoOfSearchedPlaceAndPhoto)=>{
                this.loaded = true;
                this.destinations=result.items;
                if(this.destinations.length>0){
                    this.destinationA={
                        placeId:this.destinations[0].placeId,
                        placeName:this.destinations[0].placeName,
                        searchCount:this.destinations[0].searchCount,
                        photo: this.destinations[0].photo
                    }
                }
                if(this.destinations.length>1){
                    this.destinationB={
                        placeId:this.destinations[1].placeId,
                        placeName:this.destinations[1].placeName,
                        searchCount:this.destinations[1].searchCount,
                        photo: this.destinations[1].photo
                    }
                }
                if(this.destinations.length>2){
                    this.destinationC={
                        placeId:this.destinations[2].placeId,
                        placeName:this.destinations[2].placeName,
                        searchCount:this.destinations[2].searchCount,
                        photo: this.destinations[2].photo
                    }
                }
            })
    }

}

