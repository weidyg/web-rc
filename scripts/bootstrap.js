const { existsSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');

(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );

  pkgs.forEach((shortName) => {
    const name = `@web-react/${shortName}`;

    const pkgJSONPath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'package.json',
    );
    const pkgJSONExists = existsSync(pkgJSONPath);
    let json = {};
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        main: 'lib/index.js',
        module: 'es/index.js',
        types: 'es/index.d.ts',
        files: ['dist', 'lib', 'es'],
        repository: {
          type: 'git',
          url: 'https://github.com/weidyg/web-react',
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        keywords: [],
        authors: [
          'weidyg <weidyg@163.com> (https://github.com/weidyg)',
        ],
        license: 'MIT',
        peerDependencies: {

        },
        publishConfig: {
          access: 'public',
        },
      };
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    } else if (pkgJSONExists) {
      const pkg = require(pkgJSONPath);
      [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'bin',
        'version',
        'files',
        'authors',
        'types',
        'sideEffects',
        'main',
        'module',
        'description',
      ].forEach((key) => {
        if (pkg[key]) { json[key] = pkg[key] };
      });
    }

    const readmePath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'README.md',
    );
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.

## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}
\`\`\`

or using yarn:

\`\`\`bash
$ yarn add ${name}
\`\`\`
`,
      );
    }
  });
})();
