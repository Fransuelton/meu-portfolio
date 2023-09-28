import { createGlobalStyle } from "styled-components";
import { Header } from "./components/layout/header";
import { Main } from "./components/layout/main";
import { About } from "./components/layout/about";
import { Skills } from "./components/layout/skills";
import { Footer } from "./components/layout/footer";
import { Contact } from "./components/layout/contact";
import { Projects } from "./components/layout/projects";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Sora", sans-serif;
}

html {
  font-size: 62.5%;
}

ul {
  list-style: none;
}

a {
  color: #ffffff;
}

body {
  background-color: var(--primary-color);
}

`;

export default App;
