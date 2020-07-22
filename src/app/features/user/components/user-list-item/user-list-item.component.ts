import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../../../../shared/models/models/UserDto";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  @Input() actualUserDto: UserDto;

  constructor() { }

  ngOnInit(): void {
  }

}
