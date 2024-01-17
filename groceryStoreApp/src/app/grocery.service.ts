import { Injectable } from '@angular/core';
import { GroceryDetails } from './grocery-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {State} from './state';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  private My_API='http://localhost:8080/api';
  private State_API='http://localhost:8080/api/states';

  constructor(
    private http: HttpClient,private route:Router,private snackBar: MatSnackBar
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  groceryDetailsList:GroceryDetails[]=[
    {
      item_id: 4,
      groceryName: "BAIGAN",
      costPerItem: 50.0,
      groceryAmounts: {
          id: 2,
          itemsAvailable: 40,
          totalCostOfItems: 2000.0
      },
      grocerySource: {
          source_id: 2,
          stateName: "MADHYA PRADESH"
      }
  },
  {
      item_id: 5,
      groceryName: "Karela",
      costPerItem: 30.0,
      groceryAmounts: {
          id: 3,
          itemsAvailable: 15,
          totalCostOfItems: 450.0
      },
      grocerySource: {
          source_id: 5,
          stateName: "CHATTISGARH"
      }
  },
  {
      item_id: 6,
      groceryName: "Jasmine",
      costPerItem: 24.0,
      groceryAmounts: {
        id: 6,
        itemsAvailable: 10,
        totalCostOfItems: 240.0
    },
      grocerySource: {
          source_id: 4,
          stateName: "TAMIL NADU"
      }
  },
  {
      item_id: 7,
      groceryName: "Kofta",
      costPerItem: 100.0,
      groceryAmounts: {
          id: 5,
          itemsAvailable: 510,
          totalCostOfItems: 51000.0
      },
      grocerySource: {
          source_id: 2,
          stateName: "MADHYA PRADESH"
      }
  }

  ]

  // // getAllGroceryDetails():Observable<GroceryDetails[]>{
    // getAllGroceryDetails():GroceryDetails[]{
    //   return this.groceryDetailsList;
    // }
  //   // return this.http.get<GroceryDetails[]>(this.My_API+'/groceries');
async getAllGroceryDetails():Promise<GroceryDetails[]>{
  const data = await fetch(this.My_API+'/groceries');
  return await data.json() ?? [];
}

async getAllStates():Promise<State[]>{
  const data =await fetch(this.State_API);
  return await data.json() ?? [];
}
  
  // getGroceries(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/groceries`);
  // }

  // getAllGroceryDetails():Observable<GroceryDetails[]>{

  //   return this.http.get<GroceryDetails[]>(`${this.My_API}/groceries`);
  // }


  // getGroceryDetailsById(id:Number):GroceryDetails | undefined{
  //   // return this.http.get<GroceryDetails[]>(this.My_API+'/groceries/'+id);
  //   return this.groceryDetailsList.find(groceryDetail=>groceryDetail.item_id===id)
  // }

  async getGroceryDetailsById(id:Number):Promise<GroceryDetails | undefined>{
const data = await fetch(`${this.My_API}/groceries/${id}`)
return await data.json() ?? {};
  }

  // updateMyGroceryDetailById(id:Number,body:any):Observable<any>{

  //   return this.http.put<any>(`${this.My_API}/groceries/${id}`)
  // }
 
 

  async deleteById(id:number|undefined):Promise<void>{
try{
const response=await fetch(`${this.My_API}/groceries/${id}`,
{method:'DELETE'} // Specify DELETE method for deletion
)
if (!response.ok) {
  throw new Error(`Error deleting grocery with ID ${id}: ${response.status}`);
}
this.snackBar.open('Grocery with Grocery Id: '+ id+' Deleted successfully!', 'Dismiss', {
  duration: 4000, // Customize duration
});

 // Handle successful deletion

 console.log('Grocery with ID', id, 'deleted successfully.');
 this.route.navigate(['/']);

}catch(error){
  console.error('Error deleting grocery:', error);
  // Handle error gracefully, potentially notifying the user
}


  }
  /*
  async addNewGrocery(grocery: GroceryDetails): Promise<void> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grocery),
      });
      // Handle response
    } catch (error) {
      // Handle error
    }
  }
  */
  async addNewGrocery(newGrocery:GroceryDetails):Promise<void>{


    try{
      const response = await fetch(this.My_API+'/groceries',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
body:JSON.stringify(newGrocery),
      })
      this.snackBar.open('Grocery added successfully!', 'Dismiss', {
        duration: 4000, // Customize duration
      });
      console.log("New Groocery Added Succesfully.......")
    
      this.route.navigate(['/']);

    }catch(error){

      console.error("Failed to add the new Grocery to backend",error);
      

    }
  }
  // async updateGrocery(updatedGrocery: GroceryDetails): Promise<void> {
  //   try {
  //     const response = await fetch(this.My_API + `/groceries/${updatedGrocery.id}`, {
  //       method: 'PUT', // Use PUT for updating existing resources
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(updatedGrocery),
  //     });
  
  //     console.log("Grocery updated successfully!");
  
  //     // Navigate back to the appropriate view or update the UI as needed
  
  //   } catch (error) {
  //     console.error("Failed to update grocery", error);
  
  //     // Handle the error gracefully, e.g., display an error message to the user
  //   }
  // }
  async updateGroceryDetails(updatedGrocery:GroceryDetails,id:number):Promise<void>{
    try {
      const response = await fetch(this.My_API + `/groceries/${id}`, {
        method: 'PUT', // Use PUT for updating existing resources
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGrocery),
      });
      this.snackBar.open('Grocery Updated successfully!', 'Dismiss', {
        duration: 4000, // Customize duration
      });
      console.log("Grocery updated successfully!");

  
      // Navigate back to the appropriate view or update the UI as needed
      this.route.navigate(['/']);
  
    } catch (error) {
      console.error("Failed to update grocery", error);
  
      // Handle the error gracefully, e.g., display an error message to the user
    }
    
    

  }


  
}
