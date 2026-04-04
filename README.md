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

Orca Scan POSTs JSON to `POST /orca-webhook-out` when a row is added, updated, or deleted.

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

Trigger `GET /trigger-webhook-in` to push a row update to Orca Scan. Update the URL in [server.js](server.js) to point to your sheet:

```
https://api.orcascan.com/sheets/{id}
```

## Test against Orca Cloud

Use [localtunnel](https://github.com/localtunnel/localtunnel) to expose your local server:

```bash
npx localtunnel --port 8080
```

Then set the tunnel URL as your Webhook Out endpoint in the Orca Scan app.

## Troubleshooting

[Chat to us live](https://orcascan.com/#chat) if you run into any issues.

## Examples in other languages

* [orca-webhook-dotnet](https://github.com/orca-scan/orca-webhook-dotnet)
* [orca-webhook-python](https://github.com/orca-scan/orca-webhook-python)
* [orca-webhook-go](https://github.com/orca-scan/orca-webhook-go)
* [orca-webhook-java](https://github.com/orca-scan/orca-webhook-java)
* [orca-webhook-php](https://github.com/orca-scan/orca-webhook-php)

## History

For change-log, check [releases](https://github.com/orca-scan/orca-webhook-node/releases).

## License

&copy; Orca Scan, the [Barcode Scanner app for iOS and Android](https://orcascan.com).