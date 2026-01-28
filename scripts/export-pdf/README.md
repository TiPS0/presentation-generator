# PDF Export Scripts

This directory contains the source code for the PDF generation tools.

**For usage instructions, please see the main documentation:**
[PDF Generation Docs](../../claude-presentation-tool/docs/PDF_GENERATION.md)

---

## File Overview

### 1. `interactive-export.mjs` (The Manager)

This is the CLI entry point.

- **Run via**: `npm run export:pdf`
- **Purpose**: Handles user interaction.
  - Scans the root directory for `.html` files.
  - Presents a selection menu (numbered list) or auto-confirms if only one file exists.
  - Spawns the worker process.

### 2. `generate-pdf.js` (The Worker)

This is the Puppetter script.

- **Purpose**: Performs the actual HTML-to-PDF conversion.
- **Key Logic**: Injects "Print CSS" to ensure slides are visible and stacked vertically (resolving issues with absolute positioning in the web view).
- **Inputs**: Accepts the input filename as a command-line argument.

## Maintenance

If you need to change the **page size** or **print margins**, edit `generate-pdf.js`.
