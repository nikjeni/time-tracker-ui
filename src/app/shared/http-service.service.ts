import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  userUrl = "https://timetrackercore.herokuapp.com/users";
  timeUrl = "https://timetrackercore.herokuapp.com/time";

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post(`${this.userUrl}/login`, user)
  }

  registerUser(user) {
    return this.http.post(`${this.userUrl}/register`, user);
  }

  saveInTime() {
    let initialTime = new Date().toLocaleString('en-US', { hour12: true });
    let obj = { startTime: initialTime.split(',')[1].trim(), user_id: localStorage.getItem("userId") };
    return this.http.post(`${this.timeUrl}/startTime`, obj);
  }

  saveEndTime() {
    let endTime = new Date().toLocaleString('en-US', { hour12: true });
    let obj = { startTime: endTime.split(',')[1].trim(), user_id: localStorage.getItem("userId") };
    return this.http.post(`${this.timeUrl}/endTime`, obj);
  }

  saveBreakTime(breakTime) {
    return this.http.post(`${this.timeUrl}/breakTime`, breakTime);
  }

  fetchUserSpecificTimeDetails(userData) {
    let intTime = this.http.post(`${this.timeUrl}/inTime`, { created_at: userData.created_at, userId: localStorage.getItem("userId") });
    let breakTimes = this.http.post(`${this.timeUrl}/fetchDetails`, userData);
    let endTime = this.http.post(`${this.timeUrl}/finalTime`, { created_at: userData.created_at, userId: localStorage.getItem("userId") });
    return forkJoin([intTime, breakTimes, endTime]);
  }

}
