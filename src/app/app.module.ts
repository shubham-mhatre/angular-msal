import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { EmployeeComponent } from './components/employee/employee.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'<<<<<your client-id here>>>>>>',
      redirectUri:'http://localhost:4200'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:MSAL_INSTANCE,
      useFactory:MSALInstanceFactory
    },
    {
      provide :HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi:true
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
