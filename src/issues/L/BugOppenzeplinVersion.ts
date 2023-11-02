import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Project has vulnarable NPM dependency version',
  description:"Upgrade Openzeppelin versi,on to version 4.9.2 or higher. \n Check https://security.snyk.io/package/npm/@openzeppelin%2Fcontracts and \n https://security.snyk.io/package/npm/@openzeppelin%2Fcontracts-upgradeable for more information.",
  regex: /("@openzeppelin\/contracts"\s*([<:>]+)\s*\s*"(4\.[0-8](\.\d+)?)",|"@openzeppelin\/contracts-upgradeable"\s*([<:>]+)\s*"(\s*(4\.[0-8](\.\d+)?))",)/gm,
};

export default issue;
