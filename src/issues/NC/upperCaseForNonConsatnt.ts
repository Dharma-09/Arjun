//@audit
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Don't use uppercase for non constant/immutable variables",
  description:"Variables which are not constants or immutable should not be declared in all uppercase.",
  regex: /constant\s[a-z]+/g,
};

export default issue;
