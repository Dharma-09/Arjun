import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Event emit should emit a parameter',
  description:'Some emitted events do not have any emitted parameters. It is recommended to add some parameter such as state changes or value changes when events are emitted',
  regex: /\bevent\s+(\w+)\s*\(\s*\)\s*;/gm,
};

export default issue;
