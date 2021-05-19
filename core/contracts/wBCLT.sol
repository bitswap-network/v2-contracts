pragma solidity >=0.6.0 <0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/token/ERC20/ERC20Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/math/SafeMath.sol";

contract BITS is ERC20 {
    
    using SafeMath for uint256;
    
    address owner;
    uint256 _totalSupply;
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    
    modifier onlyOwner {
        require(msg.sender == owner, "unauthorized");
        _;
    }

    constructor() public ERC20("Wrapped BitClout", "wBCLT") {
        _mint(msg.sender, 1000 ether);
    }
    
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public onlyOwner {
        uint256 decreasedAllowance = allowance(account, _msgSender()).sub(amount, "ERC20: burn amount exceeds allowance");
        _approve(account, _msgSender(), decreasedAllowance);
        _burn(account, amount);
    }
    
    function mintmore(uint256 amount) public {
        _totalSupply = _totalSupply.add(amount);
        _mint(msg.sender, amount);
    }
}