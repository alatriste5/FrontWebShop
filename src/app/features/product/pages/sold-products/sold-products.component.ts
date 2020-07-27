import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {Subject} from "rxjs";
import {ProductService} from "../../../../shared/services/product.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.scss']
})
export class SoldProductsComponent implements OnInit, OnDestroy {
  currentProductDtoList: ProductDto[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getSoldProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (res: ProductDto[]) => {
        this.currentProductDtoList = res;
      },
      error => {
        console.log("All products error")
        console.log(error);
      },
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
