import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use shift Right/Left instead of division/multiplication if possible',
  regex: /\n[^\/\n]*\/[^\/]?[248]+/g,
  gasCost:20,
};
export default issue;
