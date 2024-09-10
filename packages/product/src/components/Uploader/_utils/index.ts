import { Key } from "react";
import { DirKey, DirType } from "../typing";

export function findPath(tree?: DirType[], targetId?: DirKey) {
    let path: DirKey[] = [];
    if (!tree || !targetId) { return path; }
    function traverse(node: DirType, currentPath: DirKey[]) {
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