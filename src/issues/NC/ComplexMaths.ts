
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Complex math should be split into multiple steps",
  description:"Consider splitting long arithmetic calculations into multiple steps to improve the code readability.",
  regex: /(\([^()]+\)|\d+)\s*[-+*/]\s*(\([^()]+\)|\d+)/g,
};

export default issue;
