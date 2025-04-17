import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function registerGenerateBlocFeatureCommand(
  context: vscode.ExtensionContext
) {
  let blocFeatureDisposable = vscode.commands.registerCommand(
    "riverpod-extension.generateBlocFeature",
    async () => {
      const featureName = await vscode.window.showInputBox({
        prompt: "Enter feature name (e.g., user, product)",
      });
      if (!featureName) {
        vscode.window.showErrorMessage("Feature name is required");
        return;
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder open");
        return;
      }
      const rootPath = workspaceFolders[0].uri.fsPath;
      const featurePath = path.join(rootPath, featureName);

      // Định nghĩa cấu trúc file cần tạo theo clean architecture
      const structure = [
        `data/datasources/${featureName}_remote_datasource.dart`,
        `data/models/${featureName}_model.dart`,
        `data/services/${featureName}_service.dart`,
        `data/repositories/${featureName}_repository_impl.dart`,
        `domain/entities/${featureName}_entity.dart`,
        `domain/repositories/${featureName}_repository.dart`,
        `domain/usecases/get_${featureName}_usecase.dart`,
        `presentation/bloc/${featureName}_bloc.dart`,
        `presentation/bloc/${featureName}_event.dart`,
        `presentation/bloc/${featureName}_state.dart`,
        `presentation/views/${featureName}_view.dart`,
        `presentation/widgets/${featureName}_info_widget.dart`,
      ];

      const className = toPascalCase(featureName);

      for (const relativeFilePath of structure) {
        const filePath = path.join(featurePath, relativeFilePath);
        const dir = path.dirname(filePath);
        fs.mkdirSync(dir, { recursive: true });

        // Đường dẫn template
        const templateFile = path.join(
          context.extensionPath,
          "templates/bloc",
          relativeFilePath
            .replace(featureName, "feature")
            .replace(`get_feature_usecase.dart`, "get_feature_usecase.dart")
        );
        let content = "";
        if (fs.existsSync(templateFile)) {
          content = fs.readFileSync(templateFile, "utf8");
          content = content
            .replace(/Feature/g, className)
            .replace(/feature/g, featureName.toLowerCase());
        }
        fs.writeFileSync(filePath, content);
      }

      vscode.window.showInformationMessage(
        `Feature "${featureName}" generated successfully!`
      );
    }
  );

  context.subscriptions.push(blocFeatureDisposable);
}

function toPascalCase(str: string): string {
  return str
    .split(/_|\s|-/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
