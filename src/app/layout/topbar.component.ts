import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';
import {TranslateService } from '@ngx-translate/core'
import { LoginService } from '@app/account/login/login.service';
import { AppAuthService } from '@shared/auth/app-auth.service';


@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    styleUrls: ['./topbar.component.scss']
   // encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase {

public isEnglish:boolean=false;
public isPolish:boolean=true;
public isUserLogged:boolean=false;
isMobileMenu=false;
    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/tenants"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/roles"),
        new MenuItem(this.l("About"), "", "info", "/about"),
        new MenuItem(this.l("Tasks"), "", "info", "/tasks"),
        new MenuItem(this.l("Events"), "Pages.Events", "event", "/events"),
    ];

    constructor( injector: Injector,  private _loginService: LoginService, private _authService: AppAuthService) {
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

      checkIfUserLogged():boolean{
            return this._loginService.isUserLogged();
      }

      getUserName():string {
          //return this.appSession.user.name+' '+this.appSession.user.surname;
          return 'admin admin';
      }

      logout(): void {
          this._authService.logout();
      }

      toggleMenu() {
        $('#hamburgerMenu').toggleClass('change-menu');
        if ($('#topNavbar').hasClass('responsive-topnavbar')) {
            this.isMobileMenu=true;
            $('#topNavbar').removeClass('responsive-topnavbar');
        } else {
            this.isMobileMenu=false;
            $('#topNavbar').addClass('responsive-topnavbar');
        }  
    }
}