import { Component,inject} from '@angular/core';
import { GroceryComponent } from '../grocery/grocery.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GroceryDetails } from '../grocery-details';
import { CommonModule } from '@angular/common';
import { GroceryService } from '../grocery.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { State } from '../state';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GroceryComponent,MatIconModule,MatButtonModule,CommonModule,RouterLink,MatInputModule,MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  groceryDetailsList:GroceryDetails[]=[];

states:State[]=[];
  
  groceryService:GroceryService=inject(GroceryService);

  

  constructor(){
    // this.groceryDetailsList=this.groceryService.getAllGroceryDetails();


    this.groceryService.getAllGroceryDetails().then((groceryDetailsList:GroceryDetails[])=>{
this.groceryDetailsList=groceryDetailsList

    }),
    this.groceryService.getAllStates().then((state:State[])=>{
      this.states=state
    })
  }

    //***************/ */
// this.groceryService.getAllGroceryDetails().subscribe(
//   (data)=>{
// this.groceryDetailsList =data;
//   },
//   (error)=>{
//     console.log('Error in fetching the data',error);
//   }

// );

 

}
