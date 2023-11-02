
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Contract functions should use an interface",
  description:"All external/public functions should extend an interface. This is useful to make sure that the whole API is extracted.",
  regex: /\bfunction\s+\w+\s*\(.*\)\s+(?:external|public)/g,
};

export default issue;
