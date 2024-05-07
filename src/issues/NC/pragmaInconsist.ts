
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Inconsistent method of specifying a floating pragma",
  description:"Some files use >=, while others use ^. The instances below are examples of the method that has the fewest instances for a specific version.",
  regex: /pragma\s+solidity\s+(([>=<]|\^)=?\s*[0-9]*\.[0-9]+\.[0-9]+)(?:\s*;|$)/g,
};

export default issue;
