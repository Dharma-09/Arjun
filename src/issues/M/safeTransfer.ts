import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Unsafe ERC20 operation(s)',
  regex: /(\.transferFrom|\.transfer)/gm,
};

export default issue;
