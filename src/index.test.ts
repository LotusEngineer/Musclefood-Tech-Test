import VendingMachine, { Coin } from "./index";
describe("Vending Machine", () => {
  describe("Accept Coins", () => {
    describe("When no coin has been inserted", () => {
      it("should display INSERT COIN", () => {
        const subject = new VendingMachine();

        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });

    describe("When a nickel has been inserted", () => {
      const subject = new VendingMachine();

      it("should update the current amount and display amount", () => {
        //Weight (g), diameter(mm) & thickness(mm), referenced from US mint
        const nickel: Coin = new Coin(5, 21.21, 1.95);
        subject.insertCoin(nickel);
        expect(subject.viewDisplay()).toBe("0.05");
      });
    });
  });
});
