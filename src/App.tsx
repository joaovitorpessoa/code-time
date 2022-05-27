import React, { useState, useEffect } from "react";

import {
  UsernameInput,
  CommitsChart,
  Suspense,
  LoadingSpinner,
} from "./components";

function App() {
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // if (githubUsername) setIsLoading(prevState => !prevState);
    if (githubUsername) setIsLoading(false);
  }, [githubUsername]);

  return (
    <div className="app-container">
      <section id={"_1"}>
        <h1>Insira seu usuário do Github</h1>
        <UsernameInput setParentUsername={setGithubUsername} />
      </section>
      <section>
        <Suspense fallback={<LoadingSpinner />} isLoading={isLoading}>
          {/* <CommitsChart chartData={} /> */}
          <h2>Carregou!</h2>
        </Suspense>
      </section>
    </div>
  );
}

export default App;
