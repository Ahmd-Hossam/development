import { Component, OnInit } from '@angular/core';
import { WishService } from 'app/services/wish.service';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css']
})
export class WishItemComponent implements OnInit {
  name:string;
  price:number;
  after:number;
  descrioption:string
  constructor(private wishServic:WishService) { }

  ngOnInit(): void {
    const items=this.wishServic.getitem()
    this.name=items.name;
    this.price=items.price;
    this.after=items.after;
    this.descrioption=items.description;
    
  }

}
