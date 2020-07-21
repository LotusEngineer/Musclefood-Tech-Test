export class Coin {
  // In grams
  weight: number;
  // In Millimeters
  diameter: number;
  // In Millimeters
  thickness: number;

  constructor(weight: number, diameter: number, thickness: number) {
    this.weight = weight;
    this.diameter = diameter;
    this.thickness = thickness;
  }

  // Typescript was not performing deep equals, had to write class method to perform checks
  equals(coinRecord: Coin) {
    if (this == coinRecord) {
      return true;
    }
    return (
      this.weight === coinRecord.weight &&
      this.diameter === coinRecord.diameter &&
      this.thickness === coinRecord.thickness
    );
  }
}

class VendingMachine {
  currentAmount: number;

  constructor() {
    this.currentAmount = 0;
  }
  nickel: Coin = new Coin(5, 21.21, 1.95);

  viewDisplay() {
    if (this.getCurrentAmount() > 0) {
      return this.getCurrentAmount().toFixed(2);
    }
    return "INSERT COIN";
  }

  insertCoin(coin: Coin) {
    const value: number = this.computeCoinValue(coin);

    this.setCurrentAmount(this.getCurrentAmount() + value);
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }

  setCurrentAmount(currentAmount: number) {
    this.currentAmount = currentAmount;
  }

  computeCoinValue(coin: Coin): number {
    if (coin.equals(this.nickel)) {
      return 0.05;
    } else {
      return 0;
    }
  }
}

export default VendingMachine;
