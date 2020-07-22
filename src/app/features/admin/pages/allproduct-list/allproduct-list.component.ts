import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ProductDto} from "../../../../shared/models/models/productDto";
import {takeUntil} from "rxjs/operators";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
  selector: 'app-allproduct-list',
  templateUrl: './allproduct-list.component.html',
  styleUrls: ['./allproduct-list.component.scss']
})
export class AllproductListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tempAllProductDtoList: ProductDto[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getUnValidProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (res: ProductDto[]) => {
        //console.log(res);
        this.tempAllProductDtoList = res;
      },
      error => {
        console.log(error);
      },
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
