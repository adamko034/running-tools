import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from '../../../../core/store/store.service';
import { NumberFormField } from '../../ui/number-form-field/number-form-field';

@Component({
  selector: 'app-age-store-form-field',
  imports: [TranslateModule, NumberFormField],
  templateUrl: './age-store-form-field.html',
})
export class AgeStoreFormField {
  private store = inject(StoreService);

  age = this.store.age;

  onAgeChage(newAge: number) {
    this.store.updateAge(newAge);
  }
}
