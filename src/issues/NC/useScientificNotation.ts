
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Use of exponentiation instead of scientific notation",
  description:"Use a scientific notation rather than exponentiation (e.g. 1e18 instead of 10**18): although the compiler is capable of optimizing it, it is considered good coding practice to utilize idioms that don't rely on compiler optimization, whenever possible.",
  regex: /10\*\*\d+/gm,
};

export default issue;
