import { NgModule } from '@angular/core';
import { 
  MatAutocompleteModule, 
  MatSelectModule, 
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatInputModule
} from '@angular/material/';

const material = [
  MatAutocompleteModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatInputModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
