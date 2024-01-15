import { Injectable } from '@angular/core';
import { GroceryDetails } from './grocery-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  private My_API='http://localhost:8080/api';

  constructor(
    private http: HttpClient,private route:Router
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
 
  updateGroceryDetails(groceryName:string,costPerItem:number,itemsAvailable:number,stateName:string){

    console.log(costPerItem+' '+groceryName+' '+itemsAvailable+' '+stateName);
    

  }

  async deleteById(id:number|undefined):Promise<void>{
try{
const response=await fetch(`${this.My_API}/groceries/${id}`,
{method:'DELETE'} // Specify DELETE method for deletion
)
if (!response.ok) {
  throw new Error(`Error deleting grocery with ID ${id}: ${response.status}`);
}

 // Handle successful deletion

 console.log('Grocery with ID', id, 'deleted successfully.');
 this.route.navigate(['/']);

}catch(error){
  console.error('Error deleting grocery:', error);
  // Handle error gracefully, potentially notifying the user
}


  }


  
}
