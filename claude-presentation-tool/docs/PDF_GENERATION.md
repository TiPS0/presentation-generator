# PDF Generation for CollabX Slides

This project includes a utility to convert the HTML presentation slides into a high-quality PDF using an interactive CLI.

## Prerequisites

- Node.js (Installed and configured)

## Setup

1.  Initialize the project dependencies (if you haven't already):
    ```bash
    npm install
    ```
    This installs `puppeteer`, `inquirer`, and other tools needed for the conversion.

## Generating the PDF

We use an interactive tool to make this easy.

1.  Run the export command:

    ```bash
    npm run export:pdf
    ```

2.  **Select your file**:
    - The tool scans your directory for `.html` files.
    - **Single File**: If only one file is found, enter `Y` to confirm.
    - **Multiple Files**: If multiple files are found, see the numbered list, type the **number** of the file you want, and press **Enter**.

3.  **Output**:
    - The script will generate a PDF in the same directory as the HTML file (e.g., `example.html` -> `example.pdf`).

## How it works

The tool uses a custom script located at `scripts/export-pdf/interactive-export.mjs`.

1.  **Selection**: It asks you which presentation to convert.
2.  **Rendering**: It launches a headless Chrome browser (Puppeteer).
3.  **CSS Injection**: It injects custom Print CSS to handle the slide layout.
    - _Why?_ The presentation uses absolute positioning. The script resets slides to `position: relative` so they stack vertically and forces all elements to be visible (`opacity: 1`).
4.  **Save**: It saves the final PDF.

## Customization

To modify the PDF output (e.g., page size, margins), edit `scripts/export-pdf/generate-pdf.js`:

```javascript
await page.pdf({
  path: pdfFile,
  printBackground: true,
  format: "A4", // Change to 'Letter' or usage specific dimensions
  landscape: true, // Set to false for portrait
  // ...
});
```
