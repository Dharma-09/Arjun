import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Gas griefing/theft is possible on an unsafe external call',
  regex: /\.call/g,
  description:"A low-level call will copy any amount of bytes to local memory. When bytes are copied from returndata to memory, the memory expansion cost is paid.\n This means that when using a standard solidity call, the callee can 'returnbomb' the caller, imposing an arbitrary gas cost.\n Because this gas is paid by the caller and in the caller's context, it can cause the caller to run out of gas and halt execution.\n Consider replacing all unsafe `call` with `excessivelySafeCall` from this [repository](https://github.com/nomad-xyz/ExcessivelySafeCall).",
};

export default issue;
