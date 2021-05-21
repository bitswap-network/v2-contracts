const Factory = artifacts.require("UniswapV2Factory.sol");
const UniswapV2Pair = artifacts.require("UniswapV2Pair.sol");
const wBCLT = artifacts.require("wBCLT.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory, addresses[0]);
  const factory = await Factory.deployed();

  let token1Address, token2Address;
  if (network === 'mainnet') {
  	token1address = '';
  	token2address = '';
  } else {
  	await deployer.deploy(Token1);
  	await deployer.deploy(Token2);
  	const token1 = await Token1.deployed();
  	const token2 = await Token2.deployed();
  	token1Address = token1.address;
  	token2Address = token2.address;
  }
  await factory.createPair(token1Address, token2Address);
};