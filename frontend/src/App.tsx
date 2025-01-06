import "./App.css";
import { Chat } from "./components/chat";
import NavBar from "./components/Navbar";
import { Router } from "./components/router";
import GridBackground from "./components/ui/Grid";
function App() {
  return (
    <>
      <GridBackground />
      <Router />
    </>
  );
}

export default App;
