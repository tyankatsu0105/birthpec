/* eslint-disable-next-line */
const fs = require('fs-extra');

const templatePath = 'src/lib/init/templates';
const distPath = 'dist/lib/init/templates';

fs.copySync(templatePath, distPath);
