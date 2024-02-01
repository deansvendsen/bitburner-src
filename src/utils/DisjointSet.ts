export class DisjointSet {
  // https://en.wikipedia.org/wiki/Disjoint-set_data_structure
  // core premise - if two nodes have the same ultimate representative, they're in the same set
  readonly node_count: number;
  set_count: number;
  readonly representative: number[] = [];

  constructor(node_count: number) {
    this.node_count = node_count;
    this.set_count = node_count;
    this.representative = Array(node_count);
    // every node starts as its own representative, i.e. all sets are disjoint
    for (let node = 0; node < node_count; node += 1) this.representative[node] = node;
  }

  getRep(node: number): number {
    let rep: number = this.representative[node];
    if (rep !== this.representative[rep]) rep = this.getRep(rep);
    this.representative[node] = rep;
    return rep;
  }

  isMelded(nodeA: number, nodeB: number): boolean {
    // are nodes A and B in the same set?
    const repA: number = this.getRep(nodeA);
    const repB: number = this.getRep(nodeB);
    // if they have the same ultimate representative, then yes
    return repA === repB;
  }

  meld(nodeA: number, nodeB: number): boolean {
    const repA: number = this.getRep(nodeA);
    const repB: number = this.getRep(nodeB);
    if (repA === repB) return false; // previously melded
    this.representative[repA] = repB; // melding
    this.set_count -= 1;
    return true;
  }
}
