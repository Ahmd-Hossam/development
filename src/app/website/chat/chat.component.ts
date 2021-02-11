import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'app/services/chat.service'
import { SharedService } from 'app/services/shared.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private ActiveRoute: ActivatedRoute,
    private ChatService: ChatService,
    private _toastr: ToastrService,private shareService:SharedService) { }

  ngOnInit(): void {
    this.GetRouteParam()
    console.log(this.shareService.UserDetail);
    
  }
  Message: any
  onSubmit() {
    debugger;
    this.ChatService.SendMessage({ "message": this.Message }, this.RouteId, this.shareService.TokenObject).subscribe(res => {
      this.Message = ""
      this._toastr.success('We got Your Message Success!', 'Success');
      console.log(res);
    })
  }
  RouteId: number;
  GetRouteParam() {
    this.ActiveRoute.paramMap.subscribe((params: any) => {
      this.RouteId = +params.params.id
    })
  }
}
