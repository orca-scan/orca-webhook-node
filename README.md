# orca-webhook-node

Connect [Orca Scan](https://orcascan.com) to your own system using webhooks. When a user scans a barcode and adds, updates, or deletes a row, Orca Scan sends the data to your server in real-time - no polling, no manual exports.

This Node.js example shows you how to:

- **Receive scan data** from Orca Scan as it happens ([Webhook Out](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42))
- **Push data back** into Orca Scan from your own system ([Webhook In](https://orcascan.com/guides/updating-orca-scan-data-from-your-system-4b249706))

## Quick start

```bash
git clone https://github.com/orca-scan/orca-webhook-node.git
cd orca-webhook-node
npm install
npm start
```

Server runs on port **8888**.

## Receiving data from Orca Scan (Webhook Out)

When a barcode is scanned and a row changes, Orca Scan sends a `POST` request to `/orca-webhook-out` with the row data as JSON. You can use this to sync inventory to your database, trigger alerts, update dashboards — whatever your workflow needs.

Every request includes these system fields:

| Field | Description |
|---|---|
| `___orca_event` | `rows:add`, `rows:update`, `rows:delete`, or `test` |
| `___orca_sheet_name` | The sheet that triggered the event |
| `___orca_user_email` | Email of the user _(HTTPS only)_ |

All other fields match your sheet column names exactly _(case and space sensitive)_.

The full docs cover additional events like [import](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#what-information-does-orca-scan-send-when-i-import-data), [clear](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#what-information-does-orca-scan-send-when-i-clear-data), and [security headers](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42#security).

### Test with cURL

```bash
curl -X POST 'http://127.0.0.1:8888/orca-webhook-out' \
-H 'Content-Type: application/json' \
-d '{
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

### Test with Orca Scan

Expose your local server with [localtunnel](https://github.com/localtunnel/localtunnel):

```bash
npx localtunnel --port 8888
```

Then [add the tunnel URL as your Webhook Out endpoint](https://orcascan.com/guides/capture-barcode-scan-events-with-webhooks-da8bbe42#how-to-set-up-a-webhook-out-url) in the Orca Scan web app and hit **Test**.

> Webhooks are fire-and-forget — they are not retried regardless of HTTP response.

## Pushing data into Orca Scan (Webhook In)

Need to update Orca Scan from your own system? Hit `GET /trigger-webhook-in` to push a row into a sheet via the [Webhook In API](https://orcascan.com/guides/updating-orca-scan-data-from-your-system-4b249706).

To connect it to your sheet, update the URL in [server.js](server.js):

```
https://api.orcascan.com/sheets/{id}
```

See the [REST API docs](https://orcascan.com/guides/barcode-scanning-rest-api-f09a21c3) for all available endpoints.

## Examples in other languages

| Language | Repository |
|---|---|
| C# | [orca-webhook-dotnet](https://github.com/orca-scan/orca-webhook-dotnet) |
| Python | [orca-webhook-python](https://github.com/orca-scan/orca-webhook-python) |
| Go | [orca-webhook-go](https://github.com/orca-scan/orca-webhook-go) |
| Java | [orca-webhook-java](https://github.com/orca-scan/orca-webhook-java) |
| PHP | [orca-webhook-php](https://github.com/orca-scan/orca-webhook-php) |

## Help

[Chat to us live](https://orcascan.com/#chat) if you run into any issues.

## License

&copy; Orca Scan, the [Barcode Scanner app for iOS and Android](https://orcascan.com).
