
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: "Don't use payable.transfer()/payable.send()",
  description:"The use of payable.transfer() is heavily frowned upon because it can lead to the locking of funds. The transfer() call requires that the recipient is either an EOA account, or is a contract that has a payable callback. For the contract case, the transfer() call only provides 2300 gas for the contract to complete its operations. This means the following cases can cause the transfer to fail: \ The contract does not have a payable callback \ The contract's payable callback spends more than 2300 gas (which is only enough to emit something) \ The contract is called through a proxy which itself uses up the 2300 gas \ Use OpenZeppelin's Address.sendValue() instead",
  regex: /payable\([a-z0-9]+\)\.(send|transfer)/gm,
};

export default issue;
