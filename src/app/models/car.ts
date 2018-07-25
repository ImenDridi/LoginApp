/**
 * A Class that describes a car and has it's functionality inside
 */
export class Car {
    constructor(
        private velocity: number = 0,   // the speed of the car (in px/sec)
        private steering: number = 0,   // the rotational speed of the car (in rad/sec)
        private xPos: number = 0,       // the horizontal position of the car, larger values mean right
        private yPos: number = 0,       // the vertical position of the car, larger values mean down
        private heading: number = 0     // the orientation of the car (in rad, i.e. 2*3.1415 = 6.2830 is a full circle) larger values mean clockwise
                                        //     it is the angle between the horizontal axis and the car direction
            
    ) {
        ;
    }

    getXPos() { return this.xPos; }         // this is a GETTER method, it just returns the value of the private xPos
    getYPos() { return this.yPos; }         // this is the getter for yPos
    getHeading() { return this.heading; }   // this is the getter for the heading

    /**
     * This method moves the car for a given duration.
     * It calculates the new position and orientation of the car,
     * using it's current position & heading, and the velocities.
     * 
     * It is slightly modified version than the one we had in class
     * so that it can be better explained.
     */
    move(duration: number) {

        // the length that the car travels "ahead" in duration seconds
        let lengthCoveredInThisDuration = duration * this.velocity;

        // the length along the horizontal axis is calculated via the cosine of the heading
        // it's horizontal position is  increased (+=) by that distance
        this.xPos += lengthCoveredInThisDuration * Math.cos(this.heading);
        // the length along the vertical axis is calculated via the sine of the heading
        // it's vertical position is increased (+=) by that distance
        this.yPos += lengthCoveredInThisDuration * Math.sin(this.heading);

        // by multiplying the rotationa speed of the car (we named it "steering") with the duration
        // we calculate the angle (in rad) that the car rotated during this time
        // the the heading is increased by that angle
        this.heading += duration * this.steering;

    }

    /**
     * This method turn the "steering wheel" to the left.
     * It is NOT turning the car to the left, just the steering wheel.
     * So if (before calling/invoking this method) the car was going
     * in a straight course , after this call it'll start turning left.
     * In case it was turning right, now it'll turn right a little bit less.
     */
    turnLeft(deltaSteer: number) {
        this.steering -= deltaSteer;
        return false;
    }
    /**
     * Same as turnLeft
     */
    turnRight(deltaSteer: number) {
        this.steering += deltaSteer;
        return false;
    }
}
