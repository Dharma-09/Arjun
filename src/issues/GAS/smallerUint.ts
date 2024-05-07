import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Usage of smaller uint/int types causes overhead',
  description:
    "When using a smaller int/uint type it first needs to be converted to it's 258 bit counterpart to be operated, this increases the gass cost and thus should be avoided. However it does make sense to use smaller int/uint values within structs provided you pack the struct properly.",
  regex: /\b(uint|int)(8|16|32|64|128)\b\s+\w+\s*(?![^()]*event[^()]*;)/gm,
  gasCost:7,
};

export default issue;
// 22-28 gas save per instances