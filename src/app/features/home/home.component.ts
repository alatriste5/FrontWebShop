import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }



}
