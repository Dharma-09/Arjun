import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: '`abi.encode` is more efficient than `abi.encodePacked`',
  description:'`abi.encode` uses less gas than `abi.encodePacked`: the gas saved depends on the number of arguments, with an average of ~90 per argument. Test available here.',
  gasCost:5,
    regex: /\babi\.encodePacked\b/g,
};

export default issue;
