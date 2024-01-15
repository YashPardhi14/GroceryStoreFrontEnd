import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGroceryComponent } from './add-new-grocery.component';

describe('AddNewGroceryComponent', () => {
  let component: AddNewGroceryComponent;
  let fixture: ComponentFixture<AddNewGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewGroceryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
