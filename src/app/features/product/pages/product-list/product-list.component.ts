import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tempProductDtoList: ProductDto[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getValidProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (res: ProductDto[]) => {
        //console.log(res);
        this.tempProductDtoList = res;
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
