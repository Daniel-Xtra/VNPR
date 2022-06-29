import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@Injectable()
export class FirebaseAnalyticsProvider {
    constructor(
        private platform: Platform,
        private firebaseAnalytics: FirebaseAnalytics
    ) {
        console.log('Hello FirebaseAnalytics Provider');
    }

    // Tracks a 'screenName' event in Firebase Analytics
    trackView(screenName: string) {
        this.platform.ready().then(() => {
            this.firebaseAnalytics.setCurrentScreen(screenName);
        });
    }

    // Tracks a custom event in Firebase Analytics
    trackEvent(eventName: string, eventParams: any) {
        this.platform.ready().then(() => {
            this.firebaseAnalytics.logEvent(eventName, eventParams);
        });
    }

}