import { Component, Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { HomeServiceProxy, ListResultDtoOfSearchedPlaceDto, SearchedPlaceDto, ISearchedPlaceDto } from '@shared/service-proxies/service-proxies';

@Component({
    selector:'trending-destination',
    templateUrl: './trending-destination.component.html',
    styleUrls: ['../home.component.less']
})
export class TrendingDestinationComponent extends AppComponentBase implements OnInit {

    destinations: SearchedPlaceDto[]=[];
    destinationA: ISearchedPlaceDto;
    destinationB: ISearchedPlaceDto;
    destinationC: ISearchedPlaceDto;

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
            .finally(()=>this.loaded=true)
            .subscribe((result: ListResultDtoOfSearchedPlaceDto)=>{
                this.destinations=result.items;
                if(this.destinations.length>0){
                    this.destinationA={
                        placeId:this.destinations[0].placeId,
                        placeName:this.destinations[0].placeName,
                        searchCount:this.destinations[0].searchCount
                    }
                }
                if(this.destinations.length>1){
                    this.destinationB={
                        placeId:this.destinations[1].placeId,
                        placeName:this.destinations[1].placeName,
                        searchCount:this.destinations[1].searchCount
                    }
                }
                if(this.destinations.length>2){
                    this.destinationC={
                        placeId:this.destinations[2].placeId,
                        placeName:this.destinations[2].placeName,
                        searchCount:this.destinations[2].searchCount
                    }
                }
            })
    }

}

