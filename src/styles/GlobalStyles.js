import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #0a0a0a;
    color: #fff;
    font-family: 'Inter', sans-serif;
  }
  
  #root {
    width: 100vw;
    height: 100vh;
     overflow-y: auto;
  }
`;
