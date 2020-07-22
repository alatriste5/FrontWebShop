import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {UserService} from "../../../../shared/services/user.service";
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  tempUserDtoList: UserDto[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        this.tempUserDtoList = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
