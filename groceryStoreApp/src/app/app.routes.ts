import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddNewGroceryComponent } from './add-new-grocery/add-new-grocery.component';


export const routes: Routes = [

    {
        path:'',
        component : HomeComponent ,
        title:'Home-Page',
        
    },
    {
        path:'details/:item_id',
        component:DetailsComponent,
                    },
                    {
                        path:'add-new-grocery',
                        component:AddNewGroceryComponent,
        
                    },
                    {
        path:'**',
        component:ErrorComponent ,
    }
];
