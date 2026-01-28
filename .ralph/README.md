# Ralph - PRD-Driven Agent Harness

This directory contains configuration for Ralph, a CLI harness that runs LLM agents
to implement work items defined in `prd.json`.

## Files

- `prd.json` - The Product Requirements Document defining work items
- `progress.txt` - Append-only log of agent progress (agents can read/write this)
- `README.md` - This file

## prd.json Schema

```json
{
  "version": 1,
  "project": {
    "name": "project-name",
    "language": "python",
    "default_branch": "main"
  },
  "global": {
    "verify": ["pytest", "ruff check ."]
  },
  "items": [
    {
      "id": "TASK-001",
      "title": "Short task title",
      "description": "Detailed description of what needs to be implemented",
      "acceptance_criteria": [
        "Criterion 1 that must be satisfied",
        "Criterion 2 that must be satisfied"
      ],
      "files_hint": ["src/module.py", "tests/test_module.py"],
      "verify": null,
      "status": {
        "state": "todo",
        "attempts": 0,
        "last_error": null,
        "done_at": null
      }
    }
  ]
}
```

## Field Descriptions

### Project
- `name`: Project identifier
- `language`: Primary programming language
- `default_branch`: Git branch name (e.g., "main")

### Global
- `verify`: List of shell commands run after each task to verify success

### Items (Work Items)
- `id`: Unique identifier (e.g., "TASK-001", "FEAT-002")
- `title`: Short descriptive title
- `description`: Detailed requirements and context
- `acceptance_criteria`: List of conditions that must be met
- `files_hint`: Optional list of files likely to be modified
- `verify`: Optional task-specific verification commands (overrides global)
- `status.state`: One of "todo", "doing", "done", "blocked"
- `status.attempts`: Number of times this task has been attempted
- `status.last_error`: Error message from last failed attempt
- `status.done_at`: ISO timestamp when completed

## Agent Instructions

When implementing a task:

1. Read the task description and acceptance criteria carefully
2. Make minimal, focused changes
3. Follow existing code style and conventions
4. Create or update tests as needed
5. Use `progress.txt` to record decisions and notes for future iterations
6. Do NOT modify `prd.json` - the harness manages task state

## Commands

```bash
# Start the harness
ralph run --model <model-name>
ralph run --interactive  # Select model interactively

# Check status
ralph status

# Reset tasks
ralph reset [ITEM_ID]
ralph reset --include-blocked
```
