//@audit-ok require testing 
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: "Loss of precision on division",
description:"Solidity doesn't support fractions, so division by large numbers could result in the quotient being zero \n To avoid this, it's recommended to require a minimum numerator amount to ensure that it is always greater than the denominator.",
  regex: /\/\s*.*\s*;/gm,
};

export default issue;
