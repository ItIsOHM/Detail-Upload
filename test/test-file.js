const UserDetails = artifacts.require("UserDetails");
const { expectRevert } = require('@openzeppelin/test-helpers');


contract("UserDetails", accounts => {
  let instance;

  beforeEach(async () => {
    instance = await UserDetails.new();
  });

  it("should allow only one mapping per address", async () => {
    // Define the user details
    const name = "John Doe";
    const age = 30;
    const address = "123 Main St.";

    // Set the user details for the first time
    await instance.setDetails(name, age, address, { from: accounts[0] });

    // Attempt to set the user details again from the same address
    await expectRevert(
      instance.setDetails(name, age, address, { from: accounts[0] }),
      "Address already exists"
    );
  });
});
