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

## Examples

Check the [examples](./examples) directory for sample outputs:

- [Compact LLM Roadmap](./examples/example_output.html)

## Reference

This tool and prompt are based on the work by [vakovalskii/presentation_claude_prompt](https://github.com/vakovalskii/presentation_claude_prompt).
