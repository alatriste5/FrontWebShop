import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {ProductService} from "../../../../shared/services/product.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-allproduct-list-item',
  templateUrl: './allproduct-list-item.component.html',
  styleUrls: ['./allproduct-list-item.component.scss']
})
export class AllproductListItemComponent implements OnInit, OnDestroy {

  @Input() actualAllProductDto: ProductDto;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  validate($event: MouseEvent, id: number){
    this.productService.validateUnValidProduct(id).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  delete($event: MouseEvent, id: number){
    this.productService.deleteProduct(id).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        window.location.reload();
      },
        error => {
        console.log(error);
      }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
