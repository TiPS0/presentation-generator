# Presentation Tool Setup Guide

This guide explains how to set up the "Base" system prompt to start generating presentations with Claude.

## The Core Concept

The "Base" of this tool is a specialized **System Prompt**. This prompt instructs Claude to behave as an expert presentation designer and output code in a specific HTML/CSS format.

## Prerequisites

- **Claude AI Account**: Access to [Claude.ai](https://claude.ai) or the API.
- **Model**: We recommend **Claude 3.5 Sonnet** (or newer) for the best html/css generation capabilities.
- **Text Editor**: To view the generated HTML files.

## Setup Steps

### 1. Locate the System Prompt

Navigate to the root of this tool's directory and find the file:
`claude-presentation-tool/system_prompt.md`

### 2. Copy the Content

Open the file and copy **everything** inside it. This includes all the CSS instruction, HTML templates, and behavior rules.

### 3. Configure Claude (Two Methods)

#### Method A: Using "Projects" (Recommended)

1.  Go to [Claude.ai](https://claude.ai).
2.  Create a new **Project** (e.g., named "Presentation Generator").
3.  In the Project Settings, look for **"Custom Instructions"** or **"System Prompt"**.
4.  Paste the copied content there.
5.  Save. Now every chat in this project will automatically know how to make slides.

#### Method B: Per-Chat Setup

1.  Start a new chat.
2.  Paste the copied content into the chat box and add: _"acknowledged?"_
3.  Claude should reply confirming it understands.
4.  Then proceed to ask for slides.

## How to Verify

Once setup, type the following prompt to test:

> "Create a simple title slide with the text 'Hello World'."

If the setup is correct, Claude will generate a code block containing a complete HTML file with the specific styling defined in the base prompt.
