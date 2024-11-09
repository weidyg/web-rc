const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const prettier = require('prettier');
const { json } = require('stream/consumers');

// utils must build before core
// runtime must build before renderer-react
let componentsPackageJson;
let packagesPath = join(__dirname, '../packages');

const pkgPathList = readdirSync(packagesPath)
  .filter((pkg) => pkg.charAt(0) !== '.');

const pkgList = pkgPathList.map((pkg) => {
  const package_path = join(packagesPath, pkg);
  const packageJsonPath = join(package_path, 'package.json');
  if (!existsSync(packageJsonPath)) { return; }
  const json = require(packageJsonPath);
  if (pkg == 'components') { componentsPackageJson = json; }
  return {
    name: json.name,
    version: json.version,
  };
});

const pkgVers = pkgList
  .filter((f) => f !== undefined)
  .map((pak) => {
    return `"${pak.name}": '${pak.version}'`;
  })

const file_content = `
export const version = {
    ${pkgVers.join(',\n    ')}    
}
`;

writeFileSync(
  join(packagesPath, 'components', '/src/version.ts'),
  prettier.format(file_content, { parser: 'typescript' }).toString(),
);

if (componentsPackageJson) {
  const packageJson = {
    ...componentsPackageJson,
    dependencies: JSON.parse(`{
          ${pkgVers.join(',\n    ')}    
    }`),
  }
  const pkgJSONPath = join(packagesPath, 'components', 'package.json');
  writeFileSync(pkgJSONPath, `${JSON.stringify(packageJson, null, 2)}\n`);
}

