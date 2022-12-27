import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('smp-hello-world')
export class SmpHelloWorld extends LitElement {
  @property() message = 'Learn LitElement';

  render() {
    return html`
      <div>
        Hello From Lit, here's your message "${this.message}"
      </div>
    `;
  }
}
