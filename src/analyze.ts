import { InputType, Instance, Issue } from './types';
import { lineFromIndex } from './utils';
import { } from 'readline';

const issueTypesTitles = {
  H: 'High Issues',
  M: 'Medium Issues',
  L: 'Low Issues',
  NC: 'Non Critical Issues',
  GAS: 'Gas Optimizations',
};

/***
 * @notice Runs the given issues on files and generate the report markdown string
 * @param githubLink optional url to generate links
 */

const analyze = (files: InputType, issues: Issue[], githubLink?: string): string => {
  let result = '';
  let analyze: { issue: Issue; instances: Instance[] }[] = [];
  for (const issue of issues) {
    let instances: Instance[] = [];
    // If issue is a regex
    if (issue.regexOrAST === 'Regex') {
      for (const file of files) {
        const matches: any = [...file.content.matchAll(issue.regex)];
        if (!!issue.regexPreCondition) {
          const preConditionMatches: any = [...file.content.matchAll(issue.regexPreCondition)];
          if (preConditionMatches.length == 0) continue;
        }
        for (const res of matches) {
          // Filter lines that are comments
          const line = [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
          const comments = [...res.input?.split('\n')[line].matchAll(/([ \t]*\/\/|[ \t]*\/\*|[ \t]*\*)/g)];
          if (comments.length === 0 || comments?.[0]?.index !== 0) {
            let line = lineFromIndex(res.input, res.index);
            let endLine = undefined;
            if (!!issue.startLineModifier) line += issue.startLineModifier;
            if (!!issue.endLineModifier) endLine = line + issue.endLineModifier;
            instances.push({ fileName: file.name, line, endLine, fileContent: res.input! });
          }
        }
      }
    } else {
      instances = issue.detector(files);
    }
    if (instances.length > 0) {
      analyze.push({ issue, instances });
    }
  }

  /** Summary */

  let totalGasSavingsAcrossAllInstances = 0;
  let c = 0;
  let summaryTable = '';
  let totalIssues = 0;
  let totalInstances = 0;

  if (analyze.length > 0) {
    summaryTable += `\n## ${issueTypesTitles[analyze[0].issue.type]}\n\n`;

    // Determine whether to include the "Total Gas Savings" column
    const includeGasSavingsColumn = analyze.some(({ issue }) => issue.type === 'GAS' && typeof issue.gasCost === 'number');

    if (includeGasSavingsColumn) {
      summaryTable += '\n| |Issue|Instances|Total Gas Savings|\n|-|:-|:-:|:-:|\n';
    } else {
      summaryTable += '\n| |Issue|Instances|\n|-|:-|:-:|\n';
    }

    for (const { issue, instances } of analyze) {
      c++;
      let totalGasSavings = '';

      if (issue.type === 'GAS' && typeof issue.gasCost === 'number') {
        const baseGas = issue.gasCost;
        const numInstances = instances.length;
        totalGasSavings = calculateTotalGas(issue.gasCost, instances.length).toString();
        totalGasSavingsAcrossAllInstances += parseFloat(totalGasSavings);
      }

      if (includeGasSavingsColumn) {
        summaryTable += `| [${issue.type}-${c}](#${issue.type}-${c}) | ${issue.title} | ${instances.length} |\n`; // ${issue.type === 'GAS' ? totalGasSavings : "-"}
      } else {
        summaryTable += `| [${issue.type}-${c}](#${issue.type}-${c}) | ${issue.title} | ${instances.length} | - |\n`;
      }

      // Update total issues and instances
      totalIssues++;
      totalInstances += instances.length;
    }

    // Display the total gas savings only when issue type is 'GAS'
    if (totalGasSavingsAcrossAllInstances > 0) {
      summaryTable += `\n\n### Total Gas Savings for GAS Issues: ${totalGasSavingsAcrossAllInstances} gas\n\n`;
    }

    // Add the total line
    summaryTable += `\n\nTotal: ${totalInstances} instances over ${totalIssues} issues\n`;
    result += summaryTable;
  }

  /** Issue breakdown */
  c = 0;
  for (const { issue, instances } of analyze) {
    c++;
    result += `\n ### <a name="${issue.type}-${c}"></a>[${issue.type}-${c}] ${issue.title}\n`;
    if (!!issue.description) {
      result += `${issue.description}\n`;
    }
    if (!!issue.impact) {
      result += '\n#### Impact:\n';
      result += `${issue.impact}\n`;
    }

    // Check the number of instances
    const useToggleList = instances.length > 7;

    //write all finding into toggle list
    if (useToggleList) {
      result += `\n<details>\n`;
      result += `<summary>There are ${instances.length} instances of this issue:</summary>\n\n`;
      result += `---\n\n`;
    } else {
      result += `\n\nInstances of this issue:\n\n`;
    }


    let previousFileName = '';
    let line = -1;
    let generatedLink = false;
    const instanceLinks = []; 
    for (const o of instances.sort((a, b) => {
      if (a.fileName < b.fileName) return -1;
      if (a.fileName > b.fileName) return 1;
      return !!a.line && !!b.line && a.line < b.line ? -1 : 1;
    })) {
      if (o.fileName !== previousFileName) {
        if (previousFileName !== '') {
          result += `\n${'```'}\n`;
          //   if (!!githubLink && line > 0) {
          //   result += `[[${o.line}]](${generateGitHubLink(githubLink, o.fileName, o.line)})\n`;
          // generatedLink = false; 
          // }
          result += `\n`;
        }
        result += `${'```'}solidity\nFile: ${o.fileName}\n`;
        previousFileName = o.fileName;

      }

      line = o.line || -1;
      // Insert code snippet
      const lineSplit = o.fileContent?.split('\n');
      const offset = o.line.toString().length;
      result += `\n${o.line}: ${lineSplit[o.line - 1]}\n`;
      if (!!o.endLine) {
        let currentLine = o.line + 1;
        while (currentLine <= o.endLine) {
          result += `${' '.repeat(offset)}  ${lineSplit[currentLine - 1]}\n`;
          currentLine++;
        }
      }
      if (!generatedLink && !!githubLink && line > 0) {
        
        const instanceLink = `[[${line}]](${generateGitHubLink(githubLink, previousFileName, line)})\n`;
        instanceLinks.push(instanceLink); // Store the instance link in the array
      }
    }
    result += `\n${'```'}\n`;
    for (const instanceLink of instanceLinks) {
  result += instanceLink + ',';
}
    if (useToggleList) {
      result += `\n</details>\n\n`;
    }
  }

  //Github Link
  function generateGitHubLink(githubLink: string, previousFileName: string, line: number) {
    // Assuming baseUrl ends with a '/'
    return `${githubLink}${previousFileName}#L${line}`;
  }
  // total gas
  function calculateTotalGas(baseGas: number, numInstances: number) {
    return baseGas * numInstances;
  }
  return result;
};



export default analyze;


