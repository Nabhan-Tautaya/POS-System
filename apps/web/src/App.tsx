import { useEffect } from "react";
import { healthCheck } from "./services/api";

function App() {
  useEffect(() => {
    async function check() {
      const data = await healthCheck();

      console.log(data);
    }

    check();
  }, []);

  return <h1>POS System</h1>;
}

export default App;
