import VendingMachine, { Coin } from "./index";
describe("Vending Machine", () => {
  let subject;
  //Weight (g), diameter(mm) & thickness(mm), referenced from US mint
  const nickel: Coin = new Coin(5, 21.21, 1.95);
  const dime: Coin = new Coin(2.268, 17.91, 1.35);
  const quarter: Coin = new Coin(5.67, 24.26, 1.75);
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
  });
});
