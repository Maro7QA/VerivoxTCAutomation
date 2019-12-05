import { PathLike, writeFileSync } from 'fs';
import { EOL } from 'os';
import { ensureDirectoryStructureExists } from '../../tools/fs/ensure-directory-structure-exists';
import { getFileName } from '../../tools/fs/get-filename';
import { getFilePathWithoutExtension } from '../../tools/fs/get-filepath-without-extension';
import { getFuncNameFrom } from '../../tools/fs/get-func-name-from-file-name';
import { getRelativePathOf } from '../../tools/fs/get-relative-path-from';
import { slash } from '../../tools/fs/slash';
import { config } from '../config';

let exportIndex: number = -1;
function nextIndex() {
  exportIndex += 1;
  return exportIndex;
}
export const createStepsBarrel = (barrelFilePath: PathLike) => {
  ensureDirectoryStructureExists(barrelFilePath.toString());
  writeFileSync(barrelFilePath, 'searching steps ...');
  return {
    from: (stepFiles: string[]): void => {
      const lines: string[] = [];
      lines.push(`// this file was auto-generated by '${getRelativePathOf(__filename).from(config.stepsBarrelFile)}'`);
      lines.push('// tslint:disable:max-line-length');
      stepFiles.map((filePath) => {
        const fileName = getFileName(filePath) || `defaultStep${nextIndex()}`;
        const relativePath = getRelativePathOf(filePath).from(barrelFilePath.toString());

        const defaultExportName = getFuncNameFrom(fileName);
        const module = require(filePath);

        module.default
          ? lines.push(
              // tslint:disable-next-line:max-line-length
              `export { default as ${defaultExportName} } from ${config.quoteMark}${slash(
                getFilePathWithoutExtension(relativePath)
              )}${config.quoteMark};`
            )
          : lines.push(
              // tslint:disable-next-line:max-line-length
              `export * from ${config.quoteMark}${slash(getFilePathWithoutExtension(relativePath))}${config.quoteMark};`
            );
      });
      lines.push('');

      writeFileSync(barrelFilePath, lines.join(EOL));
    },
  };
};