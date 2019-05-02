import { IGooglePlace } from "@app/models/google-place.interface";
import { Moment } from "moment";

//import { IGooglePlace } from '../../../models/google-place.interface';

export class FormParameters {
    placeInfo: IGooglePlace;
    startDate: Moment;
    endDate: Moment;
};



