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
        bg: 'bg-gradient-to-br from-blue-100 to-blue-200', 
        text: 'text-blue-700' 
      },
      'Training': { 
        bg: 'bg-gradient-to-br from-purple-100 to-purple-200', 
        text: 'text-purple-700' 
      },
      'Personal Tools': { 
        bg: 'bg-gradient-to-br from-green-100 to-green-200', 
        text: 'text-green-700' 
      },
      'Unit Converters': { 
        bg: 'bg-gradient-to-br from-orange-100 to-orange-200', 
        text: 'text-orange-700' 
      }
    };
    return styleMap[categoryTitle] || { 
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200', 
      text: 'text-gray-700' 
    };
  }

  getCategoryCardStyles(categoryTitle: string): string {
    const styleMap: { [key: string]: string } = {
      'Race Tools': 'bg-gradient-to-br from-blue-50 to-blue-100 hover:border-blue-300',
      'Training': 'bg-gradient-to-br from-purple-50 to-purple-100 hover:border-purple-300',
      'Personal Tools': 'bg-gradient-to-br from-green-50 to-green-100 hover:border-green-300',
      'Unit Converters': 'bg-gradient-to-br from-orange-50 to-orange-100 hover:border-orange-300'
    };
    return styleMap[categoryTitle] || 'bg-white hover:border-gray-300';
  }

  getCategoryIconStyles(categoryTitle: string): string {
    const styleMap: { [key: string]: string } = {
      'Race Tools': 'bg-gradient-to-br from-blue-500 to-blue-600',
      'Training': 'bg-gradient-to-br from-purple-500 to-purple-600',
      'Personal Tools': 'bg-gradient-to-br from-green-500 to-green-600',
      'Unit Converters': 'bg-gradient-to-br from-orange-500 to-orange-600'
    };
    return styleMap[categoryTitle] || 'bg-gradient-to-br from-gray-500 to-gray-600';
  }
}
