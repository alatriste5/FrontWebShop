import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {activeUser} from "../../models/models/activeUser.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  private userSub: Subscription;
  destroy$: Subject<boolean> = new Subject<boolean>();
  curractiveUser: activeUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //Set the auth variable true if the user just logged in.
    this.authService.activeUser.subscribe(
      res => {
        this.isAuthenticated = true;
        this.curractiveUser = res;

        if (this.curractiveUser.role == "Admin"){
          this.isAdmin = true;
        }
      },
      error => {
        console.log(error);
      }
    )

    //If the home page was reached check the localsorage data. If there is the active User data the the user still can
    //  see the menu links. If the localsorage UserData is empty hide them.
    if(localStorage.getItem("UserData") == null){
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;

      this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));
      if (this.curractiveUser.role == "Admin"){
        this.isAdmin = true;
      }

    }

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout(){
    this.authService.logout().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        console.log("Headerben res ag");
        console.log(res);
      },
      error => {
        console.log("Headerben eror ag");
        console.log(error);
      }
    )
  }

}
