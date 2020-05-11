import { parseFile } from '../parse-file';

describe('parseFile', () => {
  it('when targetFilePath is path, return file name, directory name, and extension name', () => {
    const targetFilePath = 'path/to/file.ts';

    const { fileName, dirName, extensionName } = parseFile(targetFilePath);

    expect(fileName).toEqual('file');
    expect(dirName).toEqual('path/to');
    expect(extensionName).toEqual('ts');
  });
});
