import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "`2**<n> - 1` should be re-written as `type(uint<n>).max`",
  description:"Earlier versions of solidity can use uint<n>(-1) instead. Expressions not including the - 1 can often be re-written to accomodate the change (e.g. by using a > rather than a >=, which will also save some gas).",
  regex: /(2 \*\* (\d+)\s*-\s*1|2\*\*(\d+)\s*-\s*1)/g,
};

export default issue;
