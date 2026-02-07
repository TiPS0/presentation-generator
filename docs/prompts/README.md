# Prompts

This directory contains planning markdown prompts created before implementing code.

## Naming Convention

Files in this directory should follow the naming convention:
`IMPLEMENT_<TASK_DESCRIPTION>.md`

Examples:

- `IMPLEMENT_AUTH.md`
- `IMPLEMENT_MEDIA_VIEWER.md`

## Purpose

These files serve as a reference during the implementation phase. They help structure the development process by documenting:

- **Analysis**: Understanding the requirements and existing codebase.
- **Implementation Plan**: Step-by-step plan for changes.
- **Verification Steps**: How to test and verify the implementation.
- **Context**: Any relevant background information or constraints.

## Usage

1.  **Create a Prompt**: Before starting a complex task or feature, create a new markdown file in this directory using the `IMPLEMENT_...` naming convention.
2.  **Plan**: Draft your analysis, implementation strategy, and verification plan within the file.
3.  **Implement**: Use this file as a constant reference while writing code to ensure all requirements are met and the plan is followed.

## Presentation Generation Workflow

This workflow describes how to create high-quality presentations using the `claude-presentation-tool`.

1.  **Define the Task**: Create a new `IMPLEMENT_<TOPIC>.md` file in this directory.
    - Example: `IMPLEMENT_MARKETING_STRATEGY.md`
    - In this file, outline the goal of the presentation.
    - Reference the desired output style, similar to `claude-presentation-tool/examples/example_output.html`.

2.  **Plan Content**:
    - Draft the content structure (slides, key points) within the `IMPLEMENT_...md` file.
    - Decide if it's a single slide or a multi-slide deck.

3.  **Generate with Claude**:
    - Open `claude-presentation-tool/README.md` and follow the _Usage_ instructions.
    - Copy the _System Prompt_ from `claude-presentation-tool/system_prompt.md`.
    - In your Claude session, use the content planned in your `IMPLEMENT_...md` file as the prompt.
    - Example prompt: "Create a multi-slide presentation about [Topic] based on the following outline: [Paste Outline]"

4.  **Refine**:
    - Review the generated HTML.
    - If adjustments are needed, refine your prompt in the `IMPLEMENT_...md` file or interact with Claude to iterate.
    - Save the final HTML output.
