import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare const window: any;
@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineServiceService {
 private internalConnectionChanged = new Subject<boolean>();
 get isOnline() {
    return !!window.navigator.onLine;
  }

get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  constructor() {
    window.addEventListener('online', () => console.log('online'));
    window.addEventListener('offline', () => console.log('offline'));
  }

  private updateOnlineStatus() {
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
