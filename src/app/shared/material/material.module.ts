import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
  ],
})
export class MaterialModule {}
