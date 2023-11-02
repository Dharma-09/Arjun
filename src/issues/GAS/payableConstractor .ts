import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Constructors can be marked payable',
  description:' Payable functions cost less gas to execute, since the compiler does not have to add extra checks to ensure that a payment was not provided. A constructor can safely be marked as payable, since only the deployer would be able to pass funds, and the project itself would not pass any funds.',
  regex: /constructor((?!payable).)/g,
  gasCost:21,
};
//per instance 21 gas
export default issue;
