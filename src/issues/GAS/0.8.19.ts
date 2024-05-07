import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Reduce gas usage by moving to Solidity 0.8.19 or later',
  regex: /pragma solidity 0.8.1[1-8];/g,
};

export default issue;
