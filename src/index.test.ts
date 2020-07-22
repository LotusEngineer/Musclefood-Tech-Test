import VendingMachine, { Coin } from "./index";
describe("Vending Machine", () => {
  let subject: VendingMachine;
  //Weight (g), diameter(mm) & thickness(mm), referenced from US mint
  const nickel: Coin = new Coin(5, 21.21, 1.95);
  const dime: Coin = new Coin(2.268, 17.91, 1.35);
  const quarter: Coin = new Coin(5.67, 24.26, 1.75);
  const penny: Coin = new Coin(2.5, 19.05, 1.52);
  beforeEach(() => {
    subject = new VendingMachine();
  });
  describe("Accept Coins", () => {
    describe("When no coin has been inserted", () => {
      it("should display INSERT COIN", () => {
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });

    describe("When a nickel has been inserted", () => {
      it("should increase the current amount by 0.05 and display amount", () => {
        subject.insertCoin(nickel);
        expect(subject.viewDisplay()).toBe("0.05");
      });
    });

    describe("When a dime is inserted", () => {
      it("should increase the current amount by 0.10 and display the current value", () => {
        subject.insertCoin(dime);
        expect(subject.viewDisplay()).toBe("0.10");
      });
    });

    describe("When a quarter is inserted", () => {
      it("should increase the current amount by 0.25 and display the current value", () => {
        subject.insertCoin(quarter);
        expect(subject.viewDisplay()).toBe("0.25");
      });
    });

    describe("When multiple coins are inserted", () => {
      it("should add each to the total and display this", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(dime);
        subject.insertCoin(quarter);
        subject.insertCoin(nickel);
        expect(subject.viewDisplay()).toBe("0.65");
      });
    });

    describe("When invalid coins are inserted (pennies)", () => {
      it("should return them to the coin return", () => {
        subject.insertCoin(penny);
        expect(subject.getCoinReturn()).toEqual([penny]);
      });

      it("should display INSERT COIN", () => {
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });
  });

  describe("Select Product", () => {
    describe("When a customer selects candy with a balance of 0.65", () => {
      it("should dispense candy and display THANK YOU", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(dime);
        subject.insertCoin(nickel);
        subject.selectProduct("candy");
        expect(subject.viewDisplay()).toBe("THANK YOU");
      });

      it("should display INSERT COIN when viewing the display again after seeing THANK YOU", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(dime);
        subject.insertCoin(nickel);
        subject.selectProduct("candy");
        subject.viewDisplay();
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });

    describe("When a customer selects cola with a balance of 1.00", () => {
      it("should dispense cola and display THANK YOU", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("cola");
        expect(subject.viewDisplay()).toBe("THANK YOU");
      });
      it("should display INSERT COIN on second view of the display", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("cola");
        subject.viewDisplay();
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });

    describe("When a customer selects chips with a balance of 0.50", () => {
      it("should dispense chips and display THANK YOU", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(nickel);
        subject.insertCoin(dime);
        subject.selectProduct("chips");
        expect(subject.viewDisplay()).toBe("THANK YOU");
      });
      it("should display INSERT COIN on second view of the display", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");
        subject.viewDisplay();
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });
  });

  describe("When a customer selects a product without the any amount inserted", () => {
    it("should display price of the item", () => {
      subject.selectProduct("cola");
      expect(subject.viewDisplay()).toBe("PRICE 1.00");
    });

    it("should display INSERT COIN on second view of the display", () => {
      subject.selectProduct("cola");
      subject.viewDisplay();
      expect(subject.viewDisplay()).toBe("INSERT COIN");
    });
  });
  describe("When a customer selects a product with coins inserted but too low of an amount", () => {
    it("should display price of the item on first view of the display", () => {
      subject.insertCoin(quarter);
      subject.selectProduct("cola");
      expect(subject.viewDisplay()).toBe("PRICE 1.00");
    });
    it("should display current amount on second view of the display", () => {
      subject.insertCoin(quarter);
      subject.selectProduct("cola");
      subject.viewDisplay();
      expect(subject.viewDisplay()).toBe("0.25");
    });
  });

  describe("Make Change", () => {
    describe("When a customer attempts to purchase an item cheaper than the current amount they have inserted and change is available", () => {
      it("should return 2 quarters when paying for chips with 4 quarters", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");
        expect(subject.getCoinReturn()).toEqual([quarter, quarter]);
      });

      it("should return 5 dimes when paying for chips with 10 dimes", () => {
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.insertCoin(dime);
        subject.selectProduct("chips");
        expect(subject.getCoinReturn()).toEqual([dime, dime, dime, dime, dime]);
      });
    });
  });

  describe("Return Coins", () => {
    describe("When the return coin button is pressed", () => {
      it("should return any coins in the user inserted into the machine", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(dime);
        subject.returnCoins();
        expect(subject.getCoinReturn()).toEqual([quarter, dime]);
      });

      it("should display INSERT COIN", () => {
        subject.insertCoin(quarter);
        subject.returnCoins();
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });
  });

  describe("Sold Out", () => {
    describe("When a customer selects an out of stock item", () => {
      it("should update the display to show sold out", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");

        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");
        expect(subject.viewDisplay()).toBe("SOLD OUT");
      });

      it("should display INSERT COIN on second view if no funds inserted", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");

        subject.selectProduct("chips");
        subject.viewDisplay();
        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });

      it("should display INSERT COIN on second view if no funds inserted", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");

        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("chips");
        subject.viewDisplay();
        expect(subject.viewDisplay()).toBe("0.50");
      });
    });
  });

  describe("Exact Change only", () => {
    describe("When the machine is not able to make change with the coins in the machine", () => {
      it("should display EXACT CHANGE ONLY if change can not be made from inserted coins", () => {
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.insertCoin(quarter);
        subject.selectProduct("candy");
        expect(subject.viewDisplay()).toBe("EXACT CHANGE ONLY");
      });
    });
  });
});
