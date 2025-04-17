import * as vscode from "vscode";

export function registerGenerateCodeCommand(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "riverpod-extension.generateCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No active editor found");
        return;
      }

      const selection = editor.selection;
      const text =
        editor.document.getText(selection) ||
        editor.document.lineAt(selection.active.line).text;

      const templateType = await vscode.window.showQuickPick(
        [
          "PaginatedState",
          "PaginatedAsyncNotifier",
          "PaginatedNotifierWithState",
          "FamilyPaginatedAsyncNotifier",
          "FamilyPaginatedNotifierWithState",
        ],
        {
          placeHolder: "Select template type",
        }
      );

      if (!templateType) {
        return;
      }

      const name = await vscode.window.showInputBox({
        prompt: "Enter name for the template",
        placeHolder: "e.g., User, Product, Order",
      });

      if (!name) {
        return;
      }

      let generatedCode = "";
      switch (templateType) {
        case "PaginatedState":
          generatedCode = generatePaginatedState(name);
          break;
        case "PaginatedAsyncNotifier":
          generatedCode = generatePaginatedAsyncNotifier(name);
          break;
        case "PaginatedNotifierWithState":
          generatedCode = generatePaginatedNotifierWithState(name);
          break;
        case "FamilyPaginatedAsyncNotifier":
          generatedCode = generateFamilyPaginatedAsyncNotifier(name);
          break;
        case "FamilyPaginatedNotifierWithState":
          generatedCode = generateFamilyPaginatedNotifierWithState(name);
          break;
        default:
          vscode.window.showErrorMessage("Unknown template type");
          return;
      }

      editor.edit((editBuilder) => {
        if (selection.isEmpty) {
          editBuilder.insert(selection.active, generatedCode);
        } else {
          editBuilder.replace(selection, generatedCode);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function generatePaginatedState(name: string): string {
  return `class ${name}State extends PaginatedState<${name}> {
    ${name}State({
      required super.items,
      required super.offset,
      required super.limit,
      required super.hasMore,
    });

    @override
    ${name}State copyWith({
      List<${name}>? items,
      int? offset,
      int? limit,
      bool? hasMore,
    }) {
      return ${name}State(
        items: items ?? this.items,
        offset: offset ?? this.offset,
        limit: limit ?? this.limit,
        hasMore: hasMore ?? this.hasMore,
      );
    }
  }`;
}

function generatePaginatedAsyncNotifier(name: string): string {
  return `class ${name}Notifier extends PaginatedAsyncNotifier<${name}, ${name}State> {
    ${name}Notifier() : super();

    @override
    fetch(int offset, int limit) async {
      throw UnimplementedError();
    }

    @override
    build() async {
      throw UnimplementedError();
    }
  }`;
}

function generatePaginatedNotifierWithState(name: string): string {
  return `class ${name}State extends PaginatedState<${name}> {
    ${name}State({
      required super.items,
      required super.offset,
      required super.limit,
      required super.hasMore,
    });

    @override
    ${name}State copyWith({
      List<${name}>? items,
      int? offset,
      int? limit,
      bool? hasMore,
    }) {
      return ${name}State(
        items: items ?? this.items,
        offset: offset ?? this.offset,
        limit: limit ?? this.limit,
        hasMore: hasMore ?? this.hasMore,
      );
    }
  }

  class ${name}Notifier extends PaginatedAsyncNotifier<${name}, ${name}State> {
    ${name}Notifier() : super();

    @override
    fetch(int offset, int limit) async {
      throw UnimplementedError();
    }

    @override
    build() async {
      throw UnimplementedError();
    }
  }

  final ${name.toLowerCase()}Provider = AsyncNotifierProvider<${name}Notifier, ${name}State>(
    ()=> ${name}Notifier(),
  );`;
}

function generateFamilyPaginatedAsyncNotifier(name: string): string {
  return `class ${name}Notifier extends FamilyPaginatedAsyncNotifier<${name}, ${name}State, {${name}Arg}> {
    ${name}Notifier() : super();

    @override
    fetch(arg, offset, limit) async {
      throw UnimplementedError();
    }

    @override
    build(arg) async {
      throw UnimplementedError();
    }
  }`;
}

function generateFamilyPaginatedNotifierWithState(name: string): string {
  return `class ${name}State extends PaginatedState<${name}> {
    ${name}State({
      required super.items,
      required super.offset,
      required super.limit,
      required super.hasMore,
    });

    @override
    ${name}State copyWith({
      List<${name}>? items,
      int? offset,
      int? limit,
      bool? hasMore,
    }) {
      return ${name}State(
        items: items ?? this.items,
        offset: offset ?? this.offset,
        limit: limit ?? this.limit,
        hasMore: hasMore ?? this.hasMore,
      );
    }
  }

  class ${name}Notifier extends FamilyPaginatedAsyncNotifier<${name}, ${name}State, ${name}Arg> {
    ${name}Notifier() : super();

    @override
    fetch(arg, offset, limit) async {
      throw UnimplementedError();
    }

    @override
    build(arg) async {
      throw UnimplementedError();
    }
  }

  final ${name.toLowerCase()}Provider = AsyncNotifierProviderFamily<${name}Notifier, ${name}State, ${name}Arg>(
    ()=> ${name}Notifier(),
  );`;
}
