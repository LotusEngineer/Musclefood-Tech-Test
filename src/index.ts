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

class Product {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

class VendingMachine {
  currentAmount: number;
  currentDisplay: string;
  selectedProductValue: number;
  coinReturn: Coin[];
  inventory: Map<string, Product>;

  constructor() {
    this.currentAmount = 0;
    this.coinReturn = [];
    this.currentDisplay = "INSERT_COIN";
    this.selectedProductValue = 0;
    this.inventory = new Map();
    this.inventory.set("candy", new Product("candy", 0.65));
    this.inventory.set("cola", new Product("cola", 1.0));
  }
  nickel: Coin = new Coin(5, 21.21, 1.95);
  dime: Coin = new Coin(2.268, 17.91, 1.35);
  quarter: Coin = new Coin(5.67, 24.26, 1.75);

  selectProduct(selection: string) {
    const product = this.inventory.get(selection);
    const amount = this.getCurrentAmount();
    if (product && product.value > amount) {
      this.setSelectedProductValue(product);
      this.setCurrentDisplay("PRICE_CHECK");
    } else if (product) {
      this.setCurrentDisplay("THANK_YOU");
    }
  }

  getSelectedProductValue(): number {
    return this.selectedProductValue;
  }

  setSelectedProductValue(selectedProduct: Product) {
    this.selectedProductValue = selectedProduct.value;
  }

  viewDisplay() {
    switch (this.getCurrentDisplay()) {
      case "THANK_YOU":
        this.setCurrentDisplay("INSERT_COIN");
        return "THANK YOU";
      case "INSERT_COIN":
        return "INSERT COIN";
      case "CURRENT_AMOUNT":
        return this.getCurrentAmount().toFixed(2);
      case "PRICE_CHECK":
        const nextDisplay =
          this.getCurrentAmount() > 0 ? "CURRENT_AMOUNT" : "INSERT_COIN";
        this.setCurrentDisplay(nextDisplay);
        return `PRICE ${this.getSelectedProductValue().toFixed(2)}`;
    }
  }
  setCurrentDisplay(newDisplay: string) {
    this.currentDisplay = newDisplay;
  }

  getCurrentDisplay(): string {
    return this.currentDisplay;
  }

  insertCoin(coin: Coin) {
    const value: number = this.computeCoinValue(coin);

    if (value < 0.05) {
      this.addToCoinReturn(coin);
    } else {
      this.setCurrentAmount(this.getCurrentAmount() + value);
      this.setCurrentDisplay("CURRENT_AMOUNT");
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
