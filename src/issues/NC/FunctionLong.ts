import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Long functions should be refactored into multiple functions',
  description:
    'Consider splitting long functions into multiple, smaller functions to improve the code readability.',
  regex: /^function.{60,}/g,
};

export default issue;
