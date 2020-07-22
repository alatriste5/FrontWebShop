import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ProductDto} from "../../../../shared/models/models/productDto";
import {UserDto} from "../../../../shared/models/models/UserDto";
import {ProductService} from "../../../../shared/services/product.service";
import {activeUser} from "../../../../shared/models/models/activeUser.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  tempProductDto: ProductDto;
  destroy$: Subject<boolean> = new Subject<boolean>();
  productid: number;
  tempUserDto: UserDto;

  //Product owner want to see the page or somebody else
  ownproduct = false;
  curractiveUser: activeUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productid = +this.route.snapshot.paramMap.get("id")
    this.curractiveUser = JSON.parse(localStorage.getItem("UserData"));

    this.productService.getProduct(this.productid).pipe(
      takeUntil(this.destroy$),
      concatMap(res => {
        this.tempProductDto = res;

        if(this.tempProductDto.sellerid == this.curractiveUser.id || this.curractiveUser.role == "Admin"){
          this.ownproduct = true;
        }
        //console.log(res);
        return this.productService.getUsername(this.tempProductDto.sellerid)
      }),
    ).subscribe(
      res2 =>{
        this.tempUserDto = res2;
        //localStorage.setItem('localProduct', JSON.stringify(this.tempProductDto));
        //localStorage.setItem('localUserName', JSON.stringify(this.tempUserDto));
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onEditProduct() {
    this.router.navigate(['products/edit/'+this.productid]);
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.productid).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['products']).then(() => {
      window.location.reload();
    });
  }

}
