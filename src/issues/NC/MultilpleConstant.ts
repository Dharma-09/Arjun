
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Use a single file for system wide constants",
  description:"Consider grouping all the system constants under a single file. This finding shows only the first constant for each file, for brevity.",
  regex: /(?:^|\s)(constant|immutable)\s+(?:\w+\s+)*\w+(?:\s*=\s*[^;]+)?(?:\s*;)/g,
};

export default issue;
