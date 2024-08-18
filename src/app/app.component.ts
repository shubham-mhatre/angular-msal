import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-msal';

  constructor(private msalService:MsalService){

  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res=>{
        if(res!=null && res.account!=null){
          console.log(res);
          this.msalService.instance.setActiveAccount(res.account);
          const idToken=res.idToken;
          if(idToken){
            localStorage.setItem('id_token',idToken);
            localStorage.setItem('access_token',res.accessToken);
          }
        }
      }
    )
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() !=null;
  }

  loginPopUp(){
    this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>{
      console.log(response);
      this.msalService.instance.setActiveAccount(response.account);
    });
  }

  login(){
    this.msalService.loginRedirect();
  }

  logout(){
    this.msalService.logout();
    localStorage.clear();
  }
}
