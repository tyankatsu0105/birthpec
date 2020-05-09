/* eslint-disable-next-line */
const fs = require('fs-extra');

const templatePath = 'src/lib/init/__birthpec';
const distPath = 'dist/lib/init/__birthpec';

fs.copySync(templatePath, distPath);
