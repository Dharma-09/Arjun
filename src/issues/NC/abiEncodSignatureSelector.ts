
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Use abi.encodeCall() instead of abi.encodeWithSignature()/abi.encodeWithSelector()",
  description:"abi.encodeCall() has compiler [type safety](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/3693), whereas the other two functions do not",
  regex: /abi\.encodeWith(Signature|Selector)\(/gm,
};

export default issue;
