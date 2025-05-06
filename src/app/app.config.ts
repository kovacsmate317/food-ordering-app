import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'food-ordering-app-72391',
        appId: '1:484434102:web:04bc81f19c8ae73abec617',
        storageBucket: 'food-ordering-app-72391.firebasestorage.app',
        apiKey: 'AIzaSyDlNDvRPfp7GViF_vpS2wpu_4JAeQ2pE6E',
        authDomain: 'food-ordering-app-72391.firebaseapp.com',
        messagingSenderId: '484434102',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
