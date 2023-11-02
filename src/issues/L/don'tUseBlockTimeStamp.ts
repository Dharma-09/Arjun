import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Truncating block.timestamp can reduce the lifespan of a contract',
  description:'Consider removing the casting to extend the lifespan of these contracts.',
  regex: /uint64\(block\.timestamp\)/gm,
};

export default issue;
