# opencode-notify-cmux

OpenCode plugin that sends local `cmux` notifications when a session is waiting, fails, or completes.

## Requirements

- macOS with `cmux` installed at `/opt/homebrew/bin/cmux`
- OpenCode

## Download from GitHub

```bash
git clone https://github.com/lucaskenda/opecode-notify-cmux.git
cd opecode-notify-cmux
```

## Install as an npm module

From your OpenCode config directory (or any folder where you keep OpenCode plugin dependencies), run:

```bash
npm install opencode-notify-cmux
```

Then reference the installed module in your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "/absolute/path/to/node_modules/opencode-notify-cmux/hooks.js"
  ]
}
```

## Configure in OpenCode

Add this plugin path in your OpenCode config (`opencode.jsonc` or `~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "/absolute/path/to/opencode-notify-cmux/hooks.js"
  ]
}
```

After saving config changes, restart OpenCode.

## Pull latest from GitHub

Run this inside the plugin repo:

```bash
git pull origin main
```
