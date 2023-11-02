import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Approve type(uint256).max not work with some tokens',
  description:"Source: https://github.com/d-xo/weird-erc20#revert-on-large-approvals--transfers.",
  regex: /.*safeApprove.*type\(uint256\)\.max.*;/gm,
};

export default issue;
