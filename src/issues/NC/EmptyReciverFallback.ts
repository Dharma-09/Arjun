import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Unused/empty receive/fallback',
  regex: /fallback|receive\(\)\s+\w+(?:\s+\w+)*\s+\{[^\}]*\}/g,
  description:"If the intention is for the ETH to be used, the function should call another function, otherwise it should revert `(e.g. require(msg.sender == address(weth)))`.",
};

export default issue;
