import * as vscode from 'vscode';
import { idsfind } from 'idsfind';
import { getXmlString } from './utils';

export function activate(context: vscode.ExtensionContext) {
	const inputHanziToXml = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.inputHanziToXml',
		async (editor) => {
			let input = await vscode.window.showInputBox({ prompt: "Search for..." });
			if (!input) {
				return;
			}

			if (input.length > 1) {
				input = input[0];
			}

			const startPosition = editor.selection.start;

			editor.edit((editBuilder) => {
				const template = vscode.workspace.getConfiguration('yaist-vscode').get('xmlTemplate') as string;
				const xmlString = getXmlString(input!, template);
				editBuilder.insert(startPosition, xmlString);
			});
		});

	const convertHanziToXml = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.convertHanziToXml',
		async (editor) => {
			if (!editor) { return; }

			let text = editor.document.getText(editor.selection);

			if(text.length > 1) {
				text = text[0];
			}

			editor.edit((editBuilder) => {
				const template = vscode.workspace.getConfiguration('yaist-vscode').get('xmlTemplate') as string;
				const xmlString = getXmlString(text!, template);
				editBuilder.replace(editor.selection, xmlString);
			});
		});

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

	const searcherWithTemplate = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.searcherWithTemplate',
		async (editor) => {
			const search = await vscode.window.showInputBox({ prompt: "Search for..." });
			if (!search) {
				return;
			}

			const results = idsfind(search, true);
			const selected = await vscode.window.showQuickPick(results);

			const startPosition = editor.selection.start;
			editor.edit((editBuilder) => {
				const template = vscode.workspace.getConfiguration('yaist-vscode').get('xmlTemplate') as string;
				const xmlString = getXmlString(selected!, template);
				editBuilder.insert(startPosition, xmlString);
			});
		});

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

	const replacerWithTemplate = vscode.commands.registerTextEditorCommand(
		'yaist-vscode.replacerWithTemplate',
		async (editor) => {
			if (!editor) {
				return;
			}

			let text = editor.document.getText(editor.selection);
			const results = idsfind(text, true);

			const selected = await vscode.window.showQuickPick(results);
			editor.edit((editBuilder) => {
				const template = vscode.workspace.getConfiguration('yaist-vscode').get('xmlTemplate') as string;
				const xmlString = getXmlString(selected!, template);
				editBuilder.replace(editor.selection, xmlString);
			});
		});

	context.subscriptions.push(replacer);
	context.subscriptions.push(replacerWithTemplate);
	context.subscriptions.push(searcher);
	context.subscriptions.push(searcherWithTemplate);
	context.subscriptions.push(inputHanziToXml);
	context.subscriptions.push(convertHanziToXml);
}

export function deactivate() { }
