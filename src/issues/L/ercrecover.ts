import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Use of ecrecover is susceptible to signature malleability',
  description:"The built-in EVM precompile ecrecover is susceptible to signature malleability, which could lead to [replay attacks](https://medium.com/cryptronics/signature-replay-vulnerabilities-in-smart-contracts-3b6f7596df57).\n Consider using OpenZeppelin’s [ECDSA library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/ECDSA.sol#L125-L128) instead of the built-in function.",
  regex: /ecrecover\(/gm,
};

export default issue;
