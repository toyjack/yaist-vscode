# yaist-vscode

This is a vscode plugin for searching and inputing Chinese characters. It is something like [YAIST](https://hi-ids.netlify.app/) but work on vscode.

## Features

Searching and inputing Chinese chraracters by their components and stroke counts.

For example you can get "𪠶" by input "土口2". The number comes at last is the remaining stroke count.

For now, there are 2 ways to use yaist-vscode.

### Searching by a dialog

Open the vscode command panel by `Ctl+Shit+p`, then input `yaist` and selected `[YAIST] Input text to search`.

Then input the parts of Chinese character and remaining stroke count (optional) you're looking for.

### Searching by context menu

Another way is input the parts of Chinese character and remaining stroke count directly into the editor, then select them and right click to open the context menu which named `[YAIST] Search selected text`.

## Shortcuts

### Character

<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>y</kbd>

With text selected: Replacing

Without text selected: Searching

### TEI XML Block

<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>t</kbd>

With text selected: Replacing

Without text selected: Searching

## Requirements

- A Chinese or Japanese input method.
- Font covered all Unicode Chinese characters. Such as Hanazono Font.

## Extension Settings

Working on it...

## TODOs

- Fancy GIF
- Copy to cliopboard

## References

- [konn/vscode-generic-input-method](https://github.com/konn/vscode-generic-input-method)
- [ldasjp8/vscode-japanese-tei](https://github.com/ldasjp8/vscode-japanese-tei)

## Contribute

Build and test for vscode desktop

[VSCode Extensition API](https://code.visualstudio.com/api/get-started/your-first-extension)

Build and test for vscode web

```bash
yarn compile-web & yarn run-in-browser
```

## Change Log

### [0.4.0] - 2022-04-26

- Added support of vscode web

### [0.3.0] - 2022-04-25

- Added configuration of XML template

### [0.2.0] - 2022-04-22

- Added shortcuts

### [0.1.0] - 2022-04-21

- Added TEI XML support

### [0.0.1] - 2022-04-20

- Added replacing selected texts
- Added searching by a dialog

### [Unreleased]

- Initial release
