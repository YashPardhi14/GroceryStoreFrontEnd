import { CommonModule } from '@angular/common';
import {Component,Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import {GroceryDetails} from '../grocery-details'
@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule,RouterModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
@Input()  grocerydetail!:GroceryDetails



}
