import {Injectable} from 'angular2/core';
import {Platform} from "ionic-framework/ionic";


@Injectable()
export class Toaster {
    constructor(private platform: Platform) {}

    showToastMessage(message: string, period?: string = 'long',position?: string = 'center'): Promise<string> {
        this.platform.ready().then(() => {
            try {
                window.plugins.toast.show(message, period, position);
                return Promise.resolve('showed');
            } catch(e) {
                return Promise.reject(`couldn't show`);
            }
        });
    }
}
