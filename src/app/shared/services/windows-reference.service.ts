import { Injectable } from '@angular/core';
import { ICustomWindow } from '@home/interfaces';

function getWindow(): Window | null {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({
  providedIn: 'root'
})
export class WindowsReferenceService {
  /**
   * Get native window
   * @public
   * @return window
   */
  get nativeWindow (): ICustomWindow {
    return <ICustomWindow>getWindow();
  }
}
