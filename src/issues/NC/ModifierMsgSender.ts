import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use a modifier instead of require to check for msg.sender',
  description:
    'If some functions are only allowed to be called by some specific users, consider using a modifier instead of checking with a require statement, especially if this check is done in multiple functions.',
  regex: /require\s*\(\s*([^=,]+)\s*==\s*msg\.sender\s*,\s*"([^"]*)"\s*\);/g,
};

export default issue;
