import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {ProductService} from "../../../../shared/services/product.service";
import {UserDto} from "../../../../shared/models/models/UserDto";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tempProductDtoList: ProductDto[];

  activeProductDtoList: ProductDto[];
  unvalidProductDtoList: ProductDto[];
  soldProductDtoList: ProductDto[];

  ownList = false;
  userid = null;

  mode: string;
  sold = false;
  purchase = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      //if this turn true we are at sold at mode
      this.mode = params['sold'];

      this.userid = +params['id'];
      this.ownList = params['id'] != null;
    });

    if(!this.ownList){
      //Not own product mode
      if(this.mode != "purchases" && this.mode != "sold") {
        //All valid product mode -> base page
        this.productService.getValidProducts().pipe(takeUntil(this.destroy$)).subscribe(
          (res: ProductDto[]) => {
            //console.log(res);
            this.tempProductDtoList = res;
          },
          error => {
            console.log(error);
          },
        );
      } else {
        if (this.mode == "sold") {
          //Already sold product mode
          this.sold = true;
          this.productService.getSoldProducts().pipe(takeUntil(this.destroy$)).subscribe(
            (res: ProductDto[]) => {
              this.tempProductDtoList = res;
            },
            error => {
              console.log(error);
            }
          );
        } else if(this.mode == "purchases"){
          this.purchase = true;
          //Own purchase mode -> show the own bought products
          this.productService.getMyPurchase().pipe(takeUntil(this.destroy$)).subscribe(
            (res: ProductDto[]) => {
              this.tempProductDtoList = res;
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    } else {
      //Own product mode: Own valid - unvalid and sold prodcuts
      this.productService.getOwnValidProducts(this.userid).pipe(takeUntil(this.destroy$)).subscribe(
        (res: ProductDto[]) => {
          //console.log(res);
          this.tempProductDtoList = res;

          this.activeProductDtoList = Array();
          this.unvalidProductDtoList = Array();
          this.soldProductDtoList = Array();


          for (let i = 0; i < this.tempProductDtoList.length; i++) {
            if(this.tempProductDtoList[i].valid == 1){
              this.activeProductDtoList.push(this.tempProductDtoList[i]);
            } else if(this.tempProductDtoList[i].valid == 0){
              this.unvalidProductDtoList.push(this.tempProductDtoList[i]);
            } else if(this.tempProductDtoList[i].valid == 2) {
              this.soldProductDtoList.push(this.tempProductDtoList[i]);
            }
          }

          },
          error => {
          console.log(error);
        }
        );
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
