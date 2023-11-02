import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "The use of a logical AND (&&) instead of double if is slightly less gas efficient in instances where there isn't a corresponding else statement for the given if statement",
  description:'Using a double if statement instead of logical AND (&&) can provide similar short-circuiting behavior whereas double if is slightly more efficient.',
  regex: /if\(.*&&.*\);/g,
  gasCost:2100,
};

export default issue;