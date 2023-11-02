import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Draft OpenZeppelin Dependencies',
  description:"OpenZeppelin contracts may be considered draft contracts if they have not received adequate security auditing or are liable to change with future development.",
  regex: /\draft/gm,
};

export default issue;
