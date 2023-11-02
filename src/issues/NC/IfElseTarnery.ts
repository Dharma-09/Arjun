
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Use a ternary statement instead of if/else when appropriate",
description:"The if/else statement can be written in a shorthand way using the ternary operator, as it increases readability and reduces the number of lines of code.",
  regex: /if\s*\([^)]+\)\s*{[^{}]*}\s*else\s*{[^{}]*}/g,
};

export default issue;

//need optimization all if else take