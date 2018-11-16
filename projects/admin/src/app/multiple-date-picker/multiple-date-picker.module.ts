import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleDatePickerComponent } from './multiple-date-picker.component';
import { DateClickedDirective } from './date-click-directive';
import { DateRangeHelper } from './date-range-helper';
// import { FormsModule } from '@angular/forms';

// add DateClicked Helper to providers if used in future. remember to add to index.ts for export
// import { MultipleDatePickerComponent, DateRangeHelper, DateClickedDirective } from './index';

@NgModule({
    imports: [
        CommonModule,
        // FormsModule
    ],
    declarations: [
        MultipleDatePickerComponent,
        DateClickedDirective
    ],
    providers: [
        DateRangeHelper
    ],
    exports: [MultipleDatePickerComponent]
})
export class MultipleDatePickerModule { }