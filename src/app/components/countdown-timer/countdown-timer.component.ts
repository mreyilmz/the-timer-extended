import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  onButtonClick(input: HTMLInputElement) {
    this.launchDate = new Date(input.value);
    this.updateValues();
    this.subscription = interval(1000).subscribe((x) => this.updateValues());
  }

  launchDate: Date;
  private subscription = new Subscription();
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;

  ngOnInit(): void {}

  updateValues() {
    let currentDate = new Date();
    let delta = (this.launchDate.getTime() - currentDate.getTime()) / 1000;
    delta = Math.max(0, delta);

    this.days = Math.floor(delta / 86400);
    delta -= this.days * 86400;

    this.hours = Math.floor(delta / 3600) % 24;
    delta -= this.hours * 3600;

    this.minutes = Math.floor(delta / 60) % 60;
    delta -= this.minutes * 60;

    this.seconds = Math.floor(delta % 60);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
