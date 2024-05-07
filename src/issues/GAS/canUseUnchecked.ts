//@audit import also take
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'For Operations that will not overflow, you could use unchecked',
  regex: /([^"]*)\s*-\s*([^"]*);/gm,
  gasCost:85,
};

export default issue;
