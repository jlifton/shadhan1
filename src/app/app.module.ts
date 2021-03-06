import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import 'hammerjs'; // Needed for Touch functionality of Material Components
import { environment } from '../environments/environment';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {FormsModule} from "@angular/forms";
import { ContactComponent } from './shadhan/contact/contact.component';
import { PasswordComponent } from './shadhan/password/password.component';
import { HebrewhelpComponent } from './shadhan/hebrewhelp/hebrewhelp.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular Core Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // Fury Core Modules
    CoreModule,
    RoutingModule,

    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
