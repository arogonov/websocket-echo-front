import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('websocket-echo-result-line')
export class WebsocketEchoResultLine extends LitElement {
	static styles = css`
		li::before {
			content: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><defs/><path d="M506.13 241.84l-.01-.02-104.5-104a20 20 0 00-28.23 28.36L443.56 236H20a20 20 0 100 40h423.56l-70.16 69.82a20 20 0 1028.21 28.36l104.5-104 .03-.02a20.02 20.02 0 000-28.32z"/></svg>');
			opacity: 0.5;
			margin-top: 3px;
		}

		li {
			background-color: #fcd0d0;
			display: grid;
			grid-auto-flow: column;
			grid-template-columns: min-content auto;
			gap: 5px;
			padding-left: 5px;
			padding-right: 5px;
			font-size: 0.9em;
			border-bottom: 1px solid #ddd;
		}

		:host([send]) > li::before {
			content: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><defs/><path d="M492 236H68.44l70.17-69.82a20 20 0 10-28.22-28.36l-104.5 104-.02.02a20.02 20.02 0 000 28.32l.01.02 104.5 104a20 20 0 0028.22-28.36L68.44 276H492a20 20 0 100-40z"/></svg>');
		}

		:host([info]) > li::before {
			content: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><defs/><path d="M437.02 74.98C388.67 26.63 324.38 0 256 0 187.62 0 123.33 26.63 74.98 74.98 26.63 123.33 0 187.62 0 256c0 68.38 26.63 132.67 74.98 181.02C123.33 485.37 187.62 512 256 512c68.38 0 132.67-26.63 181.02-74.98C485.37 388.67 512 324.38 512 256s-26.63-132.67-74.98-181.02zM256 480.65C132.13 480.65 31.35 379.87 31.35 256S132.13 31.35 256 31.35c123.88 0 224.65 100.78 224.65 224.65S379.88 480.65 256 480.65z"/><path d="M256 83.6c-25.93 0-47.02 21.09-47.02 47.01s21.1 47.02 47.02 47.02 47.02-21.1 47.02-47.02S281.92 83.6 256 83.6zm0 62.69a15.69 15.69 0 010-31.35c8.64 0 15.67 7.03 15.67 15.67S264.64 146.3 256 146.3zM208.98 208.98v219.43h94.04V208.98h-94.04zm62.7 188.08h-31.35V240.33h31.34v156.73z"/></svg>');
		}

		:host([success]) > li {
			background-color: #edffdc;
		}
	`;

	@property({ type: String, reflect: true })
	text = '';

	render() {
		return html`
			<li>
				<span>${this.text}</span>
			</li>
		`;
	}
}
