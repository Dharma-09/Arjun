import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'No access control on receive/payable fallback',
  regex: /fallback|receive\(\)\s+\w+(?:\s+\w+)*\s+\{[^\}]*\}/g,
  description:"Users may send ETH by mistake to these contracts. As there is no access control on these functions, the funds will be permanently lost.",
};

export default issue;
