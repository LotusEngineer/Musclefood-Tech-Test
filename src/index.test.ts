import VendingMachine, { Coin } from "./index";
describe("Vending Machine", () => {
  let subject;
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
        //Weight (g), diameter(mm) & thickness(mm), referenced from US mint
        const nickel: Coin = new Coin(5, 21.21, 1.95);
        subject.insertCoin(nickel);
        expect(subject.viewDisplay()).toBe("0.05");
      });
    });

    describe("When a dime is inserted", () => {
      it("should increase the current amount by 0.10 and display the current value", () => {
        //Weight (g), diameter(mm) & thickness(mm), referenced from US mint
        const dime: Coin = new Coin(2.268, 17.91, 1.35);
        subject.insertCoin(dime);
        expect(subject.getDisplay()).toBe("0.10");
      });
    });
  });
});
