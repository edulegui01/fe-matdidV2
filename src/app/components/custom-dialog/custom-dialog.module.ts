import { NgModule } from '@angular/core';
import { CustomDialogComponent } from './components/custom-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        CustomDialogComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MaterialModule,
    ],
    exports: [
        CustomDialogComponent,
    ],
   
})
export class CustomDialogModule {}
