import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first } from 'rxjs/operators';
import { concat, interval, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {
  private updateAvailable$ = new BehaviorSubject<boolean>(false);

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    if (swUpdate.isEnabled) {
      this.checkForUpdates();
      this.handleUpdates();
    }
  }

  get updateAvailable() {
    return this.updateAvailable$.asObservable();
  }

  private checkForUpdates(): void {
    // Initial check when app becomes stable
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    
    // Check for updates every 15 minutes (more frequent for better UX)
    const everyFifteenMinutes$ = interval(15 * 60 * 1000);
    const periodicChecks$ = concat(appIsStable$, everyFifteenMinutes$);

    periodicChecks$.subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Checked for app updates');
      });
    });

    // Also check when user returns to the app (visibility change)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.swUpdate.isEnabled) {
        setTimeout(() => {
          this.swUpdate.checkForUpdate().then(() => {
            console.log('Checked for updates on app focus');
          });
        }, 1000); // Small delay to avoid immediate checks
      }
    });
  }

  private handleUpdates(): void {
    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        console.log('New version available');
        
        // Small delay to avoid showing notification immediately on app load
        // This gives users time to see the app before being interrupted
        setTimeout(() => {
          this.updateAvailable$.next(true);
        }, 2000); // 2 second delay
      });
  }

  public applyUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
      });
    }
  }

  public dismissUpdate(): void {
    this.updateAvailable$.next(false);
  }

  public forceUpdate(): void {
    this.applyUpdate();
  }
}