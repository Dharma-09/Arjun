import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Import declarations should import specific identifiers, rather than the whole file',
  description:'Using import declarations of the form import {<identifier_name>} from "some/file.sol" avoids polluting the symbol namespace making flattened files smaller, and speeds up compilation (but does not save any gas)',
  regex: /import\s+("\.\/|"@)/gm,
};

export default issue;
