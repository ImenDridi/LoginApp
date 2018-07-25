import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  // this is the array of the car objects
  private cars: Car[] = [new Car(20,0.1) , new Car(10,0.05)];
  // this keeps the timer handle
  private timer = undefined;

  constructor() { }

  ngOnInit() { }

  /**
   * this method checks if the timer is defined. if it is, then it (must be) is started
   * this is something that the rest of our code takes care about.
   */
  isStarted(): boolean {
    return this.timer !== undefined;
  }

  /**
   * this method starts the "animation" using an interval timer
   */
  start() {
    // if the timer is already started then exit the method, there is nothing to be done
    if (this.isStarted()) {
      return;
    }

    // start the interval timer and keep the timer handle
    // the interval timer executes a function every X miliseconds
    this.timer = setInterval(
      // instead of a typical anonymous function (i.e. function () { code.here; }) we use an
      // "arrow function" bacause it allows the use of the "this" variable.
      // if we had used an anonymous function instead, then the "this" would mean the object
      // that corresponds to the anonymous function, which of course, has no "movecars"
      // method
      () => {
        this.movecars();  // move the cars
      },
    100);                 // every 100ms (= 10 times per second)

  }

  /**
   * this method checks if the timer is started and then stops it using the clearInterval via it's handle
   * it also sets the handle to undefined, so that the method isStarted() works as expected
   */
  stop() {
    if (this.isStarted()) {
      clearInterval( this.timer );
      this.timer = undefined;
    }
  }

  /**
   * this method moves the cars (one by one) and the duration is the same as the timer interval
   * i.e. 0.1 sec = 100ms = 10 times/second
   */
  movecars() {
    this.cars[0].move(0.1);
    this.cars[1].move(0.1);
  }
}
