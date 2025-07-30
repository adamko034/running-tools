import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAdComponent } from '../../shared/components/ui/google-ad/google-ad.component';
import { AD_SLOTS } from '../../core/config/ad-slots.config';
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
  
  // Ad slots from config
  readonly adSlots = AD_SLOTS;

  constructor(private navigationService: NavigationService) {
    this.navigation$ = this.navigationService.getNavigation();
  }

  getCategoryIcon(categoryTitle: string): string {
    const iconMap: { [key: string]: string } = {
      'Race Tools': 'flag',
      'Training': 'fitness_center',
      'Personal Tools': 'person',
      'Unit Converters': 'swap_horiz'
    };
    return iconMap[categoryTitle] || 'category';
  }

  getCategoryStyles(categoryTitle: string): { bg: string; text: string } {
    const styleMap: { [key: string]: { bg: string; text: string } } = {
      'Race Tools': { 
        bg: 'bg-race-gradient', 
        text: 'text-race-light' 
      },
      'Training': { 
        bg: 'bg-training-gradient', 
        text: 'text-training-light' 
      },
      'Personal Tools': { 
        bg: 'bg-personal-gradient', 
        text: 'text-personal-light' 
      },
      'Unit Converters': { 
        bg: 'bg-units-gradient', 
        text: 'text-units-light' 
      }
    };
    return styleMap[categoryTitle] || { 
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200', 
      text: 'text-gray-700' 
    };
  }

  getCategoryCardStyles(categoryTitle: string): string {
    const styleMap: { [key: string]: string } = {
      'Race Tools': 'bg-race-gradient hover:border-race',
      'Training': 'bg-training-gradient hover:border-training',
      'Personal Tools': 'bg-personal-gradient hover:border-personal',
      'Unit Converters': 'bg-units-gradient hover:border-units'
    };
    return styleMap[categoryTitle] || 'bg-white hover:border-gray-300';
  }

  getCategoryIconStyles(categoryTitle: string): string {
    const styleMap: { [key: string]: string } = {
      'Race Tools': 'bg-race-icon',
      'Training': 'bg-training-icon',
      'Personal Tools': 'bg-personal-icon',
      'Unit Converters': 'bg-units-icon'
    };
    return styleMap[categoryTitle] || 'bg-gradient-to-br from-gray-500 to-gray-600';
  }
}
