describe("Vending Machine", () => {
  describe("Accept Coins", () => {
    describe("When no coin has been inserted", () => {
      it("should display INSERT COIN", () => {
        const subject = new VendingMachine();

        expect(subject.viewDisplay()).toBe("INSERT COIN");
      });
    });
  });
});
