const { existsSync, mkdirSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');
const { Console } = require('console');

(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter((pkg) => pkg.charAt(0) !== '.');

  pkgs.forEach((shortName) => {
    const name = `@web-rc/biz-${shortName}`;
    const pkgPath = join(__dirname, '..', 'packages', shortName);

    let json = {};
    const pkgJSONPath = join(pkgPath, 'package.json');
    const pkgJSONExists = existsSync(pkgJSONPath);
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        main: 'lib/index.js',
        module: 'es/index.js',
        types: 'es/index.d.ts',
        files: ['dist', 'lib', 'es'],
        scripts: {
          build: 'father build',
        },
        repository: {
          type: 'git',
          url: 'https://github.com/weidyg/web-rc',
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        keywords: [],
        authors: ['weidyg <weidyg@163.com> (https://github.com/weidyg)'],
        license: 'MIT',
        publishConfig: {
          access: 'public',
        },
        peerDependencies: {
          "@web-rc/biz-provider": ">=0.0.1",
          "@web-rc/biz-utils": ">=0.0.1",
          "antd": ">=5.20.0",
          "react": ">=18.0.0"
        }
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
        if (pkg[key]) {
          json[key] = pkg[key];
        }
      });
    }

    const readmePath = join(pkgPath, 'README.md');
    if (args.force || !existsSync(readmePath)) {
      const readmeText = `# ${name}

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
      `;
      writeFileSync(readmePath, readmeText);
    }

    const tsconfigPath = join(pkgPath, 'tsconfig.json');
    if (args.force || !existsSync(tsconfigPath)) {
      const tsconfigJson = {
        extends: '../../tsconfig.json',
        include: ['./src'],
      };
      writeFileSync(tsconfigPath, `${JSON.stringify(tsconfigJson, null, 2)}\n`);
    }

    const fatherrcPath = join(pkgPath, '.fatherrc.ts');
    if (args.force || !existsSync(fatherrcPath)) {
      const fatherrcConfig = `import { defineConfig } from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
});
 `;
      writeFileSync(fatherrcPath, fatherrcConfig);
    }

    const srcIndexPath = join(pkgPath, 'src', 'index.tsx');
    if (args.force || !existsSync(srcIndexPath)) {
      const srcDir = join(pkgPath, 'src');
      if (!existsSync(srcDir)) { mkdirSync(srcDir); }
      writeFileSync(srcIndexPath, `export * from './components';`);
    }

    const componentsIndexPath = join(pkgPath, 'src', 'components', 'index.tsx');
    console.log(`${existsSync(componentsIndexPath)} ${componentsIndexPath}`);
    // if (!existsSync(componentsIndexPath)) {
    //   const srcDir = join(pkgPath, 'src', 'components');
    //   if (!existsSync(srcDir)) { mkdirSync(srcDir); }
    //   writeFileSync(srcIndexPath, `export { };`);
    // }
  });
})();
