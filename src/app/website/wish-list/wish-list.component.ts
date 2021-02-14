import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'app/services/chat.service';
import { SharedService } from 'app/services/shared.service';
import { WishService } from 'app/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  WishList: Table[]
  constructor(private WishService: WishService,
    private shareServices: SharedService,
    private Route: Router, private ChatService: ChatService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWishList();
    this.getCompanysList();
  }
  Companys
  FakeCompany = [
    { id: 1, name: "شركة مساعدة" },
    { id: 2, name: "شركة مساعدة" },
    { id: 3, name: "شركة مساعدة" }
  ]
  getCompanysList() {
    this.WishService.CompanysList(this.shareServices.TokenObject).subscribe((res: any) => {
      console.log(res);
      this.Companys = res.results
    });
    // this.Companys = this.FakeCompany
  }
  FiltterByCompany(item) {
    item.Select = true
    this.WishService.FiltterCompanyServices(item.id, this.shareServices.TokenObject).subscribe((res: any) => {
      this.WishList = res
      console.log(res);
    })
  }
  FakeData: any = {
    "count": 100,
    "next": null,
    "previous": null,
    "results": [
      { "id": 1, "name": "service 1", "description": "We are proud to present our best premium Shopify theme - Wokiee. This is multi-purpose software that can be used for any type of the store. Great variety of available...", "price": "90.00", "price_after_discount": "85", "company": 1, "photo": "http://3.137.146.195/media/services/4-bottle-mock-up-1536x1055_mvFMjMs.jpg", "is_featured": false, "no_stars": 3, "company_name": "شركة مساعدة" },
      { "id": 3, "name": "Company", "description": "Company For Test", "price": "100.00", "price_after_discount": "90.00", "company": 1, "photo": "http://3.137.146.195/media/services/joe-gardner-2.jpg", "is_featured": false, "no_stars": 3, "company_name": "شركة مساعدة" },
      { "id": 2, "name": "service 2", "description": "service 1", "price": "150.00", "price_after_discount": "140", "company": 1, "photo": "http://3.137.146.195/media/services/4-bottle-mock-up-1536x1055_mvFMjMs.jpg", "is_featured": false, "no_stars": 3, "company_name": "شركة مساعدة" },
      { "id": 6, "name": "service 2", "description": "service 1", "price": "150.00", "price_after_discount": "", "company": 1, "photo": "http://3.137.146.195/media/services/4-bottle-mock-up-1536x1055_mvFMjMs.jpg", "is_featured": false, "no_stars": 3, "company_name": "شركة مساعدة" },
    ]
  }
  PaginationCount
  ServicesResult
  getWishList() {
    // this.WishList = this.FakeData.results
    this.PaginationCount = this.FakeData.count / 10
    this.ListPagination()
    this.WishService.AuthServicesList(this.shareServices.TokenObject).subscribe((res: any) => {
      this.WishList = res.results
      this.ServicesResult = res
      this.ListPagination()
      // pationation create 
      // if (res.count < 10) {
      //   if (res.count < 5) {
      //     this.PaginationCount = 1
      //   }
      // } else {
      //   this.PaginationCount = res.count / 5
      // }
    })
  }
  Pagination = new Array<any>()
  ListPagination() {
    this.Pagination = []
    for (let index = 1; index < this.PaginationCount + 1; index++) {
      this.Pagination.push(index)
    }
  }
  ContctCompany(item) {
    console.log(item);
    this.Route.navigate(['/Contact-Company', item.id])
  }

  UnWish(item) {
    this.WishService.UnWish(item.service_id, this.shareServices.TokenObject).subscribe(res => {
      this.getWishList()
    })
  }


  show(name,price,afer,description){
    this.WishService.setitem(name,price,afer,description)
  }

  UpdateDate(Link) {
    if (Link == 'Previous') {
      this.WishService.UpdateDate(this.ServicesResult.previous, this.shareServices.TokenObject).subscribe((res: any) => {
        this.ServicesResult = res
        this.WishList = res.results
        window.scroll(1, 1);
      })
    } else if (Link) {
      this.WishService.UpdateDate(this.ServicesResult.next, this.shareServices.TokenObject).subscribe((res: any) => {
        this.ServicesResult = res
        this.WishList = res.results
        window.scroll(1, 1);
      })
    }
  }
  ShowDialog = false
  Message
  item
  DialogAction(item) {
    this.item = item
    this.ShowDialog = !this.ShowDialog
  }
  sendMessage() {
    this.ChatService.SendMessage({ "message": this.Message }, this.item.service_id, this.shareServices.TokenObject).subscribe(res => {
      this.Message = ""
      this._toastr.success('We got Your Message Success!', 'Success');
      console.log(res);
      this.ShowDialog = !this.ShowDialog
    })
  }
}
