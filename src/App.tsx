import React, { useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import "./styles.css";

interface IRepositoriesResponse {
  data: { name: string }[];
}

interface ICommitsResponse {
  data: {
    commit: {
      committer: {
        date: string;
      };
    };
  }[];
}

function App() {
  const data = [
    {
      hour: "0hrs",
      commits: 0,
    },
    {
      hour: "1hrs",
      commits: 0,
    },
    {
      hour: "2hrs",
      commits: 0,
    },
    {
      hour: "3hrs",
      commits: 0,
    },
    {
      hour: "4hrs",
      commits: 0,
    },
    {
      hour: "5hrs",
      commits: 0,
    },
    {
      hour: "6hrs",
      commits: 0,
    },
    {
      hour: "7hrs",
      commits: 0,
    },
    {
      hour: "8hrs",
      commits: 0,
    },
    {
      hour: "9hrs",
      commits: 0,
    },
    {
      hour: "10hrs",
      commits: 0,
    },
    {
      hour: "11hrs",
      commits: 0,
    },
    {
      hour: "12hrs",
      commits: 0,
    },
    {
      hour: "13hrs",
      commits: 0,
    },
    {
      hour: "14hrs",
      commits: 0,
    },
    {
      hour: "15hrs",
      commits: 0,
    },
    {
      hour: "16hrs",
      commits: 0,
    },
    {
      hour: "17hrs",
      commits: 0,
    },
    {
      hour: "18hrs",
      commits: 0,
    },
    {
      hour: "19hrs",
      commits: 0,
    },
    {
      hour: "20hrs",
      commits: 0,
    },
    {
      hour: "21hrs",
      commits: 0,
    },
    {
      hour: "22hrs",
      commits: 0,
    },
    {
      hour: "23hrs",
      commits: 0,
    },
  ];

  const [githubUsername, setGithubUsername] = useState<string>("");
  const [githubData, setGithubData] = useState(data);
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getCommitsHour(username: string) {
    const commitsHourOfAllRepositories: number[] = [];

    const getRepositoriesResponse = (await axios.get(
      `https://api.github.com/users/${username}/repos`
    )) as IRepositoriesResponse;

    const { data } = getRepositoriesResponse;

    const repositoriesName = data.map((data) => data.name);

    for (const repositoryName of repositoriesName) {
      try {
        const getCommitsResponse = (await axios.get(
          `https://api.github.com/repos/${username}/${repositoryName}/commits`
        )) as ICommitsResponse;

        const { data } = getCommitsResponse;

        data.forEach(({ commit }) => {
          const commitDate = new Date(commit.committer.date);

          const commitHours = commitDate.getHours();

          commitsHourOfAllRepositories.push(commitHours);
        });
      } catch {}
    }

    return commitsHourOfAllRepositories;
  }

  const generateGraph = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const commitsHour = await getCommitsHour(githubUsername);

    console.log("Quantidade de commits:", commitsHour);

    const graphicInfo = {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
    };

    commitsHour.forEach((hour) => {
      switch (hour) {
        case 0:
          graphicInfo["0"] += 1;
          break;
        case 1:
          graphicInfo["1"] += 1;
          break;
        case 2:
          graphicInfo["2"] += 1;
          break;
        case 3:
          graphicInfo["3"] += 1;
          break;
        case 4:
          graphicInfo["4"] += 1;
          break;
        case 5:
          graphicInfo["5"] += 1;
          break;
        case 6:
          graphicInfo["6"] += 1;
          break;
        case 7:
          graphicInfo["7"] += 1;
          break;
        case 8:
          graphicInfo["8"] += 1;
          break;
        case 9:
          graphicInfo["9"] += 1;
          break;
        case 10:
          graphicInfo["10"] += 1;
          break;
        case 11:
          graphicInfo["11"] += 1;
          break;
        case 12:
          graphicInfo["12"] += 1;
          break;
        case 13:
          graphicInfo["13"] += 1;
          break;
        case 14:
          graphicInfo["14"] += 1;
          break;
        case 15:
          graphicInfo["15"] += 1;
          break;
        case 16:
          graphicInfo["16"] += 1;
          break;
        case 17:
          graphicInfo["17"] += 1;
          break;
        case 18:
          graphicInfo["18"] += 1;
          break;
        case 19:
          graphicInfo["19"] += 1;
          break;
        case 20:
          graphicInfo["20"] += 1;
          break;
        case 21:
          graphicInfo["21"] += 1;
          break;
        case 22:
          graphicInfo["22"] += 1;
          break;
        case 23:
          graphicInfo["23"] += 1;
          break;
      }
    });

    data.forEach((_, index) => {
      for (const [key, value] of Object.entries(graphicInfo)) {
        if (`${index}` === key) {
          data[index].commits = value;
        }
      }
    });

    console.log(data);
    setGithubData(data);

    setIsLoading(false);
    setDataIsFetched(true);
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <section className="input">
        <h1>Insira seu usuário do Github:</h1>
        <form action="submit" onSubmit={generateGraph}>
          <input
            type="text"
            onChange={(event) => setGithubUsername(event.currentTarget.value)}
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
      {dataIsFetched && (
        <section className="graph">
          <ResponsiveBar
            data={githubData}
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

export default App;
