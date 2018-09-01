import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import {TranslateService } from '@ngx-translate/core'


@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    styleUrls: ['./topbar.component.css']
   // encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase {

public isEnglish:boolean=true;
public isPolish:boolean=false;

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        new MenuItem(this.l("About"), "", "info", "/app/about"),
        new MenuItem(this.l("Tasks"), "", "info", "/app/tasks"),
        new MenuItem(this.l("Events"), "Pages.Events", "event", "/app/events"),
    ];

    constructor( injector: Injector, private translate: TranslateService) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }


    setPolish(){
        this.isEnglish=false;
        this.isPolish=true;
        this.translate.use('pl');
      }
     
      setEnglish(){
        this.isEnglish=true;
        this.isPolish=false;
        this.translate.use('en');
      }


}