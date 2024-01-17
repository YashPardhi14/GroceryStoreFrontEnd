import { CommonModule } from '@angular/common';
import { Component ,inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../grocery.service';
import { GroceryDetails } from '../grocery-details';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {State} from '../state';
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
id:number=0;
states:State[]=[]


 

updateForm=new FormGroup({
  groceryName: new FormControl('',Validators.required),
  costPerItem: new FormControl('',Validators.required),
  groceryAmounts:new FormGroup( {
    
    itemsAvailable:new FormControl('',Validators.required)
    
  }),
  grocerySource: new FormGroup({
    source_id:new FormControl('')
     
  }),

});
showUpdatingForm(){
  this.showUpdateForm=!this.showUpdateForm;
}

constructor(){
  
  const groceryId =Number(this.routes.snapshot.params['item_id']);
this.id=groceryId;
  //for dummy testing....
  // this.groceryDetail=this.groceryService.getGroceryDetailsById(groceryId);

  this.groceryService.getGroceryDetailsById(groceryId).then(groceryDetail=>this.groceryDetail=groceryDetail),
  this.groceryService.getAllStates().then((state:State[])=>{
    this.states=state
     })
}

updateFormSubmission(){

const updatedGroceryDetails:GroceryDetails={

  groceryName: this.updateForm.value.groceryName || '',
  costPerItem: Number(this.updateForm.value.costPerItem) || 0,
  groceryAmounts: {
    
    itemsAvailable: Number(this.updateForm.value.groceryAmounts?.itemsAvailable) || 0,
    
  },
  grocerySource: {
   
    // stateName: this.updateForm.value.grocerySource?.stateName || '',
    source_id:Number(this.updateForm.value.grocerySource?.source_id) || 0
  },
}


  this.groceryService.updateGroceryDetails(updatedGroceryDetails,this.id)
}

deleteGrocery(id:number|undefined){
  this.groceryService.deleteById(id);

}

}
