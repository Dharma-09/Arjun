import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
title:'experimental pragmas may be dangerous/deprecated',
description:'experimental pragmas may be dangerous/deprecated',
regex: /pragma experimental/g,
};

export default issue;
