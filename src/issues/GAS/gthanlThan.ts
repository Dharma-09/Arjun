//@audit regex left mapping also include
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: '>=/ <= costs less gas than >/<',
  description:'The compiler uses opcodes GT and ISZERO for solidity code that uses >, but only requires LT for >=,which saves 3 gas',
  regex: /\b\s*(\w+)\s*>/g,
  gasCost:3,
};

export default issue;
