import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Consider using named mappings.",
  description:"Consider moving t.o solidity version 0.8.18 or later, and using named mappings to make it easier to understand the purpose of each mapping",
  regex: /mapping\(address[^a-zA-Z0-9]*$/gm,
};

export default issue;
