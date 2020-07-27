import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../shared/services/user.service";
import {takeUntil} from "rxjs/operators";
import {UserDto} from "../../../../shared/models/models/UserDto";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  userid: number;
  tempUser: UserDto;
  today: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userid = +this.route.snapshot.paramMap.get("id");

    this.userService.getUser(this.userid).pipe(takeUntil(this.destroy$)).subscribe(
      res=>{
        //console.log(res);
        this.tempUser = res;
      },
      error => {
        console.log(error);
      }
    );

    this.today = Date.now();
  }
  editUser(){
    this.router.navigate(['users/edit/'+this.userid]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
