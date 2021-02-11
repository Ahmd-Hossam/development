import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos'
import { ChatService } from 'app/services/chat.service';
import { SharedService } from 'app/services/shared.service';
import { WishService } from 'app/services/wish.service';
import { ToastrService } from 'ngx-toastr';

import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // providers: [NgbRatingConfig]
})
export class LandingComponent implements OnInit, AfterViewInit {
  //////////////////////////////////start header
  customOptions: OwlOptions = {
    animateOut:'fadeOut',
    //animateIn: 'flipInX',
    //stagePadding:30,
    smartSpeed:1200,
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText : [''],

    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true
  }
  products: any[] = [
    { id: 1, ani:'wow bounceInDown', img: 'assets/img/examples/slider1-1.jpg', big_title:"our forever after",  pargraph:"true love in every persones life" },
    { id: 2, ani:"wow swing",        img: 'assets/img/examples/slider1-2.jpg', big_title:"new arrivals",  pargraph:"Lorem ipsum dolor sit amet, consectetur" },
    { id: 3, ani:'wow bounceInDown', img: 'assets/img/examples/slider1-3.jpg', big_title:"beauty flowers",  pargraph:"true love in every persones life" },
  ];
//////////////////////////////////end  header





  /************************* start cards    ***********/
  customOptions2: OwlOptions = {
   // animateOut:'fadeOut',
    //animateIn: 'flipInX',
    //stagePadding:30,
    smartSpeed:1200,
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],

    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
  cards : any [] =[
    {name:'mummy flower',   new_sale:'new', new_salary:10, old_salary:12,     img:'assets/img/middel_slider/1.jpg'},
    {name:'birthday',       new_sale:'new', new_salary:12.3, old_salary:22.2, img:'assets/img/middel_slider/2.jpg'},
    {name:'love',           new_sale:'new', new_salary:19, old_salary:25.5,   img:'assets/img/middel_slider/3.jpg'},
    {name:'flowers',        new_sale:'new', new_salary:11, old_salary:14.9,   img:'assets/img/middel_slider/4.jpg'},
    {name:'mix',            new_sale:'new', new_salary:13, old_salary:17.2,   img:'assets/img/middel_slider/5.jpg'},
    {name:'new flower',     new_sale:'new', new_salary:15.5, old_salary:19.2, img:'assets/img/middel_slider/6.jpg'},
  ]
  /************************* start cards   ***********/



//////////////////////////////////start  Customer Review

customOptions3: OwlOptions = {
  
  //animateIn: 'flipInX',
  //stagePadding:30,
  smartSpeed:1000,
  autoplay:true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 3000,
  navText: [' ',' '],
    responsive: {
    0: {
      items: 1 
    },
    400: {
      items: 1
    },
    760: {
      items: 1
    },
    1000: {
      items: 1
    }
  },
  nav: true
}
customers: any[] = [
  { id: 1, name:"Soha",  comment:"This is the paragraph where you can write more details about your product.", img: 'assets/img/clients/persons/1.jpg' },
  { id: 2, name:"Ali",    comment:"This is the paragraph where you can write more details about your product.This is the paragraph where you can write more details about your product.  you can write more details about your product", img: 'assets/img/clients/persons/3.jpg' },
  { id: 3, name:"Sara", comment:"This is the paragraph where you can write more details about your product.", img: 'assets/img/clients/persons/4.png' },
  { id: 4, name:"Khaled",    comment:"This is the paragraph where you can write more details about your product.This is the paragraph where you can write more details about your product.  you can write more details about your product", img: 'assets/img/clients/persons/4.jpg' },
];
//////////////////////////////////end  Customer Review




  constructor(config: NgbRatingConfig,
    private ChatService: ChatService,
    private _toastr: ToastrService,
    private WishService: WishService, private shareService: SharedService) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // this.AuthToken = this.shareService.TokenObject
    window.scroll(1, 1);
    AOS.init();
    this.InitOption()
    setInterval(() => {
      AOS.init({ duration: 1200 });
    }, 2000);
    // this.getWishList()
    // this.getCompanysList()
    // alert(this.shareService.getTokenObject())

  }

  InitOption() {

  }
  
}
