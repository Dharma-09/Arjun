# Report


## Medium Issues
# this is sample report which is use for general purpose

| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | Centralization Risk for trusted owners | 3 | - |
| [M-2](#M-2) | Solady's SafeTransferLib does not check for token contract's existence | 4 | - |


Total: 7 instances over 2 issues

 ### <a name="M-1"></a>[M-1] Centralization Risk for trusted owners

#### Impact:
Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.


Instances of this issue:

```solidity
File: /test.sol

17: contract BranchPort is Ownable, IBranchPort {

122:     function initialize(address _coreBranchRouter, address _bridgeAgentFactory) external virtual onlyOwner {

135:     function renounceOwnership() public payable override onlyOwner {

```

 ### <a name="M-2"></a>[M-2] Solady's SafeTransferLib does not check for token contract's existence
There is a subtle difference between the implementation of solady’s SafeTransferLib and OZ’s SafeERC20: OZ’s SafeERC20 checks if the token is a contract or not, solady’s SafeTransferLib does not.
https://github.com/Vectorized/solady/blob/main/src/utils/SafeTransferLib.sol#L10 
`@dev Note that none of the functions in this library check that a token has code at all! That responsibility is delegated to the caller` 



Instances of this issue:

```solidity
File: /test.sol

160:         _token.safeTransfer(msg.sender, _amount);

233:         _underlyingAddress.safeTransfer(_recipient, _deposit);

526:             _localAddress.safeTransferFrom(_depositor, address(this), _hTokenAmount);

532:             _underlyingAddress.safeTransferFrom(_depositor, address(this), _deposit);

```

## Low Issues


| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) | Consider bounding input array length | 2 | - |
| [L-2](#L-2) | Initializers could be front-run | 1 | - |
| [L-3](#L-3) | Loss of precision on division | 8 | - |
| [L-4](#L-4) | Array lacks use of the pop function | 6 | - |


Total: 17 instances over 4 issues

 ### <a name="L-1"></a>[L-1] Consider bounding input array length
The functions below take in an unbounded array, and make function calls for entries in the array. While the function will revert if it eventually runs out of gas, it may be a nicer user experience to require() that the length of the array is below some reasonable maximum, so that the user doesn't have to use up a full transaction's gas only to see that the transaction reverts.


Instances of this issue:

```solidity
File: /test.sol

257:         for (uint256 i = 0; i < length;) {

305:         for (uint256 i = 0; i < length;) {

```

 ### <a name="L-2"></a>[L-2] Initializers could be front-run
Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment


Instances of this issue:

```solidity
File: /test.sol

122:     function initialize(address _coreBranchRouter, address _bridgeAgentFactory) external virtual onlyOwner {

```

 ### <a name="L-3"></a>[L-3] Loss of precision on division
Solidity doesn't support fractions, so division by large numbers could result in the quotient being zero 
 To avoid this, it's recommended to require a minimum numerator amount to ensure that it is always greater than the denominator.

<details>
<summary>There are 8 instances of this issue:</summary>

---

```solidity
File: /test.sol

5: import {Ownable} from "solady/auth/Ownable.sol";

6: import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

8: import {ERC20} from "solmate/tokens/ERC20.sol";

10: import {IPortStrategy} from "./interfaces/IPortStrategy.sol";

11: import {IBranchPort} from "./interfaces/IBranchPort.sol";

13: import {ERC20hTokenBranch} from "./token/ERC20hTokenBranch.sol";

473:         return ((_currBalance + _strategyTokenDebt) * getMinimumTokenReserveRatio[_token]) / DIVISIONER;

490:                 lastManaged[msg.sender][_token] = (block.timestamp / 1 days) * 1 days;

```

</details>


 ### <a name="L-4"></a>[L-4] Array lacks use of the pop function
There are some arrays that can grow indefinitely in size, as they never shrink: this can lead to inefficient memory management and increase the likelihood of out-of-gas errors.


Instances of this issue:

```solidity
File: /test.sol

131:         bridgeAgentFactories.push(_bridgeAgentFactory);

323:         bridgeAgents.push(_bridgeAgent);

342:         bridgeAgentFactories.push(_newBridgeAgentFactory);

367:         strategyTokens.push(_token);

388:         portStrategies.push(_portStrategy);

421:         bridgeAgents.push(_coreBranchBridgeAgent);

```

## Non Critical Issues


| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Complex math should be split into multiple steps | 1 | - |
| [NC-2](#NC-2) | Contract functions should use an interface | 18 | - |
| [NC-3](#NC-3) | Use a single file for system wide constants | 2 | - |
| [NC-4](#NC-4) | Array is push()ed but not pop()ed | 6 | - |
| [NC-5](#NC-5) | Use Custom Errors | 9 | - |
| [NC-6](#NC-6) | Duplicated `require()/revert()` checks chould be refactored to a modifier Or function to save gas | 1 | - |
| [NC-7](#NC-7) | Don't initialize variables with default value | 2 | - |
| [NC-8](#NC-8) | Inconsistent method of specifying a floating pragma | 1 | - |


Total: 40 instances over 8 issues

 ### <a name="NC-1"></a>[NC-1] Complex math should be split into multiple steps
Consider splitting long arithmetic calculations into multiple steps to improve the code readability.


Instances of this issue:

```solidity
File: /test.sol

490:                 lastManaged[msg.sender][_token] = (block.timestamp / 1 days) * 1 days;

```

 ### <a name="NC-2"></a>[NC-2] Contract functions should use an interface
All external/public functions should extend an interface. This is useful to make sure that the whole API is extracted.

<details>
<summary>There are 18 instances of this issue:</summary>

---

```solidity
File: /test.sol

122:     function initialize(address _coreBranchRouter, address _bridgeAgentFactory) external virtual onlyOwner {

135:     function renounceOwnership() public payable override onlyOwner {

144:     function manage(address _token, uint256 _amount) external override requiresPortStrategy(_token) {

167:     function replenishReserves(address _token, uint256 _amount) external override lock {

188:     function replenishReserves(address _strategy, address _token) external override lock {

226:     function withdraw(address _recipient, address _underlyingAddress, uint256 _deposit)

237:     function bridgeIn(address _recipient, address _localAddress, uint256 _amount)

319:     function addBridgeAgent(address _bridgeAgent) external override requiresBridgeAgentFactory {

331:     function setCoreRouter(address _newCoreRouter) external override requiresCoreRouter {

338:     function addBridgeAgentFactory(address _newBridgeAgentFactory) external override requiresCoreRouter {

348:     function toggleBridgeAgentFactory(address _newBridgeAgentFactory) external override requiresCoreRouter {

355:     function toggleBridgeAgent(address _bridgeAgent) external override requiresCoreRouter {

362:     function addStrategyToken(address _token, uint256 _minimumReservesRatio) external override requiresCoreRouter {

375:     function toggleStrategyToken(address _token) external override requiresCoreRouter {

382:     function addPortStrategy(address _portStrategy, address _token, uint256 _dailyManagementLimit)

396:     function togglePortStrategy(address _portStrategy, address _token) external override requiresCoreRouter {

403:     function updatePortStrategy(address _portStrategy, address _token, uint256 _dailyManagementLimit)

414:     function setCoreBranchRouter(address _coreBranchRouter, address _coreBranchBridgeAgent)

```

</details>


 ### <a name="NC-3"></a>[NC-3] Use a single file for system wide constants
Consider grouping all the system constants under a single file. This finding shows only the first constant for each file, for brevity.


Instances of this issue:

```solidity
File: /test.sol

97:     uint256 internal constant DIVISIONER = 1e4;

98:     uint256 internal constant MIN_RESERVE_RATIO = 3e3;

```

 ### <a name="NC-4"></a>[NC-4] Array is push()ed but not pop()ed
Array entries are added but are never removed. Consider whether this should be the case, or whether there should be a maximum, or whether old entries should be removed. Cases where there are specific potential problems will be flagged separately under a different issue.


Instances of this issue:

```solidity
File: /test.sol

131:         bridgeAgentFactories.push(_bridgeAgentFactory);

323:         bridgeAgents.push(_bridgeAgent);

342:         bridgeAgentFactories.push(_newBridgeAgentFactory);

367:         strategyTokens.push(_token);

388:         portStrategies.push(_portStrategy);

421:         bridgeAgents.push(_coreBranchBridgeAgent);

```

 ### <a name="NC-5"></a>[NC-5] Use Custom Errors
Custom errors are available from solidity version 0.8.4. Custom errors are more easily processed in try-catch blocks, and are easier to re-use and maintain.

<details>
<summary>There are 9 instances of this issue:</summary>

---

```solidity
File: /test.sol

109:         require(_owner != address(0), "Owner is zero address");

123:         require(coreBranchRouterAddress == address(0), "Contract already initialized");

124:         require(!isBridgeAgentFactory[_bridgeAgentFactory], "Contract already initialized");

126:         require(_coreBranchRouter != address(0), "CoreBranchRouter is zero address");

127:         require(_bridgeAgentFactory != address(0), "BridgeAgentFactory is zero address");

136:         revert("Cannot renounce ownership");

181:         require(ERC20(_token).balanceOf(address(this)) - currBalance == _amount, "Port Strategy Withdraw Failed");

332:         require(coreBranchRouterAddress != address(0), "CoreRouter address is zero");

333:         require(_newCoreRouter != address(0), "New CoreRouter address is zero");

```

</details>


 ### <a name="NC-6"></a>[NC-6] Duplicated `require()/revert()` checks chould be refactored to a modifier Or function to save gas


Instances of this issue:

```solidity
File: /test.sol

149:         if (_amount > _excessReserves(_strategyTokenDebt, _token)) revert InsufficientReserves();

```

 ### <a name="NC-7"></a>[NC-7] Don't initialize variables with default value
It's not necessary to initialize a variable with its default value, and it's actually worse in gas terms as it adds an overhead.


Instances of this issue:

```solidity
File: /test.sol

257:         for (uint256 i = 0; i < length;) {

305:         for (uint256 i = 0; i < length;) {

```

 ### <a name="NC-8"></a>[NC-8] Inconsistent method of specifying a floating pragma
Some files use >=, while others use ^. The instances below are examples of the method that has the fewest instances for a specific version.


Instances of this issue:

```solidity
File: /test.sol

3: pragma solidity ^0.8.0;

```

## Gas Optimizations


| |Issue|Instances|Total Gas Savings|
|-|:-|:-:|:-:|
| [GAS-1](#GAS-1) | Use assembly to emit events | 12 | 456 |
| [GAS-2](#GAS-2) | Use uint256(1)/uint256(2) instead for true and false boolean states | 4 | 68400 |
| [GAS-3](#GAS-3) | For Operations that will not overflow, you could use unchecked | 5 | 425 |
| [GAS-4](#GAS-4) | Use Custom Errors | 9 | 144 |
| [GAS-5](#GAS-5) | >=/ <= costs less gas than >/< | 6 | 18 |
| [GAS-6](#GAS-6) | Use hardcode address instead of address(this)  | 9 |  |
| [GAS-7](#GAS-7) | Don't initialize variables with default value | 2 |  |
| [GAS-8](#GAS-8) | Long revert strings | 1 | 18 |
| [GAS-9](#GAS-9) | Constructors can be marked payable | 1 | 21 |
| [GAS-10](#GAS-10) | Functions guaranteed to revert when called by normal users can be marked `payable` | 1 | 21 |
| [GAS-11](#GAS-11) | `++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too) | 1 | 5 |
| [GAS-12](#GAS-12) | `++i/i++` should be `unchecked{++i}/unchecked{i++}` when it is not possible for them to overflow, as is the case when used in forand whileloops | 1 | 60 |
| [GAS-13](#GAS-13) | Use != 0 instead of > 0 for unsigned integer comparison | 4 | 24 |


### Total Gas Savings for GAS Issues: 69592 gas



Total: 56 instances over 13 issues

 ### <a name="GAS-1"></a>[GAS-1] Use assembly to emit events
We can use assembly to emit events efficiently by utilizing `scratch space` and the `free memory pointer`. This will allow us to potentially avoid memory expansion costs. Note: In order to do this optimization safely, we will need to cache and restore the free memory pointer.

<details>
<summary>There are 12 instances of this issue:</summary>

---

```solidity
File: /test.sol

163:         emit DebtCreated(msg.sender, _token, _amount);

184:         emit DebtRepaid(msg.sender, _token, _amount);

218:         emit DebtRepaid(_strategy, _token, amountToWithdraw);

344:         emit BridgeAgentFactoryAdded(_newBridgeAgentFactory);

351:         emit BridgeAgentFactoryToggled(_newBridgeAgentFactory);

358:         emit BridgeAgentToggled(_bridgeAgent);

371:         emit StrategyTokenAdded(_token, _minimumReservesRatio);

378:         emit StrategyTokenToggled(_token);

392:         emit PortStrategyAdded(_portStrategy, _token, _dailyManagementLimit);

399:         emit PortStrategyToggled(_portStrategy, _token);

410:         emit PortStrategyUpdated(_portStrategy, _token, _dailyManagementLimit);

423:         emit CoreBranchSet(_coreBranchRouter, _coreBranchBridgeAgent);

```

</details>


 ### <a name="GAS-2"></a>[GAS-2] Use uint256(1)/uint256(2) instead for true and false boolean states
Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).


Instances of this issue:

```solidity
File: /test.sol

32:     mapping(address bridgeAgent => bool isActiveBridgeAgent) public isBridgeAgent;

42:     mapping(address bridgeAgentFactory => bool isActiveBridgeAgentFactory) public isBridgeAgentFactory;

52:     mapping(address token => bool allowsStrategies) public isStrategyToken;

68:     mapping(address strategy => mapping(address token => bool isActiveStrategy)) public isPortStrategy;

```

 ### <a name="GAS-3"></a>[GAS-3] For Operations that will not overflow, you could use unchecked


Instances of this issue:

```solidity
File: /test.sol

13: import {ERC20hTokenBranch} from "./token/ERC20hTokenBranch.sol";

136:         revert("Cannot renounce ownership");

181:         require(ERC20(_token).balanceOf(address(this)) - currBalance == _amount, "Port Strategy Withdraw Failed");

214:             ERC20(_token).balanceOf(address(this)) - currBalance == amountToWithdraw, "Port Strategy Withdraw Failed"

333:         require(_newCoreRouter != address(0), "New CoreRouter address is zero");

```

 ### <a name="GAS-4"></a>[GAS-4] Use Custom Errors
[Source](https://blog.soliditylang.org/2021/04/21/custom-errors/)
Instead of using error strings, to reduce deployment and runtime cost, you should use Custom Errors. This would save both deployment and runtime cost.

<details>
<summary>There are 9 instances of this issue:</summary>

---

```solidity
File: /test.sol

109:         require(_owner != address(0), "Owner is zero address");

123:         require(coreBranchRouterAddress == address(0), "Contract already initialized");

124:         require(!isBridgeAgentFactory[_bridgeAgentFactory], "Contract already initialized");

126:         require(_coreBranchRouter != address(0), "CoreBranchRouter is zero address");

127:         require(_bridgeAgentFactory != address(0), "BridgeAgentFactory is zero address");

136:         revert("Cannot renounce ownership");

181:         require(ERC20(_token).balanceOf(address(this)) - currBalance == _amount, "Port Strategy Withdraw Failed");

332:         require(coreBranchRouterAddress != address(0), "CoreRouter address is zero");

333:         require(_newCoreRouter != address(0), "New CoreRouter address is zero");

```

</details>


 ### <a name="GAS-5"></a>[GAS-5] >=/ <= costs less gas than >/<
The compiler uses opcodes GT and ISZERO for solidity code that uses >, but only requires LT for >=,which saves 3 gas


Instances of this issue:

```solidity
File: /test.sol

149:         if (_amount > _excessReserves(_strategyTokenDebt, _token)) revert InsufficientReserves();

299:         if (length > 255) revert InvalidInputArrays();

363:         if (_minimumReservesRatio >= DIVISIONER || _minimumReservesRatio < MIN_RESERVE_RATIO) {

440:             return currBalance > minReserves ? currBalance - minReserves : 0;

525:         if (_hTokenAmount > 0) {

531:         if (_deposit > 0) {

```

 ### <a name="GAS-6"></a>[GAS-6] Use hardcode address instead of address(this) 
Instead of using address(this), it is more gas-efficient to pre-calculate and use the hardcoded address. Foundry’s script.sol and solmate’s LibRlp.sol contracts can help achieve this. References: https://book.getfoundry.sh/reference/forge-std/compute-create-address

<details>
<summary>There are 9 instances of this issue:</summary>

---

```solidity
File: /test.sol

175:         uint256 currBalance = ERC20(_token).balanceOf(address(this));

178:         IPortStrategy(msg.sender).withdraw(address(this), _token, _amount);

181:         require(ERC20(_token).balanceOf(address(this)) - currBalance == _amount, "Port Strategy Withdraw Failed");

193:         uint256 currBalance = ERC20(_token).balanceOf(address(this));

210:         IPortStrategy(_strategy).withdraw(address(this), _token, amountToWithdraw);

214:             ERC20(_token).balanceOf(address(this)) - currBalance == amountToWithdraw, "Port Strategy Withdraw Failed"

436:         uint256 currBalance = ERC20(_token).balanceOf(address(this));

526:             _localAddress.safeTransferFrom(_depositor, address(this), _hTokenAmount);

532:             _underlyingAddress.safeTransferFrom(_depositor, address(this), _deposit);

```

</details>


 ### <a name="GAS-7"></a>[GAS-7] Don't initialize variables with default value


Instances of this issue:

```solidity
File: /test.sol

257:         for (uint256 i = 0; i < length;) {

305:         for (uint256 i = 0; i < length;) {

```

 ### <a name="GAS-8"></a>[GAS-8] Long revert strings


Instances of this issue:

```solidity
File: /test.sol

127:         require(_bridgeAgentFactory != address(0), "BridgeAgentFactory is zero address");

```

 ### <a name="GAS-9"></a>[GAS-9] Constructors can be marked payable
 Payable functions cost less gas to execute, since the compiler does not have to add extra checks to ensure that a payment was not provided. A constructor can safely be marked as payable, since only the deployer would be able to pass funds, and the project itself would not pass any funds.


Instances of this issue:

```solidity
File: /test.sol

108:     constructor(address _owner) {

```

 ### <a name="GAS-10"></a>[GAS-10] Functions guaranteed to revert when called by normal users can be marked `payable`
If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.


Instances of this issue:

```solidity
File: /test.sol

122:     function initialize(address _coreBranchRouter, address _bridgeAgentFactory) external virtual onlyOwner {

```

 ### <a name="GAS-11"></a>[GAS-11] `++i` costs less gas than `i++`, especially when it's used in `for`-loops (`--i`/`i--` too)
*Saves 5 gas per loop*


Instances of this issue:

```solidity
File: /test.sol

309:                 i++;

```

 ### <a name="GAS-12"></a>[GAS-12] `++i/i++` should be `unchecked{++i}/unchecked{i++}` when it is not possible for them to overflow, as is the case when used in forand whileloops
The unchecked keyword is new in solidity version 0.8.0, so this only applies to that version or higher, which these instances are. This saves 30-40 gas per loop


Instances of this issue:

```solidity
File: /test.sol

309:                 i++;

```

 ### <a name="GAS-13"></a>[GAS-13] Use != 0 instead of > 0 for unsigned integer comparison


Instances of this issue:

```solidity
File: /test.sol

259:             if (_amounts[i] - _deposits[i] > 0) {

266:             if (_deposits[i] > 0) {

525:         if (_hTokenAmount > 0) {

531:         if (_deposit > 0) {

```
