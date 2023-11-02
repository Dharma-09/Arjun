
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "Don't compare boolean expressions to boolean literals",
  description:'true and false are constants and it is more expensive comparing a boolean against them than directly checking the returned boolean value. `if (<x> == true)` => `if (<x>)`, `if (<x> == false)` => `if (!<x>)`',
  regex: /==+.(true|false)/g,
  gasCost:9,
};

export default issue;
