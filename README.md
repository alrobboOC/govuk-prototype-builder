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
npm start
```

See the [Prototype Kit documentation](https://prototype-kit.service.gov.uk/docs/) for details and version requirements.


## Using the output in the Prototype Kit

For each page you build:

1. Open the **Nunjucks** tab for that page and copy the code.
2. Save it as `app/views/<page-name>.html` in your Prototype Kit project. The label above the code box shows the file name.
3. Open the **Routes** tab and copy the code into `app/routes.js`.
4. Run the kit (`npm start`) and visit `/<page-name>`.

A generated page looks like this:

```njk
{% extends "layouts/main.html" %}

{% from "govuk/components/radios/macro.njk" import govukRadios %}
{% from "govuk/components/button/macro.njk" import govukButton %}

{% block pageTitle %}
  Page title
{% endblock %}

{% block content %}
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <form method="post" novalidate>
      {# Radios: https://design-system.service.gov.uk/components/radios/ #}
      {{ govukRadios({ ... }) }}

      {{ govukButton({ text: "Continue" }) }}
    </form>
  </div>
</div>
{% endblock %}
```

The generated code targets `layouts/main.html` and the `govuk-prototype-kit` router API found in recent Prototype Kit versions. If you use an older version, you may need to adjust the layout name, import paths or router setup.
