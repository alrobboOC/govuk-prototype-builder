# GOV.UK Prototype Builder

A drag-and-drop page builder for the [GOV.UK Design System](https://design-system.service.gov.uk/). Build pages visually, then copy the generated Nunjucks views and JavaScript routes into a [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs/) project.

It works a bit like Figma for GOV.UK pages: pick components, arrange them on a canvas, edit their content, and get code that follows the Design System's own markup and macros.



---

## Getting started

The whole app is one self-contained file, `govuk-builder.html`.

1. Open `govuk-builder.html` in a modern browser (Chrome, Edge, Firefox or Safari), or host it anywhere that serves static files.
2. Start building. There is nothing to install.

You will also need a Prototype Kit project to use the output. To create one:

```bash
npx govuk-prototype-kit create my-prototype
cd my-prototype
open "file://$HOME/govuk-prototype-builder/index.html"
```

See the [Prototype Kit documentation](https://prototype-kit.service.gov.uk/docs/) for details and version requirements.



## Adding your pages to the GOV.UK Prototype Kit

Once you've finished building your pages in the GOV.UK Prototype Builder, you'll need to transfer them into your GOV.UK Prototype Kit project to turn them into a working prototype.

The builder generates the Nunjucks code and JavaScript routes for you, but it does not automatically add them to your Prototype Kit.

Follow these steps to copy your pages across.

### Step 1: Copy the Nunjucks code

1. In the Prototype Builder, select the page you want to add to your prototype.
2. Open the **Nunjucks** tab on the right.
3. Copy the generated code.
4. In VS Code, open your GOV.UK Prototype Kit project.
5. Navigate to the `app/views` folder.
6. Create a new HTML file using the filename shown above the generated code, for example `your-name.html`.
7. Paste the Nunjucks code into the file and save it.

Repeat these steps for each page you've built.

### Step 2: Add the routes

Routes control what happens when someone submits a form, such as moving them to the next page.

1. In the Prototype Builder, open the **Routes** tab.
2. Copy the generated JavaScript code.
3. In VS Code, open `app/routes.js` in your Prototype Kit project.
4. Add the generated routes to the file, keeping any existing routes you need.
5. Save the file.

### Step 3: View your pages in the Prototype Kit

1. Open a terminal in your Prototype Kit project.
2. Run `npm run dev` to start the Prototype Kit.
3. Open `http://localhost:3000` in your browser.
4. Add the page name to the URL to view it. For example, `http://localhost:3000/your-name`.

Your page should now appear in your GOV.UK Prototype Kit, using GOV.UK styles and components.

### Making changes

The Prototype Builder and GOV.UK Prototype Kit do not automatically sync.

If you make changes to a page in the builder, you'll need to copy the updated Nunjucks code into the corresponding HTML file in your Prototype Kit again.

If you've changed how pages connect, you'll also need to update the routes in `app/routes.js`.
