import { Layout } from "./components/Layout";
import { Crosshair } from "./components/Crosshair";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Crosshair />
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export default App;
