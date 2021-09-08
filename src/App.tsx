import React, { useState, memo } from "react";
import axios from "axios";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

import "./styles.css";

interface IRepository {
  name: string;
}

interface ICommit {
  commit: {
    committer: {
      date: string;
    };
  };
}

interface IGraphData {
  hour: string;
  commits: number;
}

function App() {
  const [graphData, setGraphData] = useState<IGraphData[]>([]);
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRepositories = async (username: string): Promise<string[]> => {
    const { data } = await axios.get<IRepository[]>(
      `https://api.github.com/users/${username}/repos`
    );

    const repositoriesName: string[] = [];

    data.forEach(({ name }) => repositoriesName.push(name));

    return repositoriesName;
  };

  const getCommitsHour = async (
    username: string,
    repositoryName: string
  ): Promise<number[]> => {
    const { data } = await axios.get<ICommit[]>(
      `https://api.github.com/repos/${username}/${repositoryName}/commits`
    );

    const commitsHour: number[] = [];

    data.forEach(({ commit }) => {
      const commitDate = new Date(commit.committer.date);
      const commitHour = commitDate.getHours();
      commitsHour.push(commitHour);
    });

    return commitsHour;
  };

  const fetchDataForGraph = async (username: string): Promise<IGraphData[]> => {
    const data: IGraphData[] = [];

    for (let counter = 0; counter <= 23; counter++) {
      data.push({ hour: `${counter}hrs`, commits: 0 });
    }

    const repositories = await getRepositories(username);

    for (const repositoryName of repositories) {
      const commitsHour = await getCommitsHour(username, repositoryName);

      commitsHour.forEach((commitHour) => data[commitHour].commits++);
    }

    return data;
  };

  const generateGraph = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const data = await fetchDataForGraph(githubUsername);
    setGraphData(data);

    setIsLoading(false);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <section className="input">
        <h1>Insira seu usuário do Github:</h1>
        <form action="submit" onSubmit={generateGraph}>
          <input
            type="text"
            onChange={(e) => setGithubUsername(e.currentTarget.value)}
          />
        </form>

        {isLoading && (
          <div className="load-wrapp">
            <div className="load-9">
              <div className="spinner">
                <div className="bubble-1"></div>
                <div className="bubble-2"></div>
              </div>
            </div>
          </div>
        )}
      </section>

      {graphData.length !== 0 && (
        <section className="graph">
          <ResponsiveBar
            data={graphData as unknown as BarDatum[]}
            keys={["commits"]}
            indexBy="hour"
            margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
            padding={0.2}
            valueScale={{ type: "linear" }}
            colors={{ scheme: "nivo" }}
            colorBy="indexValue"
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          />
        </section>
      )}
    </>
  );
}

export default memo(App);
