import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/shared/http-service.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.page.html',
  styleUrls: ['./model-page.page.scss'],
})
export class ModelPagePage implements OnInit {
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  timerecords: any;

  currenctDateAndTime;

  constructor(private modelCtrl: ModalController, private httpService: HttpServiceService) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }

    this.currenctDateAndTime = new Date().toISOString();
  }

  selectedDate(evt: CustomEvent) {
    console.log(evt.detail.value);
    this.currenctDateAndTime = evt.detail.value;
  }

  ngOnInit() {
    console.log("fetch time details", this.currenctDateAndTime);
    console.log("user id", localStorage.getItem("userId"));
    let onlyDate = this.currenctDateAndTime.split("T");
    let splittedData = onlyDate[0].split("-");
    let mm = splittedData[1];
    let dd = splittedData[2];
    let yy = splittedData[0];
    let m = mm[0] == 0 ? mm[1] : mm;
    let d = dd[0] == 0 ? dd[1] : dd;
    this.httpService.fetchUserSpecificTimeDetails({ userId: localStorage.getItem("userId"), created_at: d + "/" + m + "/" + yy })
      .subscribe((res) => {
        console.log(res);
        let data = [...res[0]['result'], ...res[1]['result'], ...res[2]['result']];
        console.log("%%%%%%%%", data);
        this.timerecords = data;
        // console.log(this.timerecords);
      });
  }

  closeModal() {
    this.modelCtrl.dismiss('nik', 'gavali');
  }

  viewModal() {
    console.log("current date", this.currenctDateAndTime);
  }

}
