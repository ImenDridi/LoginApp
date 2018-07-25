import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  /**
   * This attribute is the car object that this component (car component /  app-car)
   * visualizes. It is an Input which means that it is given externally via the car
   * attribute.
   */
  @Input('car')
  private car: Car; // = new Car(20, 0.05, 5, 15, 0.20);

  constructor() { }

  ngOnInit() {
  }
  /**
   * This method places the car on screen using CSS transforms based on the
   * values of the car properties (using the getters to get the value). It
   * must return an object with attributes the css 
   */
  carPlacement() {
    return {
      transform: 'translateX('+this.car.getXPos()+'px) '+   // X is the horizontal axis
                 'translateY('+this.car.getYPos()+'px) '+   // Y is the vertical axis
                 'rotateZ('+this.car.getHeading()+'rad)',   // Z is the axis perpendicular to the screen plane
                                                            // Z is the axis perpendicular to both X & Y
                                                            // it is "coming" from the screen towards to us
      position: 'absolute'
    };
  }

  // this method moves the car for one second - it is not neccessary any more. it was created
  // as part of the building the project when we only had the single car component, so you can
  // ignore it :)
  movecar() {
    this.car.move(1);
  }
}
