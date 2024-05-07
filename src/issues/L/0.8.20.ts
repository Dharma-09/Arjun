import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Solidity version 0.8.20 may not work on other chains due to PUSH0',
  description:"In Solidity 0.8.20's compiler, the default target EVM version has been changed to Shanghai. This version introduces a new op code called PUSH0.\n However, not all Layer 2 solutions have implemented this op code yet, leading to deployment failures on these chains. To overcome this problem, it is recommended to utilize an earlier EVM version.",
  regex: /pragma solidity 0.8.1[1-8];/gm,
};

export default issue;
