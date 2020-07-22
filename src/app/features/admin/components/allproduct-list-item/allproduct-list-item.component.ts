import {Component, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {ProductService} from "../../../../shared/services/product.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allproduct-list-item',
  templateUrl: './allproduct-list-item.component.html',
  styleUrls: ['./allproduct-list-item.component.scss']
})
export class AllproductListItemComponent implements OnInit {

  @Input() actualAllProductDto: ProductDto;
  destroy$: Subject<boolean> = new Subject<boolean>();
  destroy2$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
  }

  validate($event: MouseEvent, id: number){
    this.productService.validateUnValidProduct(id).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        //console.log(res);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  delete($event: MouseEvent, id: number){
    this.productService.deleteProduct(id).pipe(takeUntil(this.destroy2$)).subscribe(
      res => {
        //console.log(res);
        window.location.reload();
      },
        error => {
        console.log(error);
      }
      );
  }

}
