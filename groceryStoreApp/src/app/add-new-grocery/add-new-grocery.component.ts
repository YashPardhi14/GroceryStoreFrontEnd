import { CommonModule } from '@angular/common';
import { Component,  inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { GroceryDetails } from '../grocery-details';
import {State} from '../state';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-add-new-grocery',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule],
  templateUrl: './add-new-grocery.component.html',
  styleUrl: './add-new-grocery.component.css'
})
export class AddNewGroceryComponent {

  

  groceryService=inject(GroceryService);



  states:State[]=[]

  constructor(){
    this.groceryService.getAllStates().then((state:State[])=>{
   this.states=state
    })
    
  }

  addGroceryForm= new FormGroup({
  groceryName: new FormControl('',Validators.required),
  costPerItem: new FormControl('',Validators.required),
  groceryAmounts:new FormGroup( {
    
    itemsAvailable:new FormControl('',Validators.required)
    
  }),
  grocerySource: new FormGroup({
    stateName:new FormControl('',Validators.required),
     
  }),

});


onSubmit(){
const newGroceryDetails:GroceryDetails= {

  groceryName: this.addGroceryForm.value.groceryName || '',
  costPerItem: Number(this.addGroceryForm.value.costPerItem) || 0,
  groceryAmounts: {
    
    itemsAvailable: Number(this.addGroceryForm.value.groceryAmounts?.itemsAvailable) || 0,
    
  },
  grocerySource: {
   
    stateName: this.addGroceryForm.value.grocerySource?.stateName || '',
  },
}

this.groceryService.addNewGrocery(newGroceryDetails);



// this.addGroceryForm.value;
// this.groceryService.addNewGrocery(newGroceryDetails)
}



}
