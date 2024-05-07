import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
title:'With assembly, .call (bool success) transfer can be done gas-optimized',
gasCost:248,
description:"When using assembly language, it is possible to call the transfer function of an Ethereum contract in a gas-optimized way by using the .call function with specific input parameters. The .call function takes a number of input parameters, including the address of the contract to call, the amount of Ether to transfer, and a specification of the gas limit for the call. By specifying a lower gas limit than the default, it is possible to reduce the gas cost of the transfer.",
regex: /\.call/g,
};

export default issue;
