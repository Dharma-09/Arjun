import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use transfer libraries instead of low level calls',
  regex: /\.call\{/g,
  description:"Consider using SafeTransferLib.safeTransferETH or Address.sendValue for clearer semantic meaning instead of using a low level call.",
};

export default issue;
