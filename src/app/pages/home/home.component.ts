import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAdComponent } from '../../shared/components/ui/google-ad/google-ad.component';
import { Observable } from 'rxjs';
import { Navigation } from '../../core/navigation/navigation.model';
import { NavigationService } from '../../core/services/navigation.service';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    GoogleAdComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isMobile$ = inject(UiService).isMobile$;
  navigation$: Observable<Navigation[]>;

  constructor(private navigationService: NavigationService) {
    this.navigation$ = this.navigationService.getNavigation();
  }
}
