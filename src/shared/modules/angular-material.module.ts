import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
     MatDividerModule,
     MatTabsModule
  } from '@angular/material';
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkStepperModule} from '@angular/cdk/stepper';
@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        CdkStepperModule,
        MatTabsModule
      ],
      exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        CdkStepperModule,
        MatTabsModule
      ]
})
export class AngularMaterialModule {}