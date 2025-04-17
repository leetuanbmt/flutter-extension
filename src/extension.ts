import * as vscode from "vscode";
import { registerGenerateCodeCommand } from "./commands/generate_code_command";
import { registerGenerateBlocFeatureCommand } from "./commands/generate_bloc_feature_command";

export function activate(context: vscode.ExtensionContext) {
  console.log("Riverpod Extension is now active!");
  registerGenerateCodeCommand(context);
  registerGenerateBlocFeatureCommand(context);
}

export function deactivate() {}
