import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";
import { TasksComponent } from "app/tasks/tasks.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { EventsComponent } from 'app/events/events.component';
import { EventDetailComponent } from 'app/events/event-detail/event-detail.component';
import { PlanComponent } from '@app/plan/plan.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

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
                    { path: 'events/:eventId', component: EventDetailComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'tasks', component: TasksComponent }
                
            
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }