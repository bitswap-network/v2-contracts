pragma solidity =0.6.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BonusToken is ERC20 {
	address public admin;
	address public liquidator;
	constructor() ERC20('BonusToken', 'BTK') public{

	}

	function setLiquidator(address _liquidator) external {
		require(msg.sender == admin, 'admin only');
		liquidator = _liquidator;
	}

	function mint(address to, uint amount) external {
		require (msg.sender == liquidator, 'liquidator only');
		_mint(to, amount);
	}
}