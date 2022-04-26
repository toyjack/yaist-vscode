// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { idsfind } from 'idsfind';
import { getXmlString } from './utils';
// import { XmlMaker } from './yaist';

export function activate(context: vscode.ExtensionContext) {
	const inputHanziToXml = vscode.commands.registerTextEditorCommand(
		'extension.inputHanziToXml',
		(editor) => { });
	const convertHanziToXml = vscode.commands.registerTextEditorCommand(
		'extension.convertHanziToXml',
		(editor) => { });

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

// this method is called when your extension is deactivated
export function deactivate() { }
