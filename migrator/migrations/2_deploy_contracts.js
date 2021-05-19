const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
	
  await deployer.deploy(BonusToken);
	const bonusToken = await BonusToken.deployed(account, minter);
  
  //get the kovan addr from uniswap
	const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  //pair address from uniswap
	const pairAddress = '0x9456ad8eed93c2a60c3bc534960cf2da00dfb157';
  //router fork address from local deployment
	const routerForkAddress = '0x4094E0A49b18a914a2e44a0967121D4789EAaeD4';
  //need a deployment of the forked pair address
	const pairForkAddress = '0x9456ad8eed93c2a60c3bc534960cf2da00dfb157';
  const bonusTokenAddress = "0x79983be9B685152176442fc4277c7a949dc110ab";

	await deployer.deploy(
 		LiquidityMigrator,
 		routerAddress,
    	pairAddress,
    	routerForkAddress,
    	pairForkAddress,
    	bonusTokenAddress,
  	);
  	
  	const liquidityMigrator = await LiquidityMigrator.deployed();
  	await bonusToken.setLiquidator(liquidityMigrator.address);
};