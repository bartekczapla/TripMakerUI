import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';
import {TranslateService} from '@ngx-translate/core';

// import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.less'
    ],
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {

    private viewContainerRef: ViewContainerRef;

    constructor(injector: Injector, translate: TranslateService) {
        super(injector);
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit(): void {
        //SignalRAspNetCoreHelper.initSignalR();

        // abp.event.on('abp.notifications.received', userNotification => {
        //     abp.notifications.showUiNotifyForUserNotification(userNotification);

        //     // Desktop notification
        //     Push.create(' AbpZeroTemplate ', {
        //         body: userNotification.notification.data.message,
        //         icon: abp.appPath + 'assets/app-logo-small.png',
        //         timeout: 6000,
        //         onClick: function () {
        //             window.focus();
        //             this.close();
        //         }
        //     });
        // });
    }

    ngAfterViewInit(): void {
        ($ as any).AdminBSB.activateAll();
        ($ as any).AdminBSB.activateDemo();
    }
}
