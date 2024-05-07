import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Duplicated `require()/revert()` checks chould be refactored to a modifier Or function to save gas',
  regex: /((require|revert)\s*\(\s*([^)]+)\s*\)\s*;(?=.*\1\s*\(\s*\2\s*\)\s*;)|(if\s*\([^)]+\))[\s\S]*\1)/gs,
};

export default issue;
