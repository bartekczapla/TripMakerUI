import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbpModule } from '@abp/abp.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { HomeComponent } from '@app/home/home.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { MaterialInput } from '@shared/directives/material-input.directive';
import { FooterComponent } from './layout/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './plan/form/form.component';
import { PlanComponent } from './plan/plan.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AngularMaterialModule } from '@shared/modules/angular-material.module';
import { ScheduleComponent } from './plan/schedule/schedule.component';
import { AccountComponent } from './account/account.component';
import { TenantChangeModalComponent } from './account/tenant/tenant-change-modal.component';
import { TenantChangeComponent } from './account/tenant/tenant-change.component';
import { LoginService } from './account/login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppPreBootstrap } from '../AppPreBootstrap';
import { RouterModule } from '@angular/router';
import { GooglePlacesDirective } from '@shared/directives/google-places.directive';
import { AppUrlService } from '@shared/nav/app-url.service';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ContactComponent } from './home/contact/contact.component';
import { TrendingDestinationComponent } from './home/trending-destination/trending-destination.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { PlanElementComponent } from './plan/schedule/plan-element/plan-element.component';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(injector: Injector) {
  return () => {

    abp.ui.setBusy();
    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
        abp.event.trigger('abp.dynamicScriptsInitialized');
        var appSessionService: AppSessionService = injector.get(AppSessionService);
        appSessionService.init().then(
          (result) => {
            abp.ui.clearBusy();
            resolve(result);
          },
          (err) => {
            abp.ui.clearBusy();
            reject(err);
          }
        );
      });
    });
  }
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
  return abp.localization.currentLanguage.name;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    TenantsComponent,
    CreateTenantComponent,
    EditTenantComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    RolesComponent,
    CreateRoleComponent,
    EditRoleComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    FooterComponent,
    DashboardComponent,
    FormComponent,
    PlanComponent,
    EventsComponent,
    EventDetailComponent,
    CreateEventComponent,
    LoginComponent,
    RegisterComponent,
    ScheduleComponent,
    AccountComponent,
    TenantChangeComponent,
    TenantChangeModalComponent,
    MaterialInput,
    GooglePlacesDirective,
    AdminManagementComponent,
    ContactComponent,
    TrendingDestinationComponent,
    HowItWorksComponent,
    PlanElementComponent

  ],
  imports: [
    RouterModule.forRoot([]),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    ServiceProxyModule,
    NgxPaginationModule,
    AngularMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    LoginService,
    AppSessionService,
    AppUrlService,
    AppAuthService,
    AppRouteGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
