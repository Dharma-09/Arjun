import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Using delete instead of setting mapping/struct to 0 saves gas',
  regex: /^\s*\b(?:\w+|(\w+\.\w+))\b\s*=\s*0;/g,
  description:"Avoid an assignment by deleting the value instead of setting it to zero.",
  gasCost:5,
};

export default issue;
