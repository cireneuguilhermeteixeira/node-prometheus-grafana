const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// Create a default register
const register = new client.Registry();
register.setDefaultLabels({
  app: "prometheus-node-poc",
});
client.collectDefaultMetrics({ register });

// Http request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total de requisições HTTP",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpRequestCounter);

// Middleware para contar requisições
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Metric Routes do Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
  console.log(`Metrics running in http://localhost:${port}/metrics`);
});