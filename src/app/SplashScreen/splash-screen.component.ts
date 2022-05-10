// Angular
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
// Object-Path

// Layout
import { SubSink } from 'subsink';
import { ILoaderPercent } from '../Models/generals/loader-percent';
import { LoaderService } from '../services/loader.service';
import { SplashScreenService } from '../services/splash-screen.service';


@Component({
    selector: 'kt-splash-screen',
    templateUrl: './splash-screen.component.html'
})
export class SplashScreenComponent implements OnInit {

    subs = new SubSink();

    // Public proprties
    loaderLogo: string;
    loaderType: string;
    loaderMessage: string | undefined;

    @ViewChild('splashScreen', { static: true }) splashScreen: ElementRef;

    constructor(
        private cdRef: ChangeDetectorRef,
        private splashScreenService: SplashScreenService,
        private loaderService: LoaderService) {
        this.subscribeLoader();
    }

    /**
     * subscribe loader changes
     */
    subscribeLoader() {
        this.subs.sink = this.loaderService.loaderState.subscribe((state: ILoaderPercent) => {
            this.loaderMessage = state.message;
            if (state.show) {
                this.splashScreenService.show();
            } else {
                this.splashScreenService.hide();
            }
            this.cdRef.detectChanges();
        });
    }


    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
       //  init splash screen, see loader option in layout.config.ts

        this.loaderLogo = './assets/logo.ico';
        this.loaderType ='spinner-logo';
        this.loaderMessage ='Please wait...';
        this.splashScreenService.init(this.splashScreen);
    }
}

