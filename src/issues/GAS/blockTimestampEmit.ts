
import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
title:'Redundant event fields can be removed',
description:"Some parameters (block.timestamp and block.number) are added to event information by default so re-adding them wastes gas, as they are already included.",
regex: /(emit.*block\.timestamp|block\.timestamp.*emit)/gm,
gasCost:358,
};

export default issue;

