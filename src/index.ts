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
  coinReturn: Coin[];

  constructor() {
    this.currentAmount = 0;
    this.coinReturn = [];
  }
  nickel: Coin = new Coin(5, 21.21, 1.95);
  dime: Coin = new Coin(2.268, 17.91, 1.35);
  quarter: Coin = new Coin(5.67, 24.26, 1.75);

  viewDisplay() {
    if (this.getCurrentAmount() > 0) {
      return this.getCurrentAmount().toFixed(2);
    }
    return "INSERT COIN";
  }

  insertCoin(coin: Coin) {
    const value: number = this.computeCoinValue(coin);

    if (value < 0.05) {
      this.addToCoinReturn(coin);
    } else {
      this.setCurrentAmount(this.getCurrentAmount() + value);
    }
  }

  getCurrentAmount(): number {
    return this.currentAmount;
  }

  setCurrentAmount(currentAmount: number) {
    this.currentAmount = currentAmount;
  }

  computeCoinValue(coin: Coin): number {
    switch (true) {
      case coin.equals(this.nickel):
        return 0.05;
      case coin.equals(this.dime):
        return 0.1;
      case coin.equals(this.quarter):
        return 0.25;
      default:
        return 0;
    }
  }

  addToCoinReturn(coin: Coin) {
    this.coinReturn.push(coin);
  }

  getCoinReturn(): Coin[] {
    return this.coinReturn;
  }
}

export default VendingMachine;
