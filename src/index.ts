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

export class Product {
  name: string;
  value: number;
  quantity: number;

  constructor(name: string, value: number, quantity: number) {
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }

  setQuantity(newQuantity: number) {
    this.quantity = newQuantity;
  }
}

class VendingMachine {
  currentAmount: number;
  currentCoins: Coin[];
  currentDisplay: string;
  selectedProductValue: number;
  coinReturn: Coin[];
  inventory: Map<string, Product>;
  dispenser: Product[];

  constructor() {
    this.currentAmount = 0;
    this.currentCoins = [];
    this.coinReturn = [];
    this.currentDisplay = "INSERT_COIN";
    this.selectedProductValue = 0;
    this.inventory = new Map();
    this.inventory.set("candy", new Product("candy", 0.65, 5));
    this.inventory.set("cola", new Product("cola", 1.0, 3));
    this.inventory.set("chips", new Product("chips", 0.5, 1));
    this.dispenser = [];
  }
  nickel: Coin = new Coin(5, 21.21, 1.95);
  dime: Coin = new Coin(2.268, 17.91, 1.35);
  quarter: Coin = new Coin(5.67, 24.26, 1.75);

  selectProduct(selection: string) {
    const product = this.inventory.get(selection);
    const amount: number = this.getCurrentAmount();
    if (product && product.quantity === 0) {
      this.setCurrentDisplay("SOLD_OUT");
    } else if (product && product.value > amount) {
      this.setSelectedProductValue(product);
      this.setCurrentDisplay("PRICE_CHECK");
    } else if (product && this.getCurrentAmount() > product.value) {
      const changeAmount: number = this.getCurrentAmount() - product.value;
      const change: Coin[] = this.calculateChange(changeAmount);
      if (change.length > 0) {
        product.setQuantity(product.quantity - 1);
        this.addChangeToCoinReturn(change);
        this.setCurrentAmount(0);
        this.clearCurrentCoins();
        this.addToDispenser(product);
        this.setCurrentDisplay("THANK_YOU");
      } else {
        this.setCurrentDisplay("EXACT_CHANGE");
      }
    } else if (product) {
      product.setQuantity(product.quantity - 1);
      this.setCurrentAmount(0);
      this.clearCurrentCoins();
      this.addToDispenser(product);
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
    const nextDisplay: string =
      this.getCurrentAmount() > 0 ? "CURRENT_AMOUNT" : "INSERT_COIN";
    switch (this.getCurrentDisplay()) {
      case "THANK_YOU":
        this.setCurrentDisplay("INSERT_COIN");
        return "THANK YOU";
      case "INSERT_COIN":
        return "INSERT COIN";
      case "SOLD_OUT":
        this.setCurrentDisplay(nextDisplay);
        return "SOLD OUT";
      case "CURRENT_AMOUNT":
        return this.getCurrentAmount().toFixed(2);
      case "EXACT_CHANGE":
        return "EXACT CHANGE ONLY";
      case "PRICE_CHECK":
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
      this.addToCurrentCoins(coin);
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

  calculateChange(amount: number) {
    let change: Coin[] = [];
    while (amount > 0) {
      if (
        amount >= this.computeCoinValue(this.quarter) &&
        this.currentCoins.some((coin) => coin.equals(this.quarter))
      ) {
        change.push(this.quarter);
        amount = amount - this.computeCoinValue(this.quarter);
        continue;
      } else if (
        amount >= this.computeCoinValue(this.dime) &&
        this.currentCoins.some((coin) => coin.equals(this.dime))
      ) {
        change.push(this.dime);
        amount = amount - this.computeCoinValue(this.dime);
        continue;
      } else if (
        amount >= this.computeCoinValue(this.nickel) &&
        this.currentCoins.some((coin) => coin.equals(this.nickel))
      ) {
        change.push(this.nickel);
        amount = amount - this.computeCoinValue(this.nickel);
        continue;
      } else {
        return change;
      }
    }
    return change;
  }

  addToCoinReturn(coin: Coin) {
    this.coinReturn.push(coin);
  }

  addChangeToCoinReturn(change: Coin[]) {
    this.coinReturn.push(...change);
  }

  getCoinReturn(): Coin[] {
    return this.coinReturn;
  }

  returnCoins() {
    this.addChangeToCoinReturn(this.currentCoins);
    this.clearCurrentCoins();
    this.setCurrentDisplay("INSERT_COIN");
  }

  addToCurrentCoins(coin: Coin) {
    this.currentCoins.push(coin);
  }

  clearCurrentCoins() {
    this.currentCoins = [];
  }

  addToDispenser(product: Product) {
    this.dispenser.push(product);
  }

  getDispenser(): Product[] {
    return this.dispenser;
  }
}

export default VendingMachine;
