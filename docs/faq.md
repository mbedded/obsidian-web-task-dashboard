---
title: FAQ
description: "A document with common questions regarding this project."
nav_order: 80
---

# FAQ (frequently asked questions)
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

This section addresses common questions and recurring issues.
It is intended to clarify expected behavior, reduce misunderstandings
and provide practical guidance before opening an issue or requesting support.

Thank you for your contribution.
Every improvement matters, whether it is a bug fix, a translation or an enhancement to the documentation.
Each effort helps maintain and improve the plugin for the entire community.
Please refer to the [contribution guide][contribution] for details.

## Which providers are supported?

You can find a list of the currently supported providers in the [Readme file][readme]
or [in the configuration section]({% link docs/Configuration/index.md %}).

## My provider is missing. What should I do?

If a provider you require is not available, you have the following options:

1. **Implement the provider yourself:**
  The project follows an adapter-based architecture.
  You may implement your own provider by writing an adapter that conforms to the existing interfaces.
  Once completed, submit a pull request for review.
  Contributions are expected to follow the project’s coding standards and include basic tests and documentation.
2. **Request for implementation:**
  If implementation is not possible, [open an issue][new-issue] describing the missing provider.
  Provide precise and verifiable information, including:
  - Service or project name.
  - Official website or repository URL.
  - API or documentation link.
  - Brief explanation of the expected use case.

## How can I report bugs or feature requests?

If something is wrong or missing, please [create an issue in GitHub][new-issue].
If you are a developer, feel free to fix the bug or implement the feature and provide a Pull Request.

## Which languages are supported?

The plugin started with DE (German) and EN (English) only.
There is a file for each translation.
The current languages files can be found in the [./locales directory][dir-loc].

## My language is missing. What should I do?

If you notice that your language is not supported in the plugin, you have the following options to improve the translation:

1. **Provide your own translation:**
  If you're familiar with the language, you can create a translation yourself.
  Access the files in the [./locales directory][dir-loc].
  Once you have translated the necessary files, submit a Pull Request to incorporate your translation into the project.
2. **Request for translation:**
  If your language is missing and you would like to see it added, consider [creating an issue][new-issue].
  If you're unsure how to proceed, feel free to create an issue to discuss your request and gather input from the community.

## My language has typos or could be improved. What should I do?

The language files are located in the [./locales directory][dir-loc].
You can improve the localization via Pull Request or open an issue with the desired changes.

## How do I improve this documentation?

Each page has an _Edit this page on GitHub_ link in the footer.
By clicking this link, you may propose corrections, improvements or updates directly to the content
and contribute changes with minimal effort.


[new-issue]: https://github.com/mbedded/obsidian-web-task-dashboard/issues/new
[dir-loc]: https://github.com/mbedded/obsidian-web-task-dashboard/tree/master/locales
[contribution]: https://github.com/mbedded/obsidian-web-task-dashboard/blob/master/docs/CONTRIBUTING.md
[readme]: https://github.com/mbedded/obsidian-web-task-dashboard?tab=readme-ov-file#web-task-dashboard
