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
    // Check for updates every 30 minutes
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everyThirtyMinutes$ = interval(30 * 60 * 1000);
    const everyThirtyMinutesOnceAppIsStable$ = concat(appIsStable$, everyThirtyMinutes$);

    everyThirtyMinutesOnceAppIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Checked for app updates');
      });
    });
  }

  private handleUpdates(): void {
    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        console.log('New version available');
        this.updateAvailable$.next(true);
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