
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Use EIP-5627 to describe EIP-712 domains",
  description:"EIP-5267 is a standard which allows for the retrieval and description of EIP-712 hash domains. This enable external tools to allow users to view the fields and values that describe their domain.This is especially useful when a project may exist on multiple chains and or in multiple contracts, and allows users/tools to verify that the signature is for the right fork, chain, version, contract, etc.",
  regex: /EIP712Domain/g,
};

export default issue;
