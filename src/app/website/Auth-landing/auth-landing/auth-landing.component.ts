import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { SharedService } from 'app/services/shared.service';
import { WishService } from 'app/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import * as AOS from 'aos'

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements OnInit {

  constructor(private ChatService: ChatService,
    private _toastr: ToastrService,
    private WishService: WishService, private shareService: SharedService) { }

  ngOnInit(): void {
    AOS.init();
    setInterval(() => {
      AOS.init({ duration: 1200 });
    }, 2000);
    this.getWishList()
    this.getCompanysList()
  }

  // *******************auth wish list
  PaginationCount
  WishList
  getWishList() {
    // this.WishList = this.FakeData.results
    // console.log(this.FakeData);
    // console.log(this.FakeData);
    // this.PaginationCount = this.FakeData.count / 10

    // this.ListPagination()
    this.WishService.ServicesList(this.shareService.TokenObject).subscribe((res: any) => {
      console.log(res);
      this.WishList = res.results;
      this.ServicesResult = res
      // pationation create 
      // if (res.count < 10) {
      //   if (res.count < 5) {
      //     this.PaginationCount = 1
      //   }
      // } else {
      //   this.PaginationCount = res.count / 5
      // }
      // this.ListPagination()
      // alert('s')
    })

  }
  Companys
  getCompanysList() {
    this.WishService.CompanysList(this.shareService.TokenObject).subscribe((res: any) => {
      console.log(res);
      this.Companys = res.results
      console.log(this.Companys);

    });
    // this.Companys = this.FakeCompany
  }
  FiltterByCompany(item) {
    item.Select = true
    this.WishService.FiltterCompanyServices(item.id, this.shareService.TokenObject).subscribe((res: any) => {
      this.WishList = res
      console.log(res);
    })
  }
  Pagination = new Array<any>()
  ListPagination() {
    console.log(this.Pagination);
    this.Pagination = []
    for (let index = 1; index < this.PaginationCount + 1; index++) {
      this.Pagination.push(index)
    }
    console.log(this.Pagination);
  }
  ContctCompany(item) {
    console.log(item);
    // this.Route.navigate(['/Contact-Company', item.id])
  }
  ServicesResult
  UnWish(item) {
    item.is_wished = !item.is_wished
    this.WishService.UnWish(item.id, this.shareService.TokenObject).subscribe(res => {
      this.getWishList()
    })
  }
  UpdateDate(Link) {
    if (Link == 'Previous') {
      this.WishService.UpdateDate(this.ServicesResult.previous, this.shareService.TokenObject).subscribe((res: any) => {
        this.ServicesResult = res
        this.WishList = res.results
        window.scroll(10, 10);
      })
    } else if (Link) {
      this.WishService.UpdateDate(this.ServicesResult.next, this.shareService.TokenObject).subscribe((res: any) => {
        this.ServicesResult = res
        this.WishList = res.results
        window.scroll(10, 10);
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
    this.ChatService.SendMessage({ "message": this.Message }, this.item.id, this.shareService.TokenObject).subscribe(res => {
      this.Message = ""
      this._toastr.success('We got Your Message Success!', 'Success');
      console.log(res);
      this.ShowDialog = !this.ShowDialog
    })
  }
}
