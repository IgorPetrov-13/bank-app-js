export class Layout {
  constructor({ router, children }) {
    this.router = router;
    this.children = children;
  }

  render() {
    const headerHTML = '<header>HEADER</header>';

    return `
    
    ${headerHTML}
    <main>
      ${this.children}
    </main>

    `;
  }
}
