import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "Don't use SafeMath once the solidity version is 0.8.0 or greater",
  description:" 0.8.0 introduces internal overflow checks, so using SafeMath is redundant and adds overhead",
  regex: /import\s+.*from\s+".*\/SafeMath.sol";/g,
};

export default issue;
