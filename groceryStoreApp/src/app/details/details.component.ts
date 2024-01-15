import { CommonModule } from '@angular/common';
import { Component ,inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../grocery.service';
import { GroceryDetails } from '../grocery-details';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  showUpdateForm:boolean=false;

routes:ActivatedRoute=inject(ActivatedRoute)
groceryService=inject(GroceryService)
groceryDetail:GroceryDetails|undefined;

updateForm=new FormGroup({
  groceryName:new FormControl(''),
  costPerItem:new FormControl(''),
  itemsAvailable:new FormControl(''),
  stateName:new FormControl('')

})
showUpdatingForm(){
  this.showUpdateForm=!this.showUpdateForm;
}

constructor(){
  
  const groceryId =Number(this.routes.snapshot.params['item_id']);
  this.groceryDetail=this.groceryService.getGroceryDetailsById(groceryId);
}

}
