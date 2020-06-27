import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActionControllerService } from '../../alerts/confirmationAlert.service';

import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { HttpServiceService } from 'src/app/shared/http-service.service';

import { ModalController } from '@ionic/angular';
import { ModelPagePage } from './model-page/model-page.page';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.page.html',
  styleUrls: ['./tracker-list.page.scss'],
})
export class TrackerListPage implements OnInit {
  public timeBegan = null
  public timeStopped: any = null
  public stoppedDuration: any = 0
  public started = null
  public running = false

  public blankTime = "00:00.000"
  public time = "00:00.000";

  startStatus: any = false;
  endTimeStatus: any = true;
  actualtime = {};
  ionSegmenetBtn = [{ id: 'lunch', icon: 'pizza' }, { id: 'breakfast', icon: 'cafe' }, { id: 'shortbreak', icon: 'walk' }];

  constructor(private modelCtrl: ModalController, private actionAlert: ActionControllerService, private router: Router, private broadcastService: EventService, private httpService: HttpServiceService) {
    this.broadcastService.events.subscribe((res) => {
      if (res == 'start') {
        this.start()
      } else if (res == 'stop') {
        this.stop()
      } else if (res == 'cancel') {
        this.reset();
      } else {
        this.openModel();
      }
    });
  }

  ngOnInit() {
    this.startStatus = localStorage.getItem("startTimeStatus") ? localStorage.getItem("startTimeStatus") : false;
    this.endTimeStatus = localStorage.getItem("endTimeStatus") ? localStorage.getItem("endTimeStatus") : true;
  }

  async openModel() {
    console.log("open model");
    const modal = await this.modelCtrl.create({
      component: ModelPagePage,
      showBackdrop: false,
      mode: 'md'
    });
    modal.onDidDismiss().then(res => console.log(res));
    return await modal.present();
  }

  logout() {
    this.router.navigate(["/home"]);
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
  }

  start() {
    let initialTime = new Date().toLocaleString('en-US', { hour12: true });
    let actualTime = initialTime.split(",")[1];
    this.actualtime["startTime"] = "" + actualTime;
    if (this.running) return;
    if (this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration: any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }

  stop() {
    let initialTime = new Date().toLocaleString('en-US', { hour12: true });
    let actualTime = initialTime.split(",")[1];
    this.actualtime["endTime"] = "" + actualTime;
    this.actualtime["totalTime"] = "" + this.time.slice(0, 8);
    this.actualtime["user_id"] = localStorage.getItem("userId");
    let keys = Object.keys(this.actualtime);
    console.log(keys);
    console.log("====================", this.actualtime);
    if (keys.length == 5) {
      this.httpService.saveBreakTime(this.actualtime).subscribe((res) => { console.log(res) });
    }
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  async segmentButtonClicked(env: any) {
    console.log(env);
    this.actualtime["type"] = env;
    var res = this.actionAlert.presentActionSheet();
    var show = await res;
    show.present();
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning() {
    let currentTime: any = new Date()
    let timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3);
  };

  outTime() {
    this.httpService.saveEndTime().subscribe((res) => {
      if (res['status']) {
        this.startStatus = false;
        localStorage.setItem('startTimeStatus', 'false');
        this.endTimeStatus = true;
        localStorage.setItem('endTimeStatus', 'true');
      }
    });
  }

  inTime() {
    this.httpService.saveInTime().subscribe((res) => {
      if (res['status']) {
        this.startStatus = true;
        this.endTimeStatus = false;
        localStorage.setItem("endTimeStatus", 'false');
        localStorage.setItem("startTimeStatus", 'true');
      }
    });
  }

}


