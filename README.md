# orca-webhook-node

Example Node.js app for receiving Orca Scan [WebHook Out](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42) and sending [WebHook In](https://orcascan.com/guides/how-to-update-orca-scan-from-your-system-4b249706) requests.

## Quick start

```bash
git clone https://github.com/orca-scan/orca-webhook-node.git
cd orca-webhook-node
npm install
npm start
```

Server runs on port **8080**.

## Webhook Out

Orca Scan POSTs JSON to `POST /orca-webhook-out` when a row is added, updated, or deleted. See the [Webhook Out guide](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42) for full details including [security headers](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#security), [import](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#what-information-does-orca-scan-send-when-i-import-data) and [clear](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#what-information-does-orca-scan-send-when-i-clear-data) events.

**System fields** (always present):

| Field | Description |
|---|---|
| `___orca_event` | Event type: `rows:add`, `rows:update`, `rows:delete`, `test` |
| `___orca_sheet_name` | Name of the sheet that triggered the event |
| `___orca_user_email` | Email of the user (only over HTTPS) |

All other fields map directly to your sheet column names _(case and space sensitive)_.

Test it locally with cURL:

```bash
curl --location --request POST 'http://127.0.0.1:8080/orca-webhook-out' \
--header 'Content-Type: application/json' \
--data-raw '{
    "___orca_event": "rows:add",
    "___orca_sheet_name": "Vehicle Checks",
    "___orca_user_email": "hidden@requires.https",
    "___orca_row_id": "5cf5c1efc66a9681047a0f3d",
    "Barcode": "4S3BMHB68B3286050",
    "Make": "SUBARU",
    "Model": "Legacy",
    "Model Year": "2011",
    "Vehicle Type": "PASSENGER CAR",
    "Plant City": "Lafayette",
    "Trim": "Premium",
    "Location": "52.2034823, 0.1235817",
    "Notes": "Needs new tires"
}'
```

> Webhooks are never retried, regardless of the HTTP response.

## Webhook In

Trigger `GET /trigger-webhook-in` to push a row update to Orca Scan via the [Webhook In API](https://orcascan.com/guides/updating-orca-scan-data-from-your-system-4b249706). Update the URL in [server.js](server.js) to point to your sheet:

```
https://api.orcascan.com/sheets/{id}
```

See the [REST API docs](https://orcascan.com/guides/barcode-scanning-rest-api-f09a21c3) for all available endpoints.

## Test against Orca Scan

Use [localtunnel](https://github.com/localtunnel/localtunnel) to expose your local server:

```bash
npx localtunnel --port 8888
```

Then [add the tunnel URL as your Webhook Out endpoint](https://orcascan.com/guides/capture-barcode-scan-events-with-webhooks-da8bbe42#how-to-set-up-a-webhook-out-url) in the Orca Scan web app.

## Troubleshooting

[Chat to us live](https://orcascan.com/#chat) if you run into any issues.

## Examples in other languages

* [orca-webhook-dotnet](https://github.com/orca-scan/orca-webhook-dotnet)
* [orca-webhook-python](https://github.com/orca-scan/orca-webhook-python)
* [orca-webhook-go](https://github.com/orca-scan/orca-webhook-go)
* [orca-webhook-java](https://github.com/orca-scan/orca-webhook-java)
* [orca-webhook-php](https://github.com/orca-scan/orca-webhook-php)

## License

&copy; Orca Scan, the [Barcode Scanner app for iOS and Android](https://orcascan.com).
