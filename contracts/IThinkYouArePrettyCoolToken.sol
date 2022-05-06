// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract IThinkYouArePrettyCoolToken is IERC20, IERC20Metadata {

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply = 100000000000;

    string private _name = "I think you are pretty cool, The Token";
    string private _symbol = "YouAreCool";
    uint8 private _decimals = 0;

    address private _mainOwner;

    /**
        A very dumb contract that allows me to set my wallet up as the primary owner of all the tokens.
        It allows me to give them to any individuals I like, and they are not tradable.
        However, if the owner wants them to be removed, they can safely be returned.
    */
    constructor(address mainOwner) {
        console.log("Deploying IThinkYouArePrettyCoolToken with owner", mainOwner);
        _mainOwner = mainOwner; //msg.sender
        _balances[_mainOwner] = _totalSupply;
    }

    function name() external view override returns (string memory) { return _name; }
    function symbol() external view override returns (string memory) { return _symbol; }
    function decimals() external view override returns (uint8) { return _decimals; }
    function totalSupply() external view override returns (uint256) { return _totalSupply; }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }


    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `sender` to `recipient`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` or `to` must be the contract owner.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from == _mainOwner || to == _mainOwner, "To / From owner only.");
        require(from != address(0) && to != address(0), "No zero address");
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Balance Exceeded");

        console.log("Transfer: Balances from before", from, _balances[from]);
        console.log("Transfer: Balances to before", to, _balances[to]);

        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        console.log("Transfer: Balances from after", from, _balances[from]);
        console.log("Transfer: Balances to after", to, _balances[to]);

        emit Transfer(from, to, amount);
    }

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     *
     * ALWAYS RETURNS 0
     */
    function allowance(address /*owner*/, address /*spender*/) external pure override returns (uint256) { return 0; }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event. (if normal)
     *
     * ALWAYS RETURNS FALSE
     */
    function approve(address /*spender*/, uint256 /*amount*/) external pure override returns (bool) { return false; }

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event. (if normal)
     *
     * ALLOWANCE MECHANISM DISABLED, ALWAYS RETURNS FALSE
     */
    function transferFrom(
        address /*from*/,
        address /*to*/,
        uint256 /*amount*/
    ) external pure override returns (bool) {
        return false;
    }
}
