import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Remove import forge-std',
  description:"It's used to print the values of variables while running tests to help debug and see what's happening inside your contracts but since it's a development tool, it serves no purpose on mainnet. Also, the remember to remove the usage of calls that use forge-std when removing of the import of forge-std",
  regex: /import\s+"forge-std/g,
};

export default issue;
