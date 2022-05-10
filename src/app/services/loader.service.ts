import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILoaderPercent } from '../Models/generals/loader-percent';


@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private isLoading = new Subject<ILoaderPercent>();
    loaderState = this.isLoading.asObservable();
    loaderDisabled = false;

    show(message?: string) {
        if (this.loaderDisabled === false) {
            this.isLoading.next({ show: true, message });
        }
    }

    hide() {
        setTimeout(() => {
            this.isLoading.next({ show: false });
        }, 500);
    }

    disable(): void {
        this.loaderDisabled = true;
    }

    enable(): void {
        this.loaderDisabled = false;
    }
}
