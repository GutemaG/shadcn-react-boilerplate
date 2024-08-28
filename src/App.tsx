import { DefaultLayout } from "./components/ui/layout/DefaultLayout";
import { Routing } from "./routes/Routing";

function App() {
  // set fake token to local storage
  localStorage.setItem("token", "fake-token");

  return (
    <DefaultLayout>
      <Routing />
    </DefaultLayout>
  );
}

export default App;
