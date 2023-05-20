const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xB50F471a5A7B28dEc5E3342E68bb49C51b0DA5E4";
const abi = [{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_age","type":"uint256"},{"internalType":"string","name":"_addressDetails","type":"string"}],"name":"setDetails","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const connectButton = document.getElementById("loginButton");
const uploadButton = document.getElementById("uploadButton");
const retrieveButton = document.getElementById("retrieveButton");

let userAddress;
let simpleStorageContract;

connectButton.onclick = async () => {
  // Request account access if needed
  await window.ethereum.enable();
  // Set userAddress
  userAddress = await web3.eth.getAccounts();
  userAddress = userAddress[0];
  console.log(`Connected with address: ${userAddress}`);
  document.getElementById("upload").style.display = 'block';
};

uploadButton.onclick = async () => {
  event.preventDefault(); // prevent page reload

  // Get input values
  const nameInput = document.getElementById("name").value;
  const ageInput = document.getElementById("age").value;
  const addressInput = document.getElementById("address").value;
  
  console.log(nameInput, ageInput, addressInput);

  // Upload data to contract
  simpleStorageContract = new web3.eth.Contract(abi, contractAddress);

  await simpleStorageContract.methods.setDetails(nameInput, ageInput, addressInput).send({ from: userAddress });
  console.log("Data uploaded to smart contract.");
  retrieveButton.style.display = 'block';
};

retrieveButton.onclick = async () => {
  // Get user details from contract
  const userDetails = await simpleStorageContract.methods.getDetails(userAddress).call();
  
  // Update HTML with user details
  document.getElementById("details").style.display = 'block';
  const nameOutput = document.getElementById("nameDisplay");
  const ageOutput = document.getElementById("ageDisplay");
  const addressOutput = document.getElementById("addressDisplay");
  nameOutput.textContent = `Name: ${userDetails[0]}`;
  ageOutput.textContent = `Age: ${userDetails[1]}`;
  addressOutput.textContent = `Address: ${userDetails[2]}`;
};
