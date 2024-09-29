import { DirType } from '../../Folder';

export function findPath(tree?: DirType[], targetId?: string) {
  let path: string[] = [];
  if (!tree || !targetId) {
    return path;
  }
  function traverse(node: DirType, currentPath: string[]) {
    currentPath.push(node.value);
    if (node.value === targetId) {
      path = [...currentPath];
    } else if (node.children) {
      for (let child of node.children) {
        traverse(child, currentPath);
      }
    }
  }
  for (let child of tree) {
    if (path?.length) break;
    traverse(child, []);
  }
  return path;
}
