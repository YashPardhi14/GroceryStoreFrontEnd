import { Component,inject} from '@angular/core';
import { GroceryComponent } from '../grocery/grocery.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GroceryDetails } from '../grocery-details';
import { CommonModule } from '@angular/common';
import { GroceryService } from '../grocery.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GroceryComponent,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  groceryDetailsList:GroceryDetails[]=[];

  groceryService:GroceryService=inject(GroceryService);

  constructor(){
    this.groceryDetailsList=this.groceryService.getAllGroceryDetails();
  }

}
