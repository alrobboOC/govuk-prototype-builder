# GOV.UK Prototype Builder

A drag-and-drop page builder for the [GOV.UK Design System](https://design-system.service.gov.uk/). Build pages visually, then copy the generated Nunjucks views and JavaScript routes into a separate [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/) project.

## Getting started

Open the `govuk-prototype-builder` folder in VS Code and select **Terminal → New Terminal**. With Node.js and npm installed, run:

```bash
npm run dev
```

This pulls the latest updates from this repository's `main` branch, then opens the builder in your default browser using its actual file location. No `npm install` is needed. The command opens the standalone builder; run your Prototype Kit separately to view generated pages.

Automatic updates require an internet connection, the `main` branch and no uncommitted edits to tracked files. If an update cannot be applied safely, the command explains why and opens your existing local builder. Run `npm run builder` to open it without checking for updates.

On macOS, the launcher requests a new tab in Firefox and Safari. Other browsers and systems may open a tab or window according to their settings.

You can also open `index.html` directly in a modern browser without Node.js or npm. Keep `styles.css` in the same folder. On macOS, run this from the builder folder:

```bash
open index.html
```

If the folder is saved elsewhere, use its full path. Alternatively, type `open` followed by a space in Terminal, drag `index.html` from Finder into the terminal window, then press **Enter**.

## Using the builder

1. Drag components from the left panel onto the canvas, or click a component to add it.
2. Select a component and edit its content in the **Properties** tab.
3. Use **+ Add page** to create more pages. Set each page's name and destination in its page settings.
4. Use **Flow** to connect screens and **Preview** to try the journey.
5. Use the **Nunjucks**, **HTML** and **Routes** tabs to copy generated code, or **Export** to download the flow. If clipboard copying is unavailable, select and copy the code manually.

Work is saved in your browser's local storage. Copy your generated code out regularly; clearing browser data can remove your saved work.

## Using the output in the Prototype Kit

Your Prototype Kit project can be saved anywhere, separately from the builder.

For each page you build:

1. Open the **Nunjucks** tab and copy the code.
2. Save it as `app/views/<page-name>.html` in your Prototype Kit project, using the filename shown above the generated code.
3. Open the **Routes** tab. Copy the generated `router.post(...)` handlers into your prototype's `app/routes.js`, below its existing router setup. Include setup declarations only once and replace any previous handlers for the same paths.
4. In a separate terminal, open your prototype's folder and run its usual development command, such as `npm run dev`.
5. Visit the local address printed by your prototype's server, followed by `/<page-name>`, for example `http://localhost:3000/your-name`.

The Routes tab generates handlers for all pages containing forms, so transfer those handlers once for the whole prototype. Pages without forms are served directly from their view files.

Changes in the builder do not automatically update your prototype. Copy updated page code and any changed routes across again.

See the [Prototype Kit documentation](https://prototype-kit.service.gov.uk/docs/) for project setup and supported Node.js versions.

## Project structure

```text
govuk-prototype-builder/
├── index.html              # Builder markup and JavaScript
├── styles.css              # Builder interface and preview styles
├── app.js                  # Upstream component and editor code
├── flow.js                 # Upstream flow view code
├── export.js               # Upstream export code
├── scripts/
│   ├── open-builder.js     # Opens the builder in your default browser
│   └── start-dev.js        # Pulls updates before opening the builder
├── package.json            # npm run dev and npm run builder commands
├── .npmrc                  # Hides npm command banners
└── README.md
```

The builder is standalone, following the approach of the [upstream repository](https://github.com/mrkwrght/govuk-prototype-builder). The npm files and launcher provide a convenience command for opening it.

## Automatic upstream updates

The **Sync upstream builder** GitHub Actions workflow checks the entire upstream repository every hour and mirrors additions, edits and deletions into this repository's `main` branch. It only reads upstream; nothing is pushed there.

Only our `README.md`, `package.json`, `.npmrc`, `scripts/open-builder.js`, `scripts/start-dev.js` and `.github/workflows/sync-upstream.yml` are preserved. All other tracked files follow upstream, including new files and folders. Local edits to those files will be replaced, and tracked files absent from upstream will be removed on the next sync.

After this workflow is pushed to `main`, enable GitHub Actions if prompted. You can also run it from **Actions → Sync upstream builder → Run workflow**. Scheduled checks may be delayed by GitHub. Running `npm run dev` brings updates from GitHub into your local folder automatically before opening the builder. These are the latest changes already synced by the hourly workflow; upstream pushes since the last scheduled sync arrive after the next workflow run.

## Limitations and attribution

The current upstream entry page includes its styles and scripts inline and loads GOV.UK Frontend CSS from a CDN, which requires an internet connection. The separate upstream JavaScript and stylesheet files are also retained unchanged. Check generated pages in your Prototype Kit and compare the output with the relevant Design System guidance.

This is an independent tool and is not affiliated with or endorsed by the Government Digital Service. GOV.UK Design System, GOV.UK Frontend and the Prototype Kit are maintained by GDS; their respective licences and branding terms apply.
