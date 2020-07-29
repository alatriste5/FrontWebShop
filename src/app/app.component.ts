import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FrontWebShop';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin(); //Call this for auto logged out the user after the target time
  }
}
