const UserDetails = artifacts.require("UserDetails");

module.exports = function (deployer) {
  deployer.deploy(UserDetails);
};