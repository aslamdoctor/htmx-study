import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();

    res.send(`
			<h1 class="text-2xl font-bold my-4">Users</h1>
			<ul>
					${users.map((user) => `<li>${user.name}</li>`).join("")}
			</ul>
		`);
  }, 300);
});

app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);
    res.send(`
		<p>${fahrenheit} degreees Fahrenheit is equal to ${celsius.toFixed(
      2
    )}  degrees celcius.</p>
		`);
  }, 300);
});

let counter = 0;

app.get("/poll", (req, res) => {
  counter++;
  const data = { value: counter };

  res.json(data);
});

let currentTemp = 20;

app.get("/get-temperature", (req, res) => {
  currentTemp += Math.random() * 2 - 1;
  res.send(currentTemp.toFixed(1) + " celcius");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
