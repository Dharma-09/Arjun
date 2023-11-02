
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: "Array lacks use of the pop function",
  description:"There are some arrays that can grow indefinitely in size, as they never shrink: this can lead to inefficient memory management and increase the likelihood of out-of-gas errors.",
  regex: /\.push\(/g,
};

export default issue;
