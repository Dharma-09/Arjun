
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "else block is not required",
  description:"Consider moving the logic outside the else block, and then removing it (it's not required, as the function is returning a value). There will be one less level of nesting, which will improve the quality of the codebase.",
  regex: /\s*else\s*{[^{}]*return[^;]*;}?/g,
};

export default issue;
