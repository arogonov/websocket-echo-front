import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './style/css.js';
import { spinnerHtml, spinnerStyle } from './static/spinner.js';
import './WebsocketEchoResultLine.js';

interface WsLogVariant { send?: boolean, info?: boolean, success?: boolean, text: string }

export class WebsocketEcho extends LitElement {
  static styles = [
    styles,
    spinnerStyle,
  ];

  private websocket: WebSocket | null = null;

  private serverRef = createRef<HTMLInputElement>();

  private messageRef = createRef<HTMLTextAreaElement>();

  @property({ type: String, attribute: 'default-server' })
  server = 'wss://websocket-echo-server-97lmp.ondigitalocean.app';

  @state()
  private message = 'Hi!';

  @state()
  private websocketStatus = 0;

  private _wsLog: WsLogVariant[] = [];

  set wsLog(val: WsLogVariant[]) {
    const oldVal = this._wsLog;
    this._wsLog = val;
    this.requestUpdate('prop', oldVal);
  }

  @property({ type: Array })
  get wsLog() { return this._wsLog; }

  get firstButtonContent() {
    if (this.websocketStatus === 2) return 'Disconnect';
    if (this.websocketStatus === 1) return spinnerHtml;
    return 'Connect';
  }

  dropConnection() {
    this.websocket = null;
    this.websocketStatus = 0;
  }

  connectToWebsocket(event: HTMLFormElement) {
    this.server = this.serverRef.value!.value || '';

    if (this.websocket) {
      this.websocket.close(1000);
      this.dropConnection();
    } else {
      this.websocket = new WebSocket(this.server);
      this.websocketStatus = 1;

      this.websocket.onopen = () => {
        this.websocketStatus = 2;
        this.wsLog = [
          { info: true, success: true, text: 'Connection established'},
          ...this.wsLog,
        ];
      };


      this.websocket.onclose = (e) => {
        const addMessage = (e.wasClean) ? 'Connection closed cleanly' : 'Lost connection';
        const reason = (e.reason) ? `; reason: ${e.reason}` : '';

        this.wsLog = [
          {
            info: true,
            success: e.wasClean,
            text: `${addMessage} (code: ${e.code}${reason})`,
          },
          ...this.wsLog,
        ];

        this.dropConnection();
      };

      this.websocket.onmessage = (e: MessageEvent<string>) => {
        this.wsLog = [
          { success: true, text: e.data },
          ...this.wsLog,
        ];
      };

      this.websocket.onerror = () => {
        this.wsLog = [
          {
            info: true,
            success: false,
            text: 'Error',
          },
          ...this.wsLog,
        ];
        this.dropConnection();
      };
    }

    event.preventDefault();
  }

  sendMessage(event: HTMLFormElement) {
    if (this.websocket) {
      this.message = this.messageRef.value!.value || '';
      this.websocket.send(this.message);
      this.wsLog = [
        { success: true, send: true, text: this.message },
        ...this.wsLog,
      ];
    }
    event.preventDefault();
  }

  render() {
    return html`
      <form @submit="${this.connectToWebsocket}">
        <label for="server">Server:</label>
        <input
          id="server"
          type="text"
          placeholder="wss://yourWebsocketServer.ru"
          .disabled="${!!this.websocketStatus}"
          .value="${this.server}"
          ${ref(this.serverRef)}
        />
        <button
          type="submit"
          class=${classMap({ disconnect: this.websocketStatus === 2 })}
          .disabled="${this.websocketStatus === 1}"
        >${this.firstButtonContent}</button>
      </form>

      <form @submit="${this.sendMessage}">
        <label for="message">Message:</label>
        <input
          id="message"
          type="text"
          .value="${this.message}"
          .disabled="${this.websocketStatus !== 2}"
          ${ref(this.messageRef)}
        />
        <button
          type="submit"
          class="button-second"
          .disabled="${this.websocketStatus !== 2}"
        >Send</button>
      </form>

      <ul>
        ${
          this.wsLog.map((el) => html`
            <websocket-echo-result-line
              ?send=${el.send}
              ?info=${el.info}
              ?success=${el.success}
              .text=${el.text}
            >
            </websocket-echo-result-line>
          `)
        }
      </ul>

      <div>
        <a href="https://websocket-echo.netlify.app/" target="_blank">websocket-echo.netlify.app</a>
      </div>
    `;
  }
}
