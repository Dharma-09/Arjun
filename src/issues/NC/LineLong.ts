import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Lines are too long',
  description:
    'Maximum suggested line length is 120 characters according to the [documentation](https://docs.soliditylang.org/en/latest/style-guide.html#maximum-line-length).',
  regex: /^.{121,}$/gm,
};

export default issue;
