import { css } from "lit";

const styles = css`
  :host {
    display: block;
    padding: 15px;
    color: #000;
    border: 1px solid #000;
    font-family: system-ui;
    background-color: #f8f8f8;
  }

  h2 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    font-size: 1.2em;
    font-weight: 400;
  }

  form {
    display: grid;
    grid-template-columns: 75px auto 100px;
    gap: 5px;
  }

  form:not(:first-child) {
    margin-top: 10px;
  }

  button {
    position: relative;
  }

  button.disconnect {
    border: 1px solid #610000;
    border-radius: 2px;
    background: #ffe2e2;
  }

  .button-second:not(:disabled) {
    border: 1px solid #006120;
    border-radius: 2px;
    background: #e2ffeb;
  }

  ul {
    margin-block-end: 0em;
    padding-inline-start: 0px;
    list-style: none;
    max-height: 500px;
    overflow-y: auto;
  }

  div {
    text-align: right;
  }

  a {
    font-size: 75%;
  }
`;

export default styles;
