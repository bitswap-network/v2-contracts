const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
	//await deployer.deploy(BonusToken);
	//const bonusToken = await BonusToken.deployed();
  
  //get the ropsten addr from uniswap
	const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  //pair address from uniswap
	const pairAddress = '0x38E12fDd8DC51e48830863151e1Afa7799e6fE97';
  //router fork address from local deployment
	const routerForkAddress = '0x4b6483AFA39458E3bdC70E055BEDdbb8c5d5D12c';
  //need a deployment of the forked pair address
	const pairForkAddress = '';

	await deployer.deploy(
 		LiquidityMigrator,
 		routerAddress,
    	pairAddress,
    	routerForkAddress,
    	pairForkAddress,
    	pairForkAddress,
  	);
  	
  	const liquidityMigrator = await LiquidityMigrator.deployed();
  	await bonusToken.setLiquidator(liquidityMigrator.address);
};