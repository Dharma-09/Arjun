import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Multiplication/division by two should use bit shifting',
  description:"X * 2 is equivalent to X << 1 and X / 2 is the same as X >> 1.\n The MUL and DIV opcodes cost 5 gas, whereas SHL and SHR only cost 3 gas.",
  regex: /([\w\.\[\]\(\)]+)\s*([*/])\s*(2|4|8|16|32|64|128|256|512|1024|2048)\b/g,
  gasCost:20,
};

export default issue;
