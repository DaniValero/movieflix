import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private _reloadTable$ = new BehaviorSubject<boolean>(false);

  getReloadTable$(): BehaviorSubject<boolean> {
    return this._reloadTable$;
  }

  setReloadTable(value: boolean) {
    this._reloadTable$.next(value);
  }
}
