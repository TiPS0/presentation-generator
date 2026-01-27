# Claude Presentation Tool

This tool allows you to generate high-quality, visually appealing presentations using Claude.

## Usage

1.  **Copy the System Prompt**:
    Open [system_prompt.md](./system_prompt.md) and copy its entire content.

2.  **Configure Claude**:
    - Set the copied content as the **System Prompt** for your Claude session (e.g., using a "Project" in Claude.ai or a system prompt field in an API client).
    - Recommended Model: **Claude 3.5 Sonnet** or later.

3.  **Generate Slides**:
    - In your chat, simply provide the topic or content for your presentation.
    - Example prompt: "Create a slide explaining the architecture of Transformer models."
    - Or prompt: "Generate a roadmap for adopting GenAI in enterprise."

4.  **Result**:
    - Claude will generate a single HTML file containing the slide.
    - Save this code as an `.html` file and open it in your browser.

## Presentation Features

The generated presentations are built with high-quality web technologies to ensure a professional look and feel.

### Visual & UI Features

- **Responsive Design**: Slides adapt to different screen sizes (desktops, tablets).
- **Professional Typography**: Uses system font stacks (San Francisco, Segoe UI) for clean legibility.
- **Modern Styling**: Implementation of glassmorphism, card layouts, and consistent color palettes.

### Animations

When generating multi-slide decks (see "Modes" below), the tool includes built-in animations:

- **Slide Transitions**: Smooth ease-in/out transitions between slides.
- **Staggered Entrance**: Bullet points and list items fly in sequentially.
- **Progress Tracking**: A visual progress bar at the bottom of the screen.

## Modes

1.  **Single Slide (Standard)**
    - _Best for_: One-pagers, roadmaps, architecture diagrams.
    - _Prompt_: "Create a slide about..."
    - _Output_: A static, scrollable HTML page with high information density.

2.  **Slide Deck (Multi-Page)**
    - _Best for_: Full presentations, storytelling, project updates.
    - _Prompt_: "Create a multi-slide presentation with JS navigation about..."
    - _Output_: An interactive slideshow with "Next/Previous" controls and keyboard support (Arrow Keys).

## How to View a Presentation

Simply open the generic HTML file in any modern web browser (Chrome, Safari, Firefox).

On macOS terminal:

```bash
open your-presentation.html
```

## Examples

Check the [examples](./examples) directory for sample outputs:

- [Compact LLM Roadmap](./examples/example_output.html)

## Reference

This tool and prompt are based on the work by [vakovalskii/presentation_claude_prompt](https://github.com/vakovalskii/presentation_claude_prompt).
