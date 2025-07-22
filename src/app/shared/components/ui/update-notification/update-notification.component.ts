import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdateService } from '../../../../core/services/sw-update.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-notification',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="update-banner" *ngIf="showUpdateBanner">
      <div class="update-content">
        <mat-icon class="update-icon">system_update</mat-icon>
        <span class="update-text">New version available!</span>
        <button mat-raised-button (click)="updateApp()" class="update-btn">
          Update Now
        </button>
        <button mat-icon-button (click)="dismissUpdate()" class="dismiss-btn" aria-label="Dismiss update notification">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .update-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #1976d2;
      color: white;
      z-index: 1000;
      padding: 12px 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }
    
    .update-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .update-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    
    .update-text {
      font-weight: 500;
      flex: 1;
      text-align: center;
    }
    
    .update-btn {
      background: white !important;
      color: #1976d2 !important;
      font-weight: 500;
    }
    
    .dismiss-btn {
      color: white;
    }
    
    .update-btn:hover {
      background: #f5f5f5 !important;
    }
    
    .dismiss-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 600px) {
      .update-content {
        gap: 8px;
        padding: 0 8px;
      }
      
      .update-text {
        font-size: 14px;
      }
      
      .update-btn {
        font-size: 12px;
        padding: 6px 12px;
      }
    }
  `]
})
export class UpdateNotificationComponent implements OnInit, OnDestroy {
  showUpdateBanner = false;
  private subscription?: Subscription;

  constructor(private swUpdateService: SwUpdateService) {}

  ngOnInit() {
    this.subscription = this.swUpdateService.updateAvailable.subscribe(
      (available) => {
        this.showUpdateBanner = available;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  updateApp() {
    this.swUpdateService.applyUpdate();
  }

  dismissUpdate() {
    this.swUpdateService.dismissUpdate();
  }
}