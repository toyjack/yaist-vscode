// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { idsfind } from 'idsfind';

export function activate(context: vscode.ExtensionContext) {
	const searcher = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.searcher',
		async (editor) => {
			const search = await vscode.window.showInputBox({ prompt: "Search for..." });
			if (!search) {
				return;
			}

			const results = idsfind(search, true);
			const selected = await vscode.window.showQuickPick(results);

			const startPosition = editor.selection.start;
			editor.edit((editBuilder) => {
				editBuilder.insert(startPosition, selected!);
			});
		}
	);

	const replacer = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.replacer',
		async (editor) => {
			if (!editor) {
				return;
			}

			let text = editor.document.getText(editor.selection);
			const results = idsfind(text, true);

			const selected = await vscode.window.showQuickPick(results);
			editor.edit((editBuilder) => {
				editBuilder.replace(editor.selection, selected!);
			});
		}
	);

	context.subscriptions.push(replacer);
	context.subscriptions.push(searcher);
}

// this method is called when your extension is deactivated
export function deactivate() { }
