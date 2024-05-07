import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use assembly for small keccak256 hashes, in order to save gas',
  description:'Use assembly for small keccak256 hashes, in order to save gas',
  regex: /keccak256\s*\(\s*abi\.encode\s*\(\s*[^)]{1,40}\)\s*\)/gm,
  gasCost:120,
};

export default issue;
