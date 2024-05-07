import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
title:'Use assembly to emit events',
description:"We can use assembly to emit events efficiently by utilizing `scratch space` and the `free memory pointer`. This will allow us to potentially avoid memory expansion costs. Note: In order to do this optimization safely, we will need to cache and restore the free memory pointer.",
gasCost:38,  
regex: /emit/g,
};

export default issue;
/** 
// uint256 id, uint256 value, uint256 amount
emit eventSentAmountExample(id, value, amount);

        assembly {
            let memptr := mload(0x40)
            mstore(0x00, calldataload(0x44))
            mstore(0x20, calldataload(0xa4))
            mstore(0x40, amount)            log1(                0x00,                0x60,                // keccak256("eventSentAmountExample(uint256,uint256,uint256)")                0xa622cf392588fbf2cd020ff96b2f4ebd9c76d7a4bc7f3e6b2f18012312e76bc3            )
            mstore(0x40, memptr)        }

*/