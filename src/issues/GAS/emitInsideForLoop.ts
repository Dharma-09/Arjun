import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use of emit inside a loop',
  gasCost:1026,
  description:'Emitting an event inside a loop performs a LOG op N times, where N is the loop length. Consider refactoring the code to emit the event only once at the end of loop. Gas savings should be multiplied by the average loop length.',
    regex: /for\s*\([^)]*\)\s*\{[^}]*\bemit\b[^}]*\}/g,
};

export default issue;
//1026