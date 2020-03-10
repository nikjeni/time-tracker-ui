import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class EventService {
    protected _eventSubject = new Subject();
    public events = this._eventSubject.asObservable();

    protected _loaderSubject = new Subject();
    public loaderEvent = this._loaderSubject.asObservable();

    dispatchEvent(event) {
        this._eventSubject.next(event);
    }

    dispatchLoaderEvent(event) {
        this._loaderSubject.next(event);
    }

}