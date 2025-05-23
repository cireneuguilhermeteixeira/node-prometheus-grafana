# Adding Prometheus

Installing prometheus on the machine via terminal.
Creating a yml file that indicates which port it will listen on

'sudo prometheus --config.file=prometheus.yml'

Installing prom-client in the node project.

Configuring the '/metrics' endpoint in the Node.js application itself.

Collecting default metrics (CPU, memory, event loop) via collectDefaultMetrics.

We created a custom metric using the Counter
http_requests_total

# Prometheus integration with Grafana
Install Grafana via Docker, expose the port so it can communicate with Prometheus
configure in Grafana informing the Prometheus url

![image](https://github.com/user-attachments/assets/dd1762e2-8453-4086-a2a8-7d8d4d96bf78)

![image](https://github.com/user-attachments/assets/5edca576-09af-40a6-9791-836e96c5469e)



# Integration with appmetrics
Installation of the metrics app and the appmetrics-dash
dashboard can be visible at the url
http://localhost:3001/appmetrics-dash/

![image](https://github.com/user-attachments/assets/8d4ed723-40a8-4a46-a48a-625bd1aae7e6)


# Tradeoffs between appmetrics/prom-client

| **Scenario**                                                | **Best choice**                                  |
|-------------------------------------------------------------|--------------------------------------------------|
| Local development, quick diagnosis                          | ✅ `appmetrics` + `appmetrics-dash`               |
| Formal monitoring, production                               | ✅ `prom-client` + Prometheus + Grafana           |
| Exposing metrics in the Prometheus standard                 | ✅ `prom-client`                                 |
| Integration with IBM Health Center via MQTT                 | ✅ `appmetrics`                                  |
| Customization of metrics (business, domain specific)        | ✅ `prom-client`                                 |
