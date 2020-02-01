import * as vscode from 'vscode';
import { iDeviceNodeProvider, iDeviceItem } from './iDeviceConnections';
import { ToolboxNodeProvider, ToolItem } from './iDeviceToolbox';
import { ApplicationNodeProvider } from './iDeviceApplications';
import { iDevices } from './UserEnv';

export function activate(context: vscode.ExtensionContext) {

	console.log('Bootstraping "wiki.qaq.iosre" extension!');

	iDeviceNodeProvider.init();
	ToolboxNodeProvider.init();
	ApplicationNodeProvider.init();

	context.subscriptions.push(vscode.commands.registerCommand('iDeviceSelect', (deviceObject) => {
		iDevices.shared.setDevice(deviceObject);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ToolboxCalled', (ToolObject) => {
		ToolboxNodeProvider.nodeProvider.performSelector(ToolObject);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ApplicationSelected', (AppObject) => {
		ApplicationNodeProvider.nodeProvider.performSelector(AppObject);
	}));

	let disposable = vscode.commands.registerCommand('extension.iOSreAction-ShowVersion', () => {
		vscode.window.showInformationMessage("wiki.qaq.iosre -> Version 0.1");
	});

	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
