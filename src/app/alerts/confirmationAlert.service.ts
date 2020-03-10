import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { EventService } from '../shared/event.service';

@Injectable({ providedIn: 'root' })
export class ActionControllerService {
    constructor(private actionSheetAlert: ActionSheetController, private broadcastService: EventService) { }

    async presentActionSheet() {
        const actionSheet = this.actionSheetAlert.create({
            header: 'Timer Details',
            buttons: [
                {
                    text: 'Start Time',
                    icon: 'alarm',
                    handler: () => {
                        this.broadcastService.dispatchEvent("start");
                    }
                }, {
                    text: 'Stop Time',
                    icon: 'alarm',
                    handler: () => {
                        this.broadcastService.dispatchEvent("stop");
                    }
                }, {
                    text: 'View Details',
                    icon: 'book',
                    handler: () => {
                        this.broadcastService.dispatchEvent("book");
                    }
                }, {
                    text: 'Reset Time',
                    role: 'cancel',
                    handler: () => {
                        this.broadcastService.dispatchEvent("cancel");
                    }
                }
            ]
        });
        return actionSheet;
    }
}