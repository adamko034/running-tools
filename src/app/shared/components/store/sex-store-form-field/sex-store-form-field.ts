import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Sex } from '../../../../core/business/model/enums/sex.enum';
import { StoreService } from '../../../../core/store/store.service';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-sex-store-form-field',
  imports: [FormField, TranslateModule, MatMenuModule, FormsModule],
  templateUrl: './sex-store-form-field.html',
})
export class SexStoreFormField {
  private store = inject(StoreService);

  sex = this.store.sex;
  sexValues = Sex;

  onSexChange(newSex: Sex) {
    this.store.updateSex(newSex);
  }

  getSexDisplay(): string {
    return this.sex() === Sex.F ? 'Female' : 'Male';
  }
}
