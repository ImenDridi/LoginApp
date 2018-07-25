import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revive-calc',
  templateUrl: './revive-calc.component.html',
  styleUrls: ['./revive-calc.component.css']
})

export class ReviveCalcComponent implements OnInit {

  // this is the private field that will hold the memory content - it's a number
  private memory: number = undefined;

  // this private field holds the number displayed on the screen as a string (it's easier)
  private screenOperand: string = '0';
  // this private numeric field holds (=remember) the previous operand
  // (that is the value of the screenOperand before the user pressed an operator button)
  private otherOperand: number = 0;
  // this private field holds the operator that was pressed by the user
  private currentOperator: string = undefined;

  constructor() { }
  ngOnInit() { }

  /**
   * this method gets the content of the screen and makes sure it is alligned on the right
   * by adding exclamation points on the beginning of the string
   */
  getScreenOperand() {
    // calculate how many exclamation points are necessary - 11 is the size of the screen in characters
    let missingDigits: number = 11 - this.getScreenOpernadLength();

    // if it is negative it means that it does not fit on the screen, so return the Overflow message
    if (missingDigits < 0) {
      return 'Overflow!';
    } else {
      // otherwise (the normal case) repeat the ! as many times as the missingDigits and next to the ! put the content
      return '!'.repeat(missingDigits) + this.screenOperand;
    }
  }

  /**
   * this method is called whenever a digit ( 0-9 ) is pressed on the calculator
   */
  insertDigit(x: number) {
    // if the screen contains a 0, then just replace it (as a text)
    if (this.screenOperand === '0') {
      this.screenOperand = x.toString();  // .toString() converts a number to a String
    } else {
      // but in the normal case the x is appended to the screen content
      this.screenOperand += x.toString(); // reminder:   A += B   is the same as A = A + B
    }
  }

  /**
   * this method returns tha "actual" length of the digits on screen since the . caracter on
   * the screen, does not takes up any space - this is somethng special with this font (and
   * it is actually true on SSD displays)
   */
  getScreenOpernadLength() {
    // if there is no . in the screen content the length is given as usual
    if (this.screenOperand.indexOf('.') === -1) { // indexOf returns the position where . is found or -1 if it is not found
      return this.screenOperand.length;
    } else {
      // if there is a dot, remove 1 from the length since the . has no length on screen
      // note that we remove just 1 and we do not look for any second . because we'll make
      // sure that only one is allowed per number
      return this.screenOperand.length - 1;
    }
  }

  /**
   * this method is called when the . button is pressed on the calc
   */
  insertDot() {
    // if there is not a dot already on the screen
    if (this.screenOperand.indexOf('.') === -1) {
      // append one to the number
      this.screenOperand += '.';
    }
  }

  /**
   * this method is called when one of the operator buttons is pressed
   */
  operation(op: string) {
    // initially we check if it is one of the supported operators via this indexOf trick
    if ("+-*/".indexOf(op) === -1) {
      // if not then the method stops execution here
      return;
    }
    // otherwise...
    // the operator is stored for later use (i.e. when the = is pressed)
    this.currentOperator = op;
    // the screen value is converted to numeric (via parseFloat here) and is stored
    // for JS/TS ways to convert text to numbers see here:
    // https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
    this.otherOperand = parseFloat( this.screenOperand );
    // the screen operand is reverted to it's default value '0'
    this.screenOperand = '0';
  }

  /**
   * this method is called when the = button is clicked to calculate the result
   */
  calculate() {
    // first convert the number of the screen to a number (via the +)
    let screenValue: number = +this.screenOperand;

    // when an addition was requested
    if (this.currentOperator === '+') {
      // add the operands and convert the numeric result to string
      this.screenOperand = ( this.otherOperand + screenValue ).toString();
    } else if (this.currentOperator === '-') {
      // subtract the operands and convert the numeric result to string
      // NOTE: The "other" operand that was entered first is decremented by the on-screen value
      this.screenOperand = ( this.otherOperand - screenValue ).toString();
    } else if (this.currentOperator === '*') {
      // multiply the operands and convert the numeric result to string
      this.screenOperand = ( this.otherOperand * screenValue ).toString();
    } else if (this.currentOperator === '/') {
      // divide the operands and convert the numeric result to string
      // NOTE: The "other" operand that was entered first is divided by the on-screen value
      this.screenOperand = ( this.otherOperand / screenValue ).toString();
    }
    // if another operator would be found then ... as you can see here, nothing happens
  }
}
