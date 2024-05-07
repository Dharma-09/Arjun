import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Use of transfer instead of safeTransfer',
  description:'It is good to add a `require` statement that checks the return value of token transfers or to use something like OpenZeppelin’s `safeTransfer/safeTransferFrom` unless one is sure the given token reverts in case of a failure. Failure to do so will cause silent failures of transfers and affect token accounting in contract.',
  regex: /(\.transferFrom|\.transfer)/gm,
};

export default issue;
