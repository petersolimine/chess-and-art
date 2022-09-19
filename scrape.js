// a react component that displays weather data
export const WeatherComponent = (props) => {
  const { weather } = props;
  return (
    <div>
      <h1>{weather.name}</h1>
      <h2>{weather.main.temp}</h2>
      <h2>{weather.main.humidity}</h2>
      <h2>{weather.main.pressure}</h2>
    </div>
  );
};

export const IndexPage = () => {
  const [weather, setWeather] = React.useState(null);
  React.useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7e6e0f0e7f8a1b7d6c9f1f7f6c8b7a6d"
      );
      const json = await response.json();
      setWeather(json);
    };
    fetchWeather();
  }, []);
  return <div>{weather && <WeatherComponent weather={weather} />}</div>;
};

function findChessWinner(board) {
  // Write your code here
  let winner = null;
  let row = null;
  let col = null;
  let diag = null;
  let antiDiag = null;
  let n = board.length;
  for (let i = 0; i < n; i++) {
    row = 0;
    col = 0;
    for (let j = 0; j < n; j++) {
      row += board[i][j];
      col += board[j][i];
    }
    if (row === n || col === n) {
      winner = "WHITE";
      break;
    } else if (row === -n || col === -n) {
      winner = "BLACK";
      break;
    }
  }
  diag = 0;
  antiDiag = 0;
  for (let i = 0; i < n; i++) {
    diag += board[i][i];
    antiDiag += board[i][n - i - 1];
  }
  if (diag === n || antiDiag === n) {
    winner = "WHITE";
  } else if (diag === -n || antiDiag === -n) {
    winner = "BLACK";
  }
  return winner;
}

function fixMyRelationship(me, her) {
  // Write your code here
  let count = 0;
  let n = me.length;
  for (let i = 0; i < n; i++) {
    if (me[i] !== her[i]) {
      count++;
    }
  }
  return count;
}

function sortWeirdly(arr) {
  // Write your code here
  let n = arr.length;
  let sorted = arr.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      result.push(sorted[i]);
    } else {
      result.unshift(sorted[i]);
    }
  }
  return result;
}

// Crawls webpages and make a sitemap.
function crawl() {
  // Write your code here
  let sitemap = {};
  let queue = [];
  let visited = {};
  queue.push("https://www.google.com");
  while (queue.length > 0) {
    let url = queue.shift();
    if (visited[url]) {
      continue;
    }
    visited[url] = true;
    let links = getLinks(url);
    sitemap[url] = links;
    for (let link of links) {
      queue.push(link);
    }
  }
  return sitemap;
}

// Fetches the given URL, renders it, and extracts all the outbound links. It executes scripts as well before rendering.
function getLinks(url) {
  // Write your code here
  let links = [];
  let doc = fetch(url);
  let scripts = doc.getElementsByTagName("script");
  for (let script of scripts) {
    eval(script);
  }
  let aTags = doc.getElementsByTagName("a");
  for (let aTag of aTags) {
    links.push(aTag.href);
  }
  return links;
}

// function that uses puppeteer to scrape the text off of a webpage
import puppeteer from "puppeteer";
function getText(url) {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const text = await page.evaluate(() => {
      return document.body.innerText;
    });
    await browser.close();
    resolve(text);
  });
}

getText(
  "https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code"
);
