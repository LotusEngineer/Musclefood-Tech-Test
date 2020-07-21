import VendingMachine, { Coin } from "./index";
describe("Vending Machine", () => {
  let subject;
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
    });
  });
});
