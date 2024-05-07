# Report


## Gas Optimizations


| |Issue|Instances|Total Gas Savings|
|-|:-|:-:|:-:|
| [GAS-1](#GAS-1) | `abi.encode` is more efficient than `abi.encodePacked` | 11 |
| [GAS-2](#GAS-2) | With assembly, .call (bool success) transfer can be done gas-optimized | 5 |
| [GAS-3](#GAS-3) | Use assembly to emit events | 71 |
| [GAS-4](#GAS-4) | Use assembly for small keccak256 hashes, in order to save gas | 18 |
| [GAS-5](#GAS-5) | Use uint256(1)/uint256(2) instead for true and false boolean states | 8 |
| [GAS-6](#GAS-6) | <array>.length should not be looked up in every loop of a for-loop | 11 |
| [GAS-7](#GAS-7) | For Operations that will not overflow, you could use unchecked | 77 |
| [GAS-8](#GAS-8) | Don't compare boolean expressions to boolean literals | 1 |

| [GAS-10](#GAS-10) | Multiplication/division by two should use bit shifting | 27 |
| [GAS-11](#GAS-11) | >=/ <= costs less gas than >/< | 70 |
| [GAS-12](#GAS-12) | Use hardcode address instead of address(this)  | 18 |
| [GAS-13](#GAS-13) | Don't initialize variables with default value | 35 |
| [GAS-14](#GAS-14) | Long revert strings | 63 |
| [GAS-15](#GAS-15) | Constructors can be marked payable | 17 |


| [GAS-19](#GAS-19) | Use shift Right/Left instead of division/multiplication if possible | 3 |

| [GAS-22](#GAS-22) | Using this to access functions results in an external call, wasting gas | 1 |
| [GAS-23](#GAS-23) | `++i/i++` should be `unchecked{++i}/unchecked{i++}` when it is not possible for them to overflow, as is the case when used in forand whileloops | 7 |
| [GAS-24](#GAS-24) | Use != 0 instead of > 0 for unsigned integer comparison | 25 |


### Total Gas Savings for GAS Issues: 200868 gas



Total: 942 instances over 24 issues

 ### <a name="GAS-1"></a>[GAS-1] `abi.encode` is more efficient than `abi.encodePacked`
`abi.encode` uses less gas than `abi.encodePacked`: the gas saved depends on the number of arguments, with an average of ~90 per argument. Test available here.

<details>
<summary>There are 11 instances of this issue:</summary>

---

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

461:                     abi.encodePacked(

517:             abi.encodePacked(

528:             abi.encodePacked(

548:             abi.encodePacked(

610:         bytes memory precompileInput = abi.encodePacked(_versionedHash, _openingPoint, _openingValueCommitmentProof);

655:                 abi.encodePacked(blobVersionedHash, _pubdataCommitments[i:i + PUBDATA_COMMITMENT_COMMITMENT_OFFSET])

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

113:             abi.encodePacked(_log.l2ShardId, _log.isService, _log.txNumberInBatch, _log.sender, _log.key, _log.value)

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

96:             abi.encodePacked(

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

234:         return keccak256(abi.encodePacked(uint32(_blockNumber)));

```

```solidity
File: /system-contracts/contracts/libraries/TransactionHelper.sol

133:                 keccak256(abi.encodePacked(_transaction.factoryDeps)),

142:         return keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));

```
[[461]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L461)
,[[517]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L517)
,[[528]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L528)
,[[548]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L548)
,[[610]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L610)
,[[655]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L655)
,[[113]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L113)
,[[96]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L96)
,[[234]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L234)
,[[133]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L133)
,[[142]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L142)
,
</details>


 ### <a name="GAS-2"></a>[GAS-2] With assembly, .call (bool success) transfer can be done gas-optimized
When using assembly language, it is possible to call the transfer function of an Ethereum contract in a gas-optimized way by using the .call function with specific input parameters. The .call function takes a number of input parameters, including the address of the contract to call, the amount of Ether to transfer, and a specification of the gas limit for the call. By specifying a lower gas limit than the default, it is possible to reduce the gas cost of the transfer.


Instances of this issue:

```solidity
File: /governance/Governance.sol

174:         _execute(_operation.calls);

193:         _execute(_operation.calls);

226:             (bool success, bytes memory returnData) = _calls[i].target.call{value: _calls[i].value}(_calls[i].data);

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

231:             _deployment.callConstructor

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractHelper.sol

285:         meta.callerShardId = getCallerShardIdFromMeta(metaPacked);

```
[[174]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L174)
,[[193]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L193)
,[[226]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L226)
,[[231]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L231)
,[[285]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractHelper.sol#L285)
,
 ### <a name="GAS-3"></a>[GAS-3] Use assembly to emit events
We can use assembly to emit events efficiently by utilizing `scratch space` and the `free memory pointer`. This will allow us to potentially avoid memory expansion costs. Note: In order to do this optimization safely, we will need to cache and restore the free memory pointer.

<details>
<summary>There are 71 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

155:         emit DepositInitiated(l2TxHash, msg.sender, _l2Receiver, _l1Token, _amount);

199:         emit ClaimedFailedDeposit(_depositSender, _l1Token, amount);

225:         emit WithdrawalFinalized(l1Receiver, l1Token, amount);

```

```solidity
File: /bridge/L1SharedBridge.sol

168:         emit BridgehubDepositBaseTokenInitiated(_chainId, _prevMsgSender, _l1Token, _amount);

227:         emit BridgehubDepositInitiated(_chainId, txDataHash, _prevMsgSender, _l2Receiver, _l1Token, amount);

239:         emit BridgehubDepositFinalized(_chainId, _txDataHash, _txHash);

367:         emit ClaimedFailedDepositSharedBridge(_chainId, _depositSender, _l1Token, _amount);

454:         emit WithdrawalFinalizedSharedBridge(_chainId, l1Receiver, l1Token, amount);

602:         emit LegacyDepositInitiated(ERA_CHAIN_ID, l2TxHash, _prevMsgSender, _l2Receiver, _l1Token, _amount);

```

```solidity
File: /bridgehub/Bridgehub.sol

56:         emit NewPendingAdmin(oldPendingAdmin, _newPendingAdmin);

68:         emit NewPendingAdmin(currentPendingAdmin, address(0));

69:         emit NewAdmin(previousAdmin, pendingAdmin);

145:         emit NewChain(_chainId, _stateTransitionManager, _admin);

```

```solidity
File: /governance/Governance.sol

47:         emit ChangeSecurityCouncil(address(0), _securityCouncil);

50:         emit ChangeMinDelay(0, _minDelay);

132:         emit TransparentOperationScheduled(id, _delay, _operation);

144:         emit ShadowOperationScheduled(_id, _delay);

157:         emit OperationCancelled(_id);

180:         emit OperationExecuted(id);

199:         emit OperationExecuted(id);

250:         emit ChangeMinDelay(minDelay, _newDelay);

257:         emit ChangeSecurityCouncil(securityCouncil, _newSecurityCouncil);

```

```solidity
File: /state-transition/StateTransitionManager.sol

115:         emit NewPendingAdmin(oldPendingAdmin, _newPendingAdmin);

127:         emit NewPendingAdmin(currentPendingAdmin, address(0));

128:         emit NewAdmin(previousAdmin, pendingAdmin);

227:         emit SetChainIdUpgrade(_chainContract, l2ProtocolUpgradeTx, protocolVersion);

235:         emit StateTransitionNewChain(_chainId, _stateTransitionContract);

287:         emit StateTransitionNewChain(_chainId, stateTransitionAddress);

```

```solidity
File: /state-transition/ValidatorTimelock.sol

83:         emit ValidatorAdded(_chainId, _newValidator);

92:         emit ValidatorRemoved(_chainId, _validator);

98:         emit NewExecutionDelay(_executionDelay);

```

```solidity
File: /state-transition/chain-deps/facets/Admin.sol

28:         emit NewPendingAdmin(oldPendingAdmin, _newPendingAdmin);

40:         emit NewPendingAdmin(pendingAdmin, address(0));

41:         emit NewAdmin(previousAdmin, pendingAdmin);

47:         emit ValidatorStatusUpdate(_validator, _active);

54:         emit IsPorterAvailableStatusUpdate(_zkPorterIsAvailable);

63:         emit NewPriorityTxMaxGasLimit(oldPriorityTxMaxGasLimit, _newPriorityTxMaxGasLimit);

75:         emit NewFeeParams(oldFeeParams, _newFeeParams);

86:         emit NewBaseTokenMultiplier(oldNominator, oldDenominator, _nominator, _denominator);

92:         emit ValidiumModeStatusUpdate(_validiumMode);

115:         emit ExecuteUpgrade(_diamondCut);

125:         emit ExecuteUpgrade(_diamondCut);

139:         emit Freeze();

149:         emit Unfreeze();

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

135:         bytes memory emittedL2Logs = _newBatch.systemLogs;

142:         for (uint256 i = 0; i < emittedL2Logs.length; i = i.uncheckedAdd(L2_TO_L1_LOG_SERIALIZE_SIZE)) {

144:             (address logSender, ) = UnsafeBytes.readAddress(emittedL2Logs, i + L2_LOG_ADDRESS_OFFSET);

145:             (uint256 logKey, ) = UnsafeBytes.readUint256(emittedL2Logs, i + L2_LOG_KEY_OFFSET);

146:             (bytes32 logValue, ) = UnsafeBytes.readBytes32(emittedL2Logs, i + L2_LOG_VALUE_OFFSET);

261:             emit BlockCommit(

299:             emit BlockCommit(

353:             emit BlockExecution(_batchesData[i].batchNumber, _batchesData[i].batchHash, _batchesData[i].commitment);

436:         emit BlocksVerification(s.totalBatchesVerified, currentTotalBatchesVerified);

496:         emit BlocksRevert(s.totalBatchesCommitted, s.totalBatchesVerified, s.totalBatchesExecuted);

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

343:         emit NewPriorityRequest(

```

```solidity
File: /state-transition/libraries/Diamond.sol

121:         emit DiamondCut(facetCuts, initAddress, initCalldata);

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

68:         emit AccountVersionUpdated(msg.sender, _version);

86:         emit AccountNonceOrderingUpdated(msg.sender, _nonceOrdering);

355:         emit ContractDeployed(_sender, _bytecodeHash, _newAddress);

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

111:         emit L2ToL1LogSent(_l2ToL1Log);

156:         emit L1MessageSent(msg.sender, hash, _message);

181:         emit BytecodeL1PublicationRequested(_bytecodeHash);

```

```solidity
File: /system-contracts/contracts/NonceHolder.sol

96:         emit ValueSetUnderNonce(msg.sender, _key, _value);

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

87:         emit UpgradeComplete(_proposedUpgrade.newProtocolVersion, txHash, _proposedUpgrade);

104:         emit NewL2DefaultAccountBytecodeHash(previousDefaultAccountBytecodeHash, _l2DefaultAccountBytecodeHash);

121:         emit NewL2BootloaderBytecodeHash(previousBootloaderBytecodeHash, _l2BootloaderBytecodeHash);

137:         emit NewVerifier(address(oldVerifier), address(_newVerifier));

157:         emit NewVerifierParams(oldVerifierParams, _newVerifierParams);

256:         emit NewProtocolVersion(previousProtocolVersion, _newProtocolVersion);

```

```solidity
File: /upgrades/BaseZkSyncUpgradeGenesis.sol

40:         emit NewProtocolVersion(previousProtocolVersion, _newProtocolVersion);

67:         emit UpgradeComplete(_proposedUpgrade.newProtocolVersion, txHash, _proposedUpgrade);

```
[[155]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L155)
,[[199]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L199)
,[[225]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L225)
,[[168]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L168)
,[[227]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L227)
,[[239]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L239)
,[[367]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L367)
,[[454]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L454)
,[[602]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L602)
,[[56]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L56)
,[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L68)
,[[69]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L69)
,[[145]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L145)
,[[47]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L47)
,[[50]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L50)
,[[132]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L132)
,[[144]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L144)
,[[157]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L157)
,[[180]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L180)
,[[199]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L199)
,[[250]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L250)
,[[257]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L257)
,[[115]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L115)
,[[127]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L127)
,[[128]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L128)
,[[227]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L227)
,[[235]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L235)
,[[287]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L287)
,[[83]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L83)
,[[92]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L92)
,[[98]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L98)
,[[28]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L28)
,[[40]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L40)
,[[41]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L41)
,[[47]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L47)
,[[54]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L54)
,[[63]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L63)
,[[75]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L75)
,[[86]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L86)
,[[92]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L92)
,[[115]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L115)
,[[125]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L125)
,[[139]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L139)
,[[149]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L149)
,[[135]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L135)
,[[142]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L142)
,[[144]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L144)
,[[145]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L145)
,[[146]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L146)
,[[261]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L261)
,[[299]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L299)
,[[353]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L353)
,[[436]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L436)
,[[496]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L496)
,[[343]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L343)
,[[121]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L121)
,[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L68)
,[[86]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L86)
,[[355]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L355)
,[[111]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L111)
,[[156]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L156)
,[[181]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L181)
,[[96]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/NonceHolder.sol#L96)
,[[87]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L87)
,[[104]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L104)
,[[121]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L121)
,[[137]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L137)
,[[157]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L157)
,[[256]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L256)
,[[40]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L40)
,[[67]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L67)
,
</details>


 ### <a name="GAS-4"></a>[GAS-4] Use assembly for small keccak256 hashes, in order to save gas
Use assembly for small keccak256 hashes, in order to save gas

<details>
<summary>There are 18 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

76:         bytes32 constructorInputHash = keccak256(abi.encode(l2TokenBeacon, ""));

```

```solidity
File: /bridge/L1SharedBridge.sol

210:         bytes32 txDataHash = keccak256(abi.encode(_prevMsgSender, _l1Token, amount));

341:                 bytes32 txDataHash = keccak256(abi.encode(_depositSender, _l1Token, _amount));

598:         bytes32 txDataHash = keccak256(abi.encode(_prevMsgSender, _l1Token, _amount));

```

```solidity
File: /governance/Governance.sol

205:         return keccak256(abi.encode(_operation));

```

```solidity
File: /state-transition/StateTransitionManager.sol

100:         storedBatchZero = keccak256(abi.encode(batchZero));

102:         initialCutHash = keccak256(abi.encode(_initializeData.diamondCut));

138:         initialCutHash = keccak256(abi.encode(_diamondCut));

147:         upgradeCutHash[_oldProtocolVersion] = keccak256(abi.encode(_cutData));

156:         upgradeCutHash[_oldProtocolVersion] = keccak256(abi.encode(_cutData));

```

```solidity
File: /state-transition/chain-deps/facets/Admin.sol

104:         bytes32 cutHashInput = keccak256(abi.encode(_diamondCut));

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

313:             concatHash = keccak256(abi.encode(concatHash, priorityOp.canonicalTxHash));

588:         return keccak256(abi.encode(_storedBatchInfo));

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

106:         chainedLogsHash = keccak256(abi.encode(chainedLogsHash, hashedLog));

122:         chainedMessagesHash = keccak256(abi.encode(chainedMessagesHash, hash));

212:             reconstructedChainedLogsHash = keccak256(abi.encode(reconstructedChainedLogsHash, hashedLog));

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

159:             hash = keccak256(abi.encode(_block));

403:         currentL2BlockTxsRollingHash = keccak256(abi.encode(currentL2BlockTxsRollingHash, _txHash));

```
[[76]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L76)
,[[210]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L210)
,[[341]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L341)
,[[598]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L598)
,[[205]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L205)
,[[100]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L100)
,[[102]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L102)
,[[138]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L138)
,[[147]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L147)
,[[156]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L156)
,[[104]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L104)
,[[313]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L313)
,[[588]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L588)
,[[106]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L106)
,[[122]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L122)
,[[212]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L212)
,[[159]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L159)
,[[403]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L403)
,
</details>


 ### <a name="GAS-5"></a>[GAS-5] Use uint256(1)/uint256(2) instead for true and false boolean states
Use uint256(1) and uint256(2) for true/false to avoid a Gwarmaccess (100 gas), and to avoid Gsset (20000 gas) when changing from ‘false’ to ‘true’, after having been ‘true’ in the past. See [source](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/58f635312aa21f947cae5f8578638a85aa2519f5/contracts/security/ReentrancyGuard.sol#L23-L27).

<details>
<summary>There are 8 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

27:     mapping(uint256 l2BatchNumber => mapping(uint256 l2ToL1MessageNumber => bool isFinalized))

```

```solidity
File: /bridge/L1SharedBridge.sol

57:     mapping(uint256 chainId => mapping(uint256 l2BatchNumber => mapping(uint256 l2ToL1MessageNumber => bool isFinalized)))

61:     mapping(uint256 chainId => bool enabled) internal hyperbridgingEnabled;

```

```solidity
File: /bridgehub/Bridgehub.sol

21:     mapping(address _stateTransitionManager => bool) public stateTransitionManagerIsRegistered;

23:     mapping(address _token => bool) public tokenIsRegistered;

```

```solidity
File: /state-transition/ValidatorTimelock.sol

50:     mapping(uint256 _chainId => mapping(address _validator => bool)) public validators;

```

```solidity
File: /state-transition/chain-deps/ZkSyncStateTransitionStorage.sol

74:     mapping(address validatorAddress => bool isValidator) validators;

114:     mapping(uint256 l2BatchNumber => mapping(uint256 l2ToL1MessageNumber => bool isFinalized)) isEthWithdrawalFinalized;

```
[[27]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L27)
,[[57]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L57)
,[[61]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L61)
,[[21]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L21)
,[[23]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L23)
,[[50]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L50)
,[[74]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/ZkSyncStateTransitionStorage.sol#L74)
,[[114]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/ZkSyncStateTransitionStorage.sol#L114)
,
</details>


 ### <a name="GAS-6"></a>[GAS-6] <array>.length should not be looked up in every loop of a for-loop
If not cached, the solidity compiler will always read the length of the array during each iteration. That is, if it is a storage array, this is an extra sload operation (100 additional extra gas for each iteration except for the first) and if it is a memory array, this is an extra mload operation (3 additional gas for each iteration except for the first).

<details>
<summary>There are 11 instances of this issue:</summary>

---

```solidity
File: /governance/Governance.sol

225:         for (uint256 i = 0; i < _calls.length; ++i) {

```

```solidity
File: /state-transition/ValidatorTimelock.sol

116:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

135:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

185:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

209:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

142:         for (uint256 i = 0; i < emittedL2Logs.length; i = i.uncheckedAdd(L2_TO_L1_LOG_SERIALIZE_SIZE)) {

257:         for (uint256 i = 0; i < _newBatchesData.length; i = i.uncheckedInc()) {

289:         for (uint256 i = 0; i < _newBatchesData.length; i = i.uncheckedInc()) {

636:         for (uint256 i = 0; i < _pubdataCommitments.length; i += PUBDATA_COMMITMENT_SIZE) {

```

```solidity
File: /system-contracts/contracts/Compressor.sol

61:             for (uint256 encodedDataPointer = 0; encodedDataPointer < encodedData.length; encodedDataPointer += 2) {

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

226:         for (uint256 i = 0; i < _factoryDeps.length; ++i) {

```
[[225]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L225)
,[[116]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L116)
,[[135]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L135)
,[[185]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L185)
,[[209]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L209)
,[[142]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L142)
,[[257]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L257)
,[[289]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L289)
,[[636]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L636)
,[[61]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L61)
,[[226]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L226)
,
</details>


 ### <a name="GAS-7"></a>[GAS-7] For Operations that will not overflow, you could use unchecked

<details>
<summary>There are 77 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

12: import {ReentrancyGuard} from "../common/ReentrancyGuard.sol";

76:         bytes32 constructorInputHash = keccak256(abi.encode(l2TokenBeacon, ""));

143:         require(amount == _amount, "3T"); // The token has non-standard transfer logic

```

```solidity
File: /bridge/L1SharedBridge.sol

24: import {L2_BASE_TOKEN_SYSTEM_CONTRACT_ADDR} from "../common/L2ContractAddresses.sol";

121:             require(balanceAfter > balanceBefore, "ShB: 0 eth transferred");

161:             require(amount == _amount, "3T"); // The token has non-standard transfer logic

257:             bytes memory symbol = bytes("ETH");

349:             require(chainBalance[_chainId][_l1Token] >= _amount, "ShB n funds");

439:             require(chainBalance[_chainId][l1Token] >= amount, "ShB not enough funds 2"); // not enought funds //@auidt cache multiple error

564:         require(_l1Token != l1WethAddress, "ShB: WETH deposit not supported 2");

```

```solidity
File: /bridge/interfaces/IL1SharedBridge.sol

7: import {IL1ERC20Bridge} from "./IL1ERC20Bridge.sol";

```

```solidity
File: /state-transition/StateTransitionManager.sol

20: import {VerifierParams} from "./chain-interfaces/IVerifier.sol";

```

```solidity
File: /state-transition/ValidatorTimelock.sol

9: import {ERA_CHAIN_ID} from "../common/Config.sol";

```

```solidity
File: /state-transition/chain-deps/ZkSyncStateTransitionStorage.sol

6: import {PriorityQueue} from "../../state-transition/libraries/PriorityQueue.sol";

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

17: import {IZkSyncStateTransitionBase} from "../../chain-interfaces/IZkSyncStateTransitionBase.sol";

64:                 "wp"

78:         require(logOutput.numberOfLayer1Txs == _newBatch.numberOfLayer1Txs, "ta");

330:         require(priorityOperationsHash == _storedBatch.priorityOperationsHash, "x"); // priority operations hash does not match to expected

568:         require(_blobHashes.length == MAX_NUMBER_OF_BLOBS, "b11");

639:             require(blobVersionedHash != bytes32(0), "vh");

```

```solidity
File: /state-transition/chain-deps/facets/Getters.sol

15: import {IZkSyncStateTransitionBase} from "../../chain-interfaces/IZkSyncStateTransitionBase.sol";

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

25: import {IZkSyncStateTransitionBase} from "../../chain-interfaces/IZkSyncStateTransitionBase.sol";

39:         require(s.chainId == ERA_CHAIN_ID, "transferEthToSharedBridge only available for Era on mailbox");

117:         require(hashedLog != L2_L1_LOGS_TREE_DEFAULT_LEAF_HASH, "tw");

158:         require(s.baseTokenGasPriceMultiplierDenominator > 0, "Mailbox: baseTokenGasPriceDenominator not set");

```

```solidity
File: /state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol

6: import {ReentrancyGuard} from "../../../common/ReentrancyGuard.sol";

```

```solidity
File: /state-transition/chain-interfaces/IExecutor.sol

5: import {IZkSyncStateTransitionBase} from "./IZkSyncStateTransitionBase.sol";

```

```solidity
File: /state-transition/chain-interfaces/IGetters.sol

8: import {IZkSyncStateTransitionBase} from "./IZkSyncStateTransitionBase.sol";

```

```solidity
File: /state-transition/libraries/Diamond.sol

6: import {UncheckedMath} from "../../common/libraries/UncheckedMath.sol";

18:         0x33774e659306e47509050e97cb651e731180a42d458212294d30751925c551a2; // keccak256("diamond.zksync.init") - 1

22:         0xc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131b; // keccak256("diamond.standard.diamond.storage") - 1;

116:                 revert("C"); // undefined diamond cut action

141:             require(oldFacet.facetAddress == address(0), "J"); // facet for this selector already exists

161:             require(oldFacet.facetAddress != address(0), "L"); // it is impossible to replace the facet with zero address

181:             require(oldFacet.facetAddress != address(0), "a2"); // Can't delete a non-existent facet

215:             require(_isSelectorFreezable == ds.selectorToFacet[selector0].isFreezable, "J1");

280:             require(_calldata.length == 0, "H"); // Non-empty calldata for zero address

```

```solidity
File: /state-transition/libraries/Merkle.sol

5: import {UncheckedMath} from "../../common/libraries/UncheckedMath.sol";

```

```solidity
File: /state-transition/libraries/TransactionValidator.sol

8: import {TX_SLOT_OVERHEAD_L2_GAS, MEMORY_OVERHEAD_GAS, L1_TX_INTRINSIC_L2_GAS, L1_TX_DELTA_544_ENCODING_BYTES, L1_TX_DELTA_FACTORY_DEPS_L2_GAS, L1_TX_MIN_L2_GAS_BASE, L1_TX_INTRINSIC_PUBDATA, L1_TX_DELTA_FACTORY_DEPS_PUBDATA} from "../../common/Config.sol";

60:         require(_transaction.reservedDynamic.length == 0, "um");

115:         require(_totalGasLimit >= overhead, "my"); // provided gas limit doesn't cover transaction overhead

```

```solidity
File: /system-contracts/contracts/AccountCodeStorage.sol

7: import {DEPLOYER_SYSTEM_CONTRACT, NONCE_HOLDER_SYSTEM_CONTRACT, CURRENT_MAX_PRECOMPILE_ADDRESS} from "./Constants.sol";

```

```solidity
File: /system-contracts/contracts/BootloaderUtilities.sol

8: import {EfficientCall} from "./libraries/EfficientCall.sol";

37:             revert("Unsupported tx type");

92:             require(vInt == 27 || vInt == 28, "Invalid v value");

191:             require(vInt == 27 || vInt == 28, "Invalid v value");

286:             require(vInt == 27 || vInt == 28, "Invalid v value");

```

```solidity
File: /system-contracts/contracts/Compressor.sol

10: import {L1_MESSENGER_CONTRACT, INITIAL_WRITE_STARTING_POSITION, COMPRESSED_INITIAL_WRITE_SIZE, STATE_DIFF_ENTRY_SIZE, STATE_DIFF_ENUM_INDEX_OFFSET, STATE_DIFF_FINAL_VALUE_OFFSET, STATE_DIFF_DERIVED_KEY_OFFSET, DERIVED_KEY_LENGTH, VALUE_LENGTH, ENUM_INDEX_LENGTH, KNOWN_CODE_STORAGE_CONTRACT} from "./Constants.sol";

187:         require(stateDiffPtr == _compressedStateDiffs.length, "Extra data in _compressedStateDiffs");

242:                 revert("unsupported operation");

```

```solidity
File: /system-contracts/contracts/Constants.sol

16: import {IPubdataChunkPublisher} from "./interfaces/IPubdataChunkPublisher.sol";

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

12: import {ISystemContract} from "./interfaces/ISystemContract.sol";

29:         require(msg.sender == address(this), "Callable only by self");

```

```solidity
File: /system-contracts/contracts/DefaultAccount.sol

9: import {BOOTLOADER_FORMAL_ADDRESS, NONCE_HOLDER_SYSTEM_CONTRACT, DEPLOYER_SYSTEM_CONTRACT, INonceHolder} from "./Constants.sol";

100:         require(totalRequiredBalance <= address(this).balance, "Not enough balance for fee + value");

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

10: import {SystemLogKey, SYSTEM_CONTEXT_CONTRACT, KNOWN_CODE_STORAGE_CONTRACT, COMPRESSOR_CONTRACT, STATE_DIFF_ENTRY_SIZE, MAX_ALLOWED_PUBDATA_PER_BATCH, L2_TO_L1_LOGS_MERKLE_TREE_LEAVES, PUBDATA_CHUNK_PUBLISHER, COMPUTATIONAL_PRICE_FOR_PUBDATA} from "./Constants.sol";

```

```solidity
File: /system-contracts/contracts/NonceHolder.sol

8: import {DEPLOYER_SYSTEM_CONTRACT} from "./Constants.sol";

66:         require(_value <= MAXIMAL_MIN_NONCE_INCREMENT, "The value for incrementing the nonce is too high");

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

9: import {BOOTLOADER_FORMAL_ADDRESS, SystemLogKey} from "./Constants.sol";

245:         require(_l2BlockNumber > 0, "L2 block number is never expected to be zero");

249:             require(correctPrevBlockHash == _expectedPrevL2BlockHash, "The previous L2 block hash is incorrect");

287:             require(_maxVirtualBlocksToCreate > 0, "Can't initialize the first virtual block");

373:             require(_maxVirtualBlocksToCreate == 0, "Can not create virtual blocks in the middle of the miniblock");

394:             revert("Invalid new L2 block number");

```

```solidity
File: /system-contracts/contracts/libraries/EfficientCall.sol

7: import {SHA256_SYSTEM_CONTRACT, KECCAK256_SYSTEM_CONTRACT, MSG_VALUE_SYSTEM_CONTRACT} from "../Constants.sol";

47:         require(returnData.length == 32, "sha returned invalid data");

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractHelper.sol

7: import {SystemContractsCaller, CalldataForwardingMode, CALLFLAGS_CALL_ADDRESS, CODE_ADDRESS_CALL_ADDRESS, EVENT_WRITE_ADDRESS, EVENT_INITIALIZE_ADDRESS, GET_EXTRA_ABI_DATA_ADDRESS, LOAD_CALLDATA_INTO_ACTIVE_PTR_CALL_ADDRESS, META_CODE_SHARD_ID_OFFSET, META_CALLER_SHARD_ID_OFFSET, META_SHARD_ID_OFFSET, META_AUX_HEAP_SIZE_OFFSET, META_HEAP_SIZE_OFFSET, META_GAS_PER_PUBDATA_BYTE_OFFSET, MIMIC_CALL_BY_REF_CALL_ADDRESS, META_CALL_ADDRESS, MSG_VALUE_SIMULATOR_IS_SYSTEM_BIT, PTR_CALLDATA_CALL_ADDRESS, PTR_ADD_INTO_ACTIVE_CALL_ADDRESS, PTR_SHRINK_INTO_ACTIVE_CALL_ADDRESS, PTR_PACK_INTO_ACTIVE_CALL_ADDRESS, RAW_FAR_CALL_BY_REF_CALL_ADDRESS, PRECOMPILE_CALL_ADDRESS, SET_CONTEXT_VALUE_CALL_ADDRESS, SYSTEM_CALL_BY_REF_CALL_ADDRESS, TO_L1_CALL_ADDRESS} from "./SystemContractsCaller.sol";

319:         require(index < 10, "There are only 10 accessible registers");

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractsCaller.sol

6: import "./Utils.sol";

```

```solidity
File: /system-contracts/contracts/libraries/TransactionHelper.sol

12: import "./EfficientCall.sol";

112:             revert("Encoding unsupported tx");

142:         return keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));

177:                 encodedDataLength = hex"81";

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

12: import {L2CanonicalTransaction} from "../common/Messaging.sol";

```

```solidity
File: /upgrades/BaseZkSyncUpgradeGenesis.sol

12: import {ProposedUpgrade, BaseZkSyncUpgrade} from "./BaseZkSyncUpgrade.sol";

```

```solidity
File: /upgrades/DefaultUpgrade.sol

6: import {BaseZkSyncUpgrade, ProposedUpgrade} from "./BaseZkSyncUpgrade.sol";

```

```solidity
File: /upgrades/GenesisUpgrade.sol

7: import "./IDefaultUpgrade.sol";

```
[[12]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L12)
,[[76]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L76)
,[[143]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L143)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L24)
,[[121]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L121)
,[[161]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L161)
,[[257]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L257)
,[[349]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L349)
,[[439]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L439)
,[[564]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L564)
,[[7]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/interfaces/IL1SharedBridge.sol#L7)
,[[20]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L20)
,[[9]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L9)
,[[6]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/ZkSyncStateTransitionStorage.sol#L6)
,[[17]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L17)
,[[64]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L64)
,[[78]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L78)
,[[330]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L330)
,[[568]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L568)
,[[639]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L639)
,[[15]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Getters.sol#L15)
,[[25]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L25)
,[[39]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L39)
,[[117]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L117)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L158)
,[[6]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol#L6)
,[[5]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-interfaces/IExecutor.sol#L5)
,[[8]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-interfaces/IGetters.sol#L8)
,[[6]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L6)
,[[18]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L18)
,[[22]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L22)
,[[116]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L116)
,[[141]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L141)
,[[161]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L161)
,[[181]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L181)
,[[215]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L215)
,[[280]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L280)
,[[5]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Merkle.sol#L5)
,[[8]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/TransactionValidator.sol#L8)
,[[60]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/TransactionValidator.sol#L60)
,[[115]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/TransactionValidator.sol#L115)
,[[7]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L7)
,[[8]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L8)
,[[37]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L37)
,[[92]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L92)
,[[191]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L191)
,[[286]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L286)
,[[10]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L10)
,[[187]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L187)
,[[242]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L242)
,[[16]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Constants.sol#L16)
,[[12]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L12)
,[[29]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L29)
,[[9]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L9)
,[[100]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L100)
,[[10]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L10)
,[[8]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/NonceHolder.sol#L8)
,[[66]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/NonceHolder.sol#L66)
,[[9]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L9)
,[[245]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L245)
,[[249]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L249)
,[[287]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L287)
,[[373]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L373)
,[[394]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L394)
,[[7]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/EfficientCall.sol#L7)
,[[47]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/EfficientCall.sol#L47)
,[[7]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractHelper.sol#L7)
,[[319]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractHelper.sol#L319)
,[[6]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L6)
,[[12]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L12)
,[[112]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L112)
,[[142]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L142)
,[[177]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L177)
,[[12]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L12)
,[[12]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L12)
,[[6]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/DefaultUpgrade.sol#L6)
,[[7]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/GenesisUpgrade.sol#L7)
,
</details>


 ### <a name="GAS-8"></a>[GAS-8] Don't compare boolean expressions to boolean literals
true and false are constants and it is more expensive comparing a boolean against them than directly checking the returned boolean value. `if (<x> == true)` => `if (<x>)`, `if (<x> == false)` => `if (!<x>)`


Instances of this issue:

```solidity
File: /state-transition/ValidatorTimelock.sol

68:         require(validators[_chainId][msg.sender] == true, "ValidatorTimelock: only validator");

```
[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L68)
,
 ### <a name="GAS-10"></a>[GAS-10] Multiplication/division by two should use bit shifting
X * 2 is equivalent to X << 1 and X / 2 is the same as X >> 1.
 The MUL and DIV opcodes cost 5 gas, whereas SHL and SHR only cost 3 gas.

<details>
<summary>There are 27 instances of this issue:</summary>

---

```solidity
File: /common/libraries/L2ContractHelper.sol

25:         uint256 bytecodeLenInWords = _bytecode.length / 32;

50:         codeLengthInWords = uint256(uint8(_bytecodeHash[2])) * 256 + uint256(uint8(_bytecodeHash[3]));

```

```solidity
File: /state-transition/StateTransitionManager.sol

106:         assert(L2_TO_L1_LOG_SERIALIZE_SIZE != 2 * 32);

```

```solidity
File: /state-transition/chain-deps/DiamondInit.sol

51:         assert(L2_TO_L1_LOG_SERIALIZE_SIZE != 2 * 32);

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

581:             blobAuxOutputWords[i * 2] = _blobHashes[i];

582:             blobAuxOutputWords[i * 2 + 1] = _blobCommitments[i];

```

```solidity
File: /state-transition/libraries/LibMap.sol

23:             uint256 mapValue = _map.map[_index / 8];

27:             uint256 bitOffset = (_index & 7) * 32;

43:             uint256 mapIndex = _index / 8;

48:             uint256 bitOffset = (_index & 7) * 32;

```

```solidity
File: /system-contracts/contracts/BootloaderUtilities.sol

97:                 vInt += 8 + block.chainid * 2;

```

```solidity
File: /system-contracts/contracts/Compressor.sol

52:                 encodedData.length * 4 == _bytecode.length,

57:                 dictionary.length / 8 <= encodedData.length / 2,//@audit cache length

57:                 dictionary.length / 8 <= encodedData.length / 2,//@audit cache length

62:                 uint256 indexOfEncodedChunk = uint256(encodedData.readUint16(encodedDataPointer)) * 8;

66:                 uint64 realChunk = _bytecode.readUint64(encodedDataPointer * 4);

203:             dictionary = _rawCompressedData[2:2 + dictionaryLen * 8];

204:             encodedData = _rawCompressedData[2 + dictionaryLen * 8:];

253:         number >>= (256 - (_calldataSlice.length * 8));

```

```solidity
File: /system-contracts/contracts/libraries/RLPEncoder.sol

37:                 uint256 shiftedVal = _val << (lbs * 8);

72:                 uint256 shiftedVal = uint256(_len) << (lbs * 8);

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractsCaller.sol

41: uint256 constant META_GAS_PER_PUBDATA_BYTE_OFFSET = 0 * 8;

42: uint256 constant META_HEAP_SIZE_OFFSET = 8 * 8;

43: uint256 constant META_AUX_HEAP_SIZE_OFFSET = 12 * 8;

44: uint256 constant META_SHARD_ID_OFFSET = 28 * 8;

45: uint256 constant META_CALLER_SHARD_ID_OFFSET = 29 * 8;

46: uint256 constant META_CODE_SHARD_ID_OFFSET = 30 * 8;

```
[[25]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/common/libraries/L2ContractHelper.sol#L25)
,[[50]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/common/libraries/L2ContractHelper.sol#L50)
,[[106]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L106)
,[[51]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/DiamondInit.sol#L51)
,[[581]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L581)
,[[582]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L582)
,[[23]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L23)
,[[27]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L27)
,[[43]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L43)
,[[48]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L48)
,[[97]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/BootloaderUtilities.sol#L97)
,[[52]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L52)
,[[57]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L57)
,[[57]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L57)
,[[62]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L62)
,[[66]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L66)
,[[203]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L203)
,[[204]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L204)
,[[253]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L253)
,[[37]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L37)
,[[72]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L72)
,[[41]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L41)
,[[42]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L42)
,[[43]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L43)
,[[44]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L44)
,[[45]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L45)
,[[46]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractsCaller.sol#L46)
,
</details>


 ### <a name="GAS-11"></a>[GAS-11] >=/ <= costs less gas than >/<
The compiler uses opcodes GT and ISZERO for solidity code that uses >, but only requires LT for >=,which saves 3 gas

<details>
<summary>There are 70 instances of this issue:</summary>

---

```solidity
File: /bridge/L1SharedBridge.sol

121:             require(balanceAfter > balanceBefore, "ShB: 0 eth transferred");

129:             require(amount > 0, "ShB: 0 amount to transfer");

158:             require(msg.value == 0, "ShB m.v > 0 b d.it");

202:             require(msg.value == 0, "ShB m.v > 0 for BH d.it 2");

327:         require(_amount > 0, "y1");

501:         require(_l2ToL1message.length >= 56, "ShB wrong msg len"); // wrong messsage length  //@audit cache lemgth 

```

```solidity
File: /bridgehub/Bridgehub.sol

301:             _request.secondBridgeAddress > BRIDGEHUB_MIN_SECOND_BRIDGE_ADDRESS,

329:         } else if (_refundRecipient.code.length > 0) {

```

```solidity
File: /governance/Governance.sol

111:         } else if (timestamp > block.timestamp) {

217:         require(_delay >= minDelay, "Proposed delay is less than minimum delay");

```

```solidity
File: /state-transition/ValidatorTimelock.sol

195:                 require(block.timestamp >= commitBatchTimestamp + delay, "5c"); // The delay is not passed

217:                 require(block.timestamp >= commitBatchTimestamp + delay, "5c"); // The delay is not passed

```

```solidity
File: /state-transition/chain-deps/DiamondProxy.sol

25:         require(msg.data.length >= 4 || msg.data.length == 0, "Ut");

```

```solidity
File: /state-transition/chain-deps/facets/Admin.sol

70:         require(_newFeeParams.maxPubdataPerBatch >= _newFeeParams.priorityTxMaxPubdata, "n6");

117:             s.protocolVersion > _oldProtocolVersion,

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

109:         uint256 batchTimestamp = _packedBatchAndL2BlockTimestamp >> 128;

429:         if (_proof.serializedProof.length > 0) {

482:         require(s.totalBatchesCommitted > _newLastBatch, "v1"); // The last committed batch is less than new last batch

483:         require(_newLastBatch >= s.totalBatchesExecuted, "v2"); // Already executed batches cannot be reverted

492:         if (s.l2SystemContractsUpgradeBatchNumber > _newLastBatch) {

631:         require(_pubdataCommitments.length > 0, "pl");

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

158:         require(s.baseTokenGasPriceMultiplierDenominator > 0, "Mailbox: baseTokenGasPriceDenominator not set");

272:         require(_mintValue >= baseCost + _params.l2Value, "mv"); // The `msg.value` doesn't cover the transaction cost

277:         if (refundRecipient.code.length > 0) {

```

```solidity
File: /state-transition/libraries/Diamond.sol

107:             require(selectors.length > 0, "B"); // no functions for diamond cut

132:         require(_facet.code.length > 0, "G");

155:         require(_facet.code.length > 0, "K");

```

```solidity
File: /state-transition/libraries/LibMap.sol

30:             result = uint32(mapValue >> bitOffset);

54:             uint32 oldValue = uint32(mapValue >> bitOffset);

```

```solidity
File: /state-transition/libraries/Merkle.sol

24:         require(pathLength > 0, "xc");

```

```solidity
File: /state-transition/libraries/TransactionValidator.sol

115:         require(_totalGasLimit >= overhead, "my"); // provided gas limit doesn't cover transaction overhead

```

```solidity
File: /system-contracts/contracts/ComplexUpgrader.sol

24:         require(_delegateTo.code.length > 0, "Delegatee is an EOA");

```

```solidity
File: /system-contracts/contracts/Compressor.sol

146:             uint8 len = operation == 0 ? 32 : metadata >> LENGTH_BITS_OFFSET;

177:             uint8 len = operation == 0 ? 32 : metadata >> LENGTH_BITS_OFFSET;

253:         number >>= (256 - (_calldataSlice.length * 8));

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

48:             _address > address(MAX_SYSTEM_CONTRACT_ADDRESS) &&

303:         require(knownCodeMarker > 0, "The code hash is not known");

332:             if (value > 0) {

339:             if (value > 0) {

```

```solidity
File: /system-contracts/contracts/DefaultAccount.sol

139:         if (to == address(DEPLOYER_SYSTEM_CONTRACT) && data.length >= 4) {

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

222:         while (nodesOnCurrentLevel > 1) {

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

119:         return pubdataPublished > basePubdataSpent ? pubdataPublished - basePubdataSpent : 0; //@audit cache basePubdataSpent

144:         if (blockNumber <= _block || blockNumber - _block > 256) {

151:             _block >= currentVirtualBlockUpgradeInfo.virtualBlockFinishL2Block &&

152:             currentVirtualBlockUpgradeInfo.virtualBlockFinishL2Block > 0

245:         require(_l2BlockNumber > 0, "L2 block number is never expected to be zero");

287:             require(_maxVirtualBlocksToCreate > 0, "Can't initialize the first virtual block");

302:         if (virtualBlockInfo.number >= _l2BlockNumber) {

352:                 _l2BlockTimestamp >= currentBatchTimestamp,

355:             require(_maxVirtualBlocksToCreate > 0, "There must be a virtual block created at the start of the batch");

387:                 _l2BlockTimestamp > currentL2BlockTimestamp,

413:         require(currentBatchNumber > 0, "The current batch number must be greater than 0");

430:             _newTimestamp > currentBlockTimestamp,

451:         require(_newTimestamp > previousBatchTimestamp, "Timestamps should be incremental");

```

```solidity
File: /system-contracts/contracts/libraries/RLPEncoder.sol

86:             if (_number > type(uint128).max) {

87:                 _number >>= 128;

90:             if (_number > type(uint64).max) {

91:                 _number >>= 64;

94:             if (_number > type(uint32).max) {

95:                 _number >>= 32;

98:             if (_number > type(uint16).max) {

99:                 _number >>= 16;

102:             if (_number > type(uint8).max) {

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractHelper.sol

219:         result = (shifted >> (256 - size));

```

```solidity
File: /system-contracts/contracts/libraries/TransactionHelper.sol

363:         require(_transaction.paymasterInput.length >= 4, "The standard paymaster input must be at least 4 bytes long");

368:                 _transaction.paymasterInput.length >= 68,

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

72:         require(block.timestamp >= _proposedUpgrade.upgradeTimestamp, "Upgrade is not ready yet");

239:             _newProtocolVersion > previousProtocolVersion,

```

```solidity
File: /upgrades/BaseZkSyncUpgradeGenesis.sol

24:             _newProtocolVersion >= previousProtocolVersion,

52:         require(block.timestamp >= _proposedUpgrade.upgradeTimestamp, "Upgrade is not ready yet");

```
[[121]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L121)
,[[129]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L129)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L158)
,[[202]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L202)
,[[327]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L327)
,[[501]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L501)
,[[301]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L301)
,[[329]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L329)
,[[111]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L111)
,[[217]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L217)
,[[195]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L195)
,[[217]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L217)
,[[25]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/DiamondProxy.sol#L25)
,[[70]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L70)
,[[117]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L117)
,[[109]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L109)
,[[429]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L429)
,[[482]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L482)
,[[483]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L483)
,[[492]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L492)
,[[631]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L631)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L158)
,[[272]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L272)
,[[277]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L277)
,[[107]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L107)
,[[132]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L132)
,[[155]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L155)
,[[30]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L30)
,[[54]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/LibMap.sol#L54)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Merkle.sol#L24)
,[[115]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/TransactionValidator.sol#L115)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ComplexUpgrader.sol#L24)
,[[146]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L146)
,[[177]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L177)
,[[253]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L253)
,[[48]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L48)
,[[303]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L303)
,[[332]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L332)
,[[339]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L339)
,[[139]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L139)
,[[222]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L222)
,[[119]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L119)
,[[144]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L144)
,[[151]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L151)
,[[152]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L152)
,[[245]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L245)
,[[287]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L287)
,[[302]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L302)
,[[352]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L352)
,[[355]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L355)
,[[387]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L387)
,[[413]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L413)
,[[430]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L430)
,[[451]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L451)
,[[86]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L86)
,[[87]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L87)
,[[90]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L90)
,[[91]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L91)
,[[94]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L94)
,[[95]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L95)
,[[98]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L98)
,[[99]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L99)
,[[102]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/RLPEncoder.sol#L102)
,[[219]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractHelper.sol#L219)
,[[363]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L363)
,[[368]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L368)
,[[72]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L72)
,[[239]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L239)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L24)
,[[52]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L52)
,
</details>


 ### <a name="GAS-12"></a>[GAS-12] Use hardcode address instead of address(this) 
Instead of using address(this), it is more gas-efficient to pre-calculate and use the hardcoded address. Foundry’s script.sol and solmate’s LibRlp.sol contracts can help achieve this. References: https://book.getfoundry.sh/reference/forge-std/compute-create-address

<details>
<summary>There are 18 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

65:         uint256 amount = IERC20(_token).balanceOf(address(this));

```

```solidity
File: /bridge/L1SharedBridge.sol

118:             uint256 balanceBefore = address(this).balance;

120:             uint256 balanceAfter = address(this).balance;

127:             uint256 balanceBefore = IERC20(_token).balanceOf(address(this));

131:             uint256 balanceAfter = IERC20(_token).balanceOf(address(this));

174:         uint256 balanceBefore = _token.balanceOf(address(this));

175:         _token.safeTransferFrom(_from, address(this), _amount);

176:         uint256 balanceAfter = _token.balanceOf(address(this));

```

```solidity
File: /governance/Governance.sol

59:         require(msg.sender == address(this), "Only governance contract itself is allowed to call this function");

```

```solidity
File: /state-transition/StateTransitionManager.sol

265:             bytes32(uint256(uint160(address(this)))),

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

41:         uint256 amount = address(this).balance;

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

29:         require(msg.sender == address(this), "Callable only by self");

333:                 BASE_TOKEN_SYSTEM_CONTRACT.transferFromTo(address(this), _newAddress, value);

```

```solidity
File: /system-contracts/contracts/DefaultAccount.sol

47:         if (codeAddress != address(this)) {

100:         require(totalRequiredBalance <= address(this).balance, "Not enough balance for fee + value");

188:         return recoveredAddress == address(this) && recoveredAddress != address(0);

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

129:             sender: address(this),

```

```solidity
File: /system-contracts/contracts/libraries/TransactionHelper.sol

377:             uint256 currentAllowance = IERC20(token).allowance(address(this), paymaster);

```
[[65]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L65)
,[[118]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L118)
,[[120]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L120)
,[[127]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L127)
,[[131]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L131)
,[[174]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L174)
,[[175]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L175)
,[[176]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L176)
,[[59]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L59)
,[[265]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L265)
,[[41]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L41)
,[[29]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L29)
,[[333]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L333)
,[[47]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L47)
,[[100]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L100)
,[[188]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L188)
,[[129]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L129)
,[[377]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L377)
,
</details>


 ### <a name="GAS-13"></a>[GAS-13] Don't initialize variables with default value

<details>
<summary>There are 35 instances of this issue:</summary>

---

```solidity
File: /governance/Governance.sol

225:         for (uint256 i = 0; i < _calls.length; ++i) {

```

```solidity
File: /state-transition/ValidatorTimelock.sol

116:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

135:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

185:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

209:             for (uint256 i = 0; i < _newBatchesData.length; ++i) {

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

142:         for (uint256 i = 0; i < emittedL2Logs.length; i = i.uncheckedAdd(L2_TO_L1_LOG_SERIALIZE_SIZE)) {

257:         for (uint256 i = 0; i < _newBatchesData.length; i = i.uncheckedInc()) {

289:         for (uint256 i = 0; i < _newBatchesData.length; i = i.uncheckedInc()) {

311:         for (uint256 i = 0; i < _nPriorityOps; i = i.uncheckedInc()) {

351:         for (uint256 i = 0; i < nBatches; i = i.uncheckedInc()) {

405:         for (uint256 i = 0; i < committedBatchesLength; i = i.uncheckedInc()) {

580:         for (uint i = 0; i < MAX_NUMBER_OF_BLOBS; i++) {

629:         uint256 versionedHashIndex = 0;

636:         for (uint256 i = 0; i < _pubdataCommitments.length; i += PUBDATA_COMMITMENT_SIZE) {

667:         for (uint256 i = 0; i < MAX_NUMBER_OF_BLOBS; i++) {

```

```solidity
File: /state-transition/chain-deps/facets/Getters.sol

208:         for (uint256 i = 0; i < facetsLen; i = i.uncheckedInc()) {

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

356:         for (uint256 i = 0; i < factoryDepsLen; i = i.uncheckedInc()) {

```

```solidity
File: /state-transition/libraries/Diamond.sol

101:         for (uint256 i = 0; i < facetCutsLength; i = i.uncheckedInc()) {

138:         for (uint256 i = 0; i < selectorsLength; i = i.uncheckedInc()) {

158:         for (uint256 i = 0; i < selectorsLength; i = i.uncheckedInc()) {

178:         for (uint256 i = 0; i < selectorsLength; i = i.uncheckedInc()) {

```

```solidity
File: /state-transition/libraries/TransactionValidator.sol

92:         uint256 costForPubdata = 0;

```

```solidity
File: /system-contracts/contracts/Compressor.sol

61:             for (uint256 encodedDataPointer = 0; encodedDataPointer < encodedData.length; encodedDataPointer += 2) {

124:         uint256 numInitialWritesProcessed = 0;

127:         for (uint256 i = 0; i < _numberOfStateDiffs * STATE_DIFF_ENTRY_SIZE; i += STATE_DIFF_ENTRY_SIZE) {

159:         for (uint256 i = 0; i < _numberOfStateDiffs * STATE_DIFF_ENTRY_SIZE; i += STATE_DIFF_ENTRY_SIZE) {

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

247:         uint256 sumOfValues = 0;

248:         for (uint256 i = 0; i < deploymentsLength; ++i) {

253:         for (uint256 i = 0; i < deploymentsLength; ++i) {

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

197:         uint256 calldataPtr = 0;

206:         for (uint256 i = 0; i < numberOfL2ToL1Logs; ++i) {

224:             for (uint256 i = 0; i < nodesOnCurrentLevel; ++i) {

236:         for (uint256 i = 0; i < numberOfMessages; ++i) {

254:         for (uint256 i = 0; i < numberOfBytecodes; ++i) {

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

226:         for (uint256 i = 0; i < _factoryDeps.length; ++i) {

```
[[225]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L225)
,[[116]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L116)
,[[135]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L135)
,[[185]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L185)
,[[209]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L209)
,[[142]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L142)
,[[257]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L257)
,[[289]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L289)
,[[311]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L311)
,[[351]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L351)
,[[405]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L405)
,[[580]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L580)
,[[629]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L629)
,[[636]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L636)
,[[667]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L667)
,[[208]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Getters.sol#L208)
,[[356]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L356)
,[[101]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L101)
,[[138]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L138)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L158)
,[[178]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L178)
,[[92]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/TransactionValidator.sol#L92)
,[[61]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L61)
,[[124]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L124)
,[[127]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L127)
,[[159]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L159)
,[[247]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L247)
,[[248]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L248)
,[[253]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L253)
,[[197]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L197)
,[[206]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L206)
,[[224]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L224)
,[[236]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L236)
,[[254]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L254)
,[[226]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L226)
,
</details>


 ### <a name="GAS-14"></a>[GAS-14] Long revert strings

<details>
<summary>There are 63 instances of this issue:</summary>

---

```solidity
File: /bridge/L1SharedBridge.sol

155:             require(msg.value == _amount, "L1SharedBridge: msg.value not equal to amount");

195:         require(bridgehub.baseToken(_chainId) != _l1Token, "ShB: baseToken deposit not supported");

427:             require(!alreadyFinalized, "Withdrawal is already finalized 2");

564:         require(_l1Token != l1WethAddress, "ShB: WETH deposit not supported 2");

```

```solidity
File: /bridgehub/Bridgehub.sol

102:         require(!tokenIsRegistered[_token], "Bridgehub: token already registered");

132:         require(stateTransitionManager[_chainId] == address(0), "Bridgehub: chainId already registered");

225:                 require(msg.value == 0, "Bridgehub: non-eth bridge with msg.value");

```

```solidity
File: /governance/Governance.sol

59:         require(msg.sender == address(this), "Only governance contract itself is allowed to call this function");

65:         require(msg.sender == securityCouncil, "Only security council is allowed to call this function");

172:         require(isOperationReady(id), "Operation must be ready before execution");

177:         require(isOperationReady(id), "Operation must be ready after execution");

191:         require(isOperationPending(id), "Operation must be pending before execution");

196:         require(isOperationPending(id), "Operation must be pending after execution");

216:         require(!isOperation(_id), "Operation with this proposal id already exists");

217:         require(_delay >= minDelay, "Proposed delay is less than minimum delay");

240:         require(_predecessorId == bytes32(0) || isOperationDone(_predecessorId), "Predecessor operation not completed");

```

```solidity
File: /state-transition/StateTransitionManager.sol

256:         require(cutHashInput == initialCutHash, "StateTransition: initial cutHash mismatch");

```

```solidity
File: /state-transition/ValidatorTimelock.sol

62:         require(msg.sender == stateTransitionManager.getChainAdmin(_chainId), "ValidatorTimelock: only chain admin");

68:         require(validators[_chainId][msg.sender] == true, "ValidatorTimelock: only validator");

```

```solidity
File: /state-transition/chain-deps/facets/Admin.sol

90:         require(s.totalBatchesCommitted == 0, "AdminFacet: set validium only after genesis"); // Validium mode can be set only before the first batch is committed

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

616:         require(success, "failed to call point evaluation precompile");

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

39:         require(s.chainId == ERA_CHAIN_ID, "transferEthToSharedBridge only available for Era on mailbox");

158:         require(s.baseTokenGasPriceMultiplierDenominator > 0, "Mailbox: baseTokenGasPriceDenominator not set");

185:         require(s.chainId == ERA_CHAIN_ID, "finalizeEthWithdrawal only available for Era on mailbox");

206:         require(s.chainId == ERA_CHAIN_ID, "legacy interface only available for era token");

```

```solidity
File: /state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol

22:         require(s.validators[msg.sender], "StateTransition Chain: not validator");

27:         require(msg.sender == s.stateTransitionManager, "StateTransition Chain: not state transition manager");

32:         require(msg.sender == s.bridgehub, "StateTransition Chain: not bridgehub");

53:         require(msg.sender == s.baseTokenBridge, "Only shared bridge can call this function");

```

```solidity
File: /system-contracts/contracts/AccountCodeStorage.sol

26:         require(msg.sender == address(DEPLOYER_SYSTEM_CONTRACT), "Callable only by the deployer system contract");

37:         require(Utils.isContractConstructing(_hash), "Code hash is not for a contract on constructor");

48:         require(Utils.isContractConstructed(_hash), "Code hash is not for a constructed contract");

57:         require(Utils.isContractConstructing(codeHash), "Code hash is not for a contract on constructor");

```

```solidity
File: /system-contracts/contracts/ComplexUpgrader.sol

22:         require(msg.sender == FORCE_DEPLOYER, "Can only be called by FORCE_DEPLOYER");

```

```solidity
File: /system-contracts/contracts/Compressor.sol

63:                 require(indexOfEncodedChunk < dictionary.length, "Encoded chunk index is out of bounds");

68:                 require(encodedChunk == realChunk, "Encoded chunk does not match the original bytecode");

119:         require(_enumerationIndexSize <= MAX_ENUMERATION_INDEX_SIZE, "enumeration index size is too large");

156:         require(numInitialWritesProcessed == numberOfInitialWrites, "Incorrect number of initial storage diffs");

187:         require(stateDiffPtr == _compressedStateDiffs.length, "Extra data in _compressedStateDiffs");

230:                 require(convertedValue == _finalValue, "transform or no compression: compressed and final mismatch");

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

251:         require(msg.value == sumOfValues, "`value` provided is not equal to the combined `value`s of deployments");

265:         require(uint160(_newAddress) > MAX_SYSTEM_CONTRACT_ADDRESS, "Can not deploy contracts in kernel space");

350:             require(value == 0, "The value must be zero if we do not call the constructor");

```

```solidity
File: /system-contracts/contracts/DefaultAccount.sol

100:         require(totalRequiredBalance <= address(this).balance, "Not enough balance for fee + value");

202:         require(success, "Failed to pay the fee to the operator");

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

315:         require(calldataPtr == _totalL2ToL1PubdataAndStateDiffs.length, "Extra data in the totalL2ToL1Pubdata array");

```

```solidity
File: /system-contracts/contracts/NonceHolder.sol

66:         require(_value <= MAXIMAL_MIN_NONCE_INCREMENT, "The value for incrementing the nonce is too high");

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

242:         require(_isFirstInBatch, "Upgrade transaction must be first");

245:         require(_l2BlockNumber > 0, "L2 block number is never expected to be zero");

249:             require(correctPrevBlockHash == _expectedPrevL2BlockHash, "The previous L2 block hash is incorrect");

287:             require(_maxVirtualBlocksToCreate > 0, "Can't initialize the first virtual block");

355:             require(_maxVirtualBlocksToCreate > 0, "There must be a virtual block created at the start of the batch");

367:             require(!_isFirstInBatch, "Can not reuse L2 block number from the previous batch");

368:             require(currentL2BlockTimestamp == _l2BlockTimestamp, "The timestamp of the same L2 block must be same");

373:             require(_maxVirtualBlocksToCreate == 0, "Can not create virtual blocks in the middle of the miniblock");

385:             require(_expectedPrevL2BlockHash == pendingL2BlockHash, "The current L2 block hash is incorrect");

413:         require(currentBatchNumber > 0, "The current batch number must be greater than 0");

452:         require(previousBatchNumber + 1 == _expectedNewNumber, "The provided block number is not correct");

```

```solidity
File: /system-contracts/contracts/libraries/SystemContractHelper.sol

319:         require(index < 10, "There are only 10 accessible registers");

```

```solidity
File: /system-contracts/contracts/libraries/TransactionHelper.sol

363:         require(_transaction.paymasterInput.length >= 4, "The standard paymaster input must be at least 4 bytes long");

```

```solidity
File: /upgrades/BaseZkSyncUpgrade.sol

190:         require(_l2ProtocolUpgradeTx.txType == SYSTEM_UPGRADE_L2_TX_TYPE, "L2 system upgrade tx type is wrong");

249:         require(s.l2SystemContractsUpgradeTxHash == bytes32(0), "Previous upgrade has not been finalized");

```

```solidity
File: /upgrades/BaseZkSyncUpgradeGenesis.sol

33:         require(s.l2SystemContractsUpgradeTxHash == bytes32(0), "Previous upgrade has not been finalized");

```
[[155]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L155)
,[[195]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L195)
,[[427]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L427)
,[[564]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L564)
,[[102]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L102)
,[[132]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L132)
,[[225]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L225)
,[[59]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L59)
,[[65]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L65)
,[[172]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L172)
,[[177]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L177)
,[[191]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L191)
,[[196]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L196)
,[[216]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L216)
,[[217]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L217)
,[[240]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L240)
,[[256]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L256)
,[[62]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L62)
,[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L68)
,[[90]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L90)
,[[616]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L616)
,[[39]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L39)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L158)
,[[185]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L185)
,[[206]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L206)
,[[22]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol#L22)
,[[27]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol#L27)
,[[32]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol#L32)
,[[53]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/ZkSyncStateTransitionBase.sol#L53)
,[[26]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L26)
,[[37]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L37)
,[[48]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L48)
,[[57]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L57)
,[[22]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ComplexUpgrader.sol#L22)
,[[63]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L63)
,[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L68)
,[[119]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L119)
,[[156]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L156)
,[[187]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L187)
,[[230]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L230)
,[[251]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L251)
,[[265]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L265)
,[[350]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L350)
,[[100]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L100)
,[[202]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/DefaultAccount.sol#L202)
,[[315]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L315)
,[[66]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/NonceHolder.sol#L66)
,[[242]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L242)
,[[245]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L245)
,[[249]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L249)
,[[287]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L287)
,[[355]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L355)
,[[367]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L367)
,[[368]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L368)
,[[373]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L373)
,[[385]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L385)
,[[413]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L413)
,[[452]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L452)
,[[319]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/SystemContractHelper.sol#L319)
,[[363]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/libraries/TransactionHelper.sol#L363)
,[[190]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L190)
,[[249]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgrade.sol#L249)
,[[33]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/upgrades/BaseZkSyncUpgradeGenesis.sol#L33)
,
</details>


 ### <a name="GAS-15"></a>[GAS-15] Constructors can be marked payable
 Payable functions cost less gas to execute, since the compiler does not have to add extra checks to ensure that a payment was not provided. A constructor can safely be marked as payable, since only the deployer would be able to pass funds, and the project itself would not pass any funds.

<details>
<summary>There are 17 instances of this issue:</summary>

---

```solidity
File: /bridge/L1ERC20Bridge.sol

55:     constructor(IL1SharedBridge _sharedBridge) reentrancyGuardInitializer {

76:         bytes32 constructorInputHash = keccak256(abi.encode(l2TokenBeacon, ""));

79:         return L2ContractHelper.computeCreate2Address(l2Bridge, salt, l2TokenProxyBytecodeHash, constructorInputHash);

```

```solidity
File: /bridge/L1SharedBridge.sol

90:     constructor(

```

```solidity
File: /bridgehub/Bridgehub.sol

38:     constructor() reentrancyGuardInitializer {}

```

```solidity
File: /common/libraries/L2ContractHelper.sol

64:         bytes32 _constructorInputHash

68:             bytes.concat(CREATE2_PREFIX, senderBytes, _salt, _bytecodeHash, _constructorInputHash)

```

```solidity
File: /governance/Governance.sol

41:     constructor(address _admin, address _securityCouncil, uint256 _minDelay) {

```

```solidity
File: /state-transition/StateTransitionManager.sol

58:     constructor(address _bridgehub) reentrancyGuardInitializer {

```

```solidity
File: /state-transition/ValidatorTimelock.sol

55:     constructor(address _initialOwner, uint32 _executionDelay) {

```

```solidity
File: /state-transition/chain-deps/DiamondInit.sol

19:     constructor() reentrancyGuardInitializer {}

```

```solidity
File: /state-transition/chain-deps/DiamondProxy.sol

11:     constructor(uint256 _chainId, Diamond.DiamondCutData memory _diamondCut) {

```

```solidity
File: /system-contracts/contracts/AccountCodeStorage.sol

37:         require(Utils.isContractConstructing(_hash), "Code hash is not for a contract on constructor");

57:         require(Utils.isContractConstructing(codeHash), "Code hash is not for a contract on constructor");

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

103:         bytes32 constructorInputHash = EfficientCall.keccak(_input);

106:             bytes.concat(CREATE2_PREFIX, bytes32(uint256(uint160(_sender))), _salt, _bytecodeHash, constructorInputHash)

350:             require(value == 0, "The value must be zero if we do not call the constructor");

```
[[55]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L55)
,[[76]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L76)
,[[79]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1ERC20Bridge.sol#L79)
,[[90]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L90)
,[[38]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L38)
,[[64]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/common/libraries/L2ContractHelper.sol#L64)
,[[68]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/common/libraries/L2ContractHelper.sol#L68)
,[[41]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/governance/Governance.sol#L41)
,[[58]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L58)
,[[55]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L55)
,[[19]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/DiamondInit.sol#L19)
,[[11]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/DiamondProxy.sol#L11)
,[[37]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L37)
,[[57]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L57)
,[[103]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L103)
,[[106]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L106)
,[[350]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L350)
,
</details>


If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table


Instances of this issue:

```solidity
File: /state-transition/ValidatorTimelock.sol

26:     string public constant override getName = "ValidatorTimelock";

```

```solidity
File: /state-transition/chain-deps/facets/Admin.sol

20:     string public constant override getName = "AdminFacet";

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

27:     string public constant override getName = "ExecutorFacet";

```

```solidity
File: /state-transition/chain-deps/facets/Getters.sol

25:     string public constant override getName = "GettersFacet";

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

35:     string public constant override getName = "MailboxFacet";

```
[[26]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/ValidatorTimelock.sol#L26)
,[[20]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Admin.sol#L20)
,[[27]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L27)
,[[25]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Getters.sol#L25)
,[[35]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L35)
,
 ### <a name="GAS-19"></a>[GAS-19] Use shift Right/Left instead of division/multiplication if possible


Instances of this issue:

```solidity
File: /state-transition/StateTransitionManager.sol

11: import {IStateTransitionManager, StateTransitionManagerInitializeData} from "./IStateTransitionManager.sol";

```

```solidity
File: /state-transition/chain-deps/DiamondInit.sol

11: 

```

```solidity
File: /system-contracts/contracts/Compressor.sol

56:             require(

```
[[11]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/StateTransitionManager.sol#L11)
,[[11]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/DiamondInit.sol#L11)
,[[56]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L56)
,


Instances of this issue:

```solidity
File: /common/libraries/L2ContractHelper.sol

41:         require(version == 1 && _bytecodeHash[1] == bytes1(0), "zf"); // Incorrectly formatted bytecodeHash

```
[[41]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/common/libraries/L2ContractHelper.sol#L41)
,
 ### <a name="GAS-22"></a>[GAS-22] Using this to access functions results in an external call, wasting gas
External calls have an overhead of 100 gas, which can be avoided by not referencing the function using this. Contracts are allowed to override their parents' functions and change the visibility from external to public, so make this change if it's required in order to call the function internally.


Instances of this issue:

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

254:             this.forceDeployOnAddress{value: _deployments[i].value}(_deployments[i], msg.sender); //@audit cache deployment[i]

```
[[254]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L254)
,

The unchecked keyword is new in solidity version 0.8.0, so this only applies to that version or higher, which these instances are. This saves 30-40 gas per loop


Instances of this issue:

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

580:         for (uint i = 0; i < MAX_NUMBER_OF_BLOBS; i++) {

667:         for (uint256 i = 0; i < MAX_NUMBER_OF_BLOBS; i++) {

```

```solidity
File: /system-contracts/contracts/Compressor.sol

135:             numInitialWritesProcessed++;

144:             stateDiffPtr++;

```

```solidity
File: /system-contracts/contracts/L1Messenger.sol

109:         numberOfLogsToProcess++;

284:         calldataPtr++;

290:         calldataPtr++;

```
[[580]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L580)
,[[667]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L667)
,[[135]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L135)
,[[144]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/Compressor.sol#L144)
,[[109]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L109)
,[[284]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L284)
,[[290]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/L1Messenger.sol#L290)
,
 ### <a name="GAS-24"></a>[GAS-24] Use != 0 instead of > 0 for unsigned integer comparison

<details>
<summary>There are 25 instances of this issue:</summary>

---

```solidity
File: /bridge/L1SharedBridge.sol

129:             require(amount > 0, "ShB: 0 amount to transfer");

158:             require(msg.value == 0, "ShB m.v > 0 b d.it");

202:             require(msg.value == 0, "ShB m.v > 0 for BH d.it 2");

327:         require(_amount > 0, "y1");

```

```solidity
File: /bridgehub/Bridgehub.sol

329:         } else if (_refundRecipient.code.length > 0) {

```

```solidity
File: /state-transition/chain-deps/facets/Executor.sol

429:         if (_proof.serializedProof.length > 0) {

593:         return (_bitMap & (1 << _index)) > 0;

631:         require(_pubdataCommitments.length > 0, "pl");

```

```solidity
File: /state-transition/chain-deps/facets/Mailbox.sol

158:         require(s.baseTokenGasPriceMultiplierDenominator > 0, "Mailbox: baseTokenGasPriceDenominator not set");

277:         if (refundRecipient.code.length > 0) {

```

```solidity
File: /state-transition/libraries/Diamond.sol

107:             require(selectors.length > 0, "B"); // no functions for diamond cut

132:         require(_facet.code.length > 0, "G");

155:         require(_facet.code.length > 0, "K");

```

```solidity
File: /state-transition/libraries/Merkle.sol

24:         require(pathLength > 0, "xc");

```

```solidity
File: /system-contracts/contracts/AccountCodeStorage.sol

102:         if (codeHash == 0x00 && NONCE_HOLDER_SYSTEM_CONTRACT.getRawNonce(account) > 0) {

```

```solidity
File: /system-contracts/contracts/ComplexUpgrader.sol

24:         require(_delegateTo.code.length > 0, "Delegatee is an EOA");

```

```solidity
File: /system-contracts/contracts/ContractDeployer.sol

303:         require(knownCodeMarker > 0, "The code hash is not known");

332:             if (value > 0) {

339:             if (value > 0) {

```

```solidity
File: /system-contracts/contracts/NonceHolder.sol

156:         return (_nonce < getMinNonce(_address) || nonceValues[addressAsKey][_nonce] > 0);

```

```solidity
File: /system-contracts/contracts/SystemContext.sol

152:             currentVirtualBlockUpgradeInfo.virtualBlockFinishL2Block > 0

245:         require(_l2BlockNumber > 0, "L2 block number is never expected to be zero");

287:             require(_maxVirtualBlocksToCreate > 0, "Can't initialize the first virtual block");

355:             require(_maxVirtualBlocksToCreate > 0, "There must be a virtual block created at the start of the batch");

413:         require(currentBatchNumber > 0, "The current batch number must be greater than 0");

```
[[129]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L129)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L158)
,[[202]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L202)
,[[327]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridge/L1SharedBridge.sol#L327)
,[[329]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/bridgehub/Bridgehub.sol#L329)
,[[429]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L429)
,[[593]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L593)
,[[631]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Executor.sol#L631)
,[[158]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L158)
,[[277]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/chain-deps/facets/Mailbox.sol#L277)
,[[107]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L107)
,[[132]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L132)
,[[155]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Diamond.sol#L155)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/state-transition/libraries/Merkle.sol#L24)
,[[102]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/AccountCodeStorage.sol#L102)
,[[24]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ComplexUpgrader.sol#L24)
,[[303]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L303)
,[[332]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L332)
,[[339]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/ContractDeployer.sol#L339)
,[[156]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/NonceHolder.sol#L156)
,[[152]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L152)
,[[245]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L245)
,[[287]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L287)
,[[355]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L355)
,[[413]](https://github.com/code-423n4/2024-03-zksync/blob/main/code/contracts/ethereum/contracts/state-transition/StateTransitionManager.sol/system-contracts/contracts/SystemContext.sol#L413)
,
</details>

