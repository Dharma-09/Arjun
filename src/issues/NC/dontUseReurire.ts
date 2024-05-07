import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Custom errors should be used rather than `revert()/require()`",
  description:"Custom errors are available from solidity version 0.8.4. Custom errors are more easily processed in try-catch blocks, and are easier to re-use and maintain",
    regex: /((?![^\n]*(uint|int|public))[^\n]*)([[:blank:]]|\()((?!(10|1e|32|256|128))[0-9e]{2,})/g,
};

export default issue;
