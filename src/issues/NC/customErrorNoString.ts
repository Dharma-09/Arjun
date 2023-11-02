import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Custom error without details',
  description:
    'Consider adding some parameters to the error to indicate which user or values caused the failure.',
  regex: /error\s+(\w+_\w|\w)+\s*\(\s*\);/g,
};

export default issue;
