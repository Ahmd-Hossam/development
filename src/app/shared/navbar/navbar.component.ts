import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/services/shared.service';
import { Router } from '@angular/router';
import * as AOS from 'aos';

declare var $:any
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        public location: Location,
        private element: ElementRef,
        private modalService: NgbModal,
        public sharedService: SharedService,
        private _router: Router
    ) {
        this.sidebarVisible = false;
    }

    open() {
        const modalRef = this.modalService.open(RegisterModalContent);
        modalRef.componentInstance.name = 'World';
    }
    UserDetail
    ngOnInit() {

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];


        $(function(){
       //start scrolling  and backgroung navbar 
            $(window).scroll(function(){
                console.log('scroll');
                if($(this).scrollTop()>0){
                    $('nav').addClass('black_background'),
                    $('nav').css('paddingTop','5px'),
                    $('nav').css('paddingBottom','10px'),
                    $('nav li a').css('color','#f1f1f1')
                }
                if($(this).scrollTop()===0){
                    $('nav').removeClass('black_background');
                    $('nav li a').css('color','#222')
                    $('nav').css({
                        paddingTop:'0',
                        paddingBottom:'0',
                        webkitTransition:'all .4s linear',
                        mozTransition:'all .4s linear',
                        Transition:'all .4s linear',
                    })
                }
            })
         // end scrolling backgroung navbar 
        })
        
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    slides = [
        // { img: "http://placehold.it/350x150/000000" },
        { img: "assets/img/slides/1.jpg" },
        { img: "assets/img/slides/2.jpg" },
        { img: "assets/img/slides/3.jpg" },
        // { img: "http://placehold.it/350x150/000000" },
        // { img: "http://placehold.it/350x150/111111" },
        // { img: "http://placehold.it/350x150/333333" },
        // { img: "http://placehold.it/350x150/666666" }
    ];
    focus;
    slideConfig = {
        centerMode: true,
        centerPadding: '150px',
        slidesToShow: 1,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        dots: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    slickInit(e) {
        console.log('slick initialized');
    }

    breakpoint(e) {
        console.log('breakpoint');
    }

    afterChange(e) {
        console.log('afterChange');
    }

    beforeChange(e) {
        console.log('beforeChange');
    }
    Logout() {
        localStorage.removeItem('tokenObject')
        this.sharedService.TokenObject = ''
        this.ProfileOption = false
        this._router.navigate(['/'])
    }
    ProfileOption = false
    ToggelProfileOption() {
        this.UserDetail = JSON.parse(localStorage.getItem('UserDetail'))
        AOS.init()
        this.ProfileOption = !this.ProfileOption
        AOS.init()

    }
}


@Component({
    selector: 'reg-modal-content',
    template: `
    <div class="modal-header">
        <h5 class="modal-title text-center">Modal title {{name}}</h5>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body"> Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
    </div>
    <div class="modal-footer">
        <div class="left-side">
            <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Never mind</button>
        </div>
        <div class="divider"></div>
        <div class="right-side">
            <button type="button" class="btn btn-danger btn-link" (click)="activeModal.close('Close click')">DELETE</button>
        </div>
    </div>
    `
})
export class RegisterModalContent {
    @Input() name: string;
    constructor(public activeModal: NgbActiveModal) { }
}