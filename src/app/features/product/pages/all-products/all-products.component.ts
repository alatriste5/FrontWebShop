import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {takeUntil} from "rxjs/operators";
import {ProductService} from "../../../../shared/services/product.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  currentProductDtoList: ProductDto[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  changeerror = false;
  errormessage = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getValidProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (res: ProductDto[]) => {
        this.currentProductDtoList = res;
      },
      error => {
        console.log("All products error")
        console.log(error);

        this.changeerror = true;
        this.errormessage = error.error;
        setTimeout(() => {
          this.changeerror = false;
          this.errormessage = null;
        }, 3000);
      },
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
