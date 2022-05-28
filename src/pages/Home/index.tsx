import { useState, useEffect } from "react";

import {
  UsernameInput,
  CommitsChart,
  Suspense,
  LoadingSpinner,
} from "../../components";

import "./styles.css";

function App() {
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (githubUsername) setIsLoading(false);
  }, [githubUsername]);

  return (
    <div className="app-container">
      <section>
        <h1>Insira seu usuário do Github</h1>
        <UsernameInput setParentUsername={setGithubUsername} />
      </section>
      <Suspense fallback={<LoadingSpinner />} isLoading={isLoading}>
        {/* <CommitsChart chartData={} /> */}
        <h2>Carregou!</h2>
      </Suspense>
    </div>
  );
}

export default App;
