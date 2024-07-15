import { isArray } from "lodash";

export interface Node {
  [key: string]: any;
  parent?: Node;
  children?: Node[];
}

export type NodeProcessor = (node: Node, parent: Node | undefined) => void;

export function hierarchize(
  node: Node,
  parent: Node | undefined,
  nodeProcessor: NodeProcessor,
  childrenKey: string = "children",
  parentKey: string = "parent",
): Node {
  node[parentKey] = parent;
  nodeProcessor && nodeProcessor(node, parent);
  if (isArray(node[childrenKey])) {
    node[childrenKey].forEach((child: Node) =>
      hierarchize(child, node, nodeProcessor, childrenKey, parentKey),
    );
  }
  return node as Node;
}

export function getParents(
  node: Node,
  parents: Node[] = [],
  parentKey: string = "parent",
): Node[] {
  const nodes = [node, ...parents];
  if (node[parentKey]) return getParents(node[parentKey], nodes, parentKey);
  return nodes;
}

export function findNode(
  node: Node,
  matcher: (node: Node) => boolean,
  childrenKey: string = "children",
): Node | null {
  if (matcher(node)) return node;
  else if (node[childrenKey]) {
    for (let child of node[childrenKey]) {
      let found = findNode(child, matcher, childrenKey);
      if (found) return found;
    }
  }
  return null;
}
