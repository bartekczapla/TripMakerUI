import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { EventsComponent } from 'app/events/events.component';
import { EventDetailComponent } from 'app/events/event-detail/event-detail.component';
import { PlanComponent } from '@app/plan/plan.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { UserPlansComponent } from './user-plans/user-plans.component';
import { UserPlanDetailsComponent } from './user-plans/user-plan-details/user-plan-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent },
                    { path: 'register', component: RegisterComponent },
                    { path: 'home', component: HomeComponent },
                    { path: 'plan', component: PlanComponent },
                    { path: 'dashboard', component: DashboardComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'events', component: EventsComponent, canActivate: [AppRouteGuard] },
                    { path: 'events/:eventId', component: EventDetailComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-plans', component: UserPlansComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-plans/:planId', component: UserPlanDetailsComponent, canActivate: [AppRouteGuard] }
                
            
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }