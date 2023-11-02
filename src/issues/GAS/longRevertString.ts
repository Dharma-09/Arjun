import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Long revert strings',
  regex: /(revert|require)\(.*,?.(\"|\').{33,}(\"|\')\)/g,
  gasCost:18,
};

export default issue;
