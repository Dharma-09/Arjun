
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Constant names should be UPPERCASE",
  description:"Constants should be named with all capital letters with underscores separating words. Examples: MAX_BLOCKS, TOKEN_NAME. Documentation.",
  regex: /constant\s[a-z]+/g,
};

export default issue;
