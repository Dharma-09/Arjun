
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Inconsistent spacing in comments',
  regex: /\/\/\/?.*?\b\w+\s+\w+\b/gm,
 description:"Some lines use // x and some use //x. The instances below point out the usages that don't follow the majority, within each file",
};

export default issue;
