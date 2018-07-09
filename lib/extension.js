"use strict";

const vscode = require("vscode");

function onCommand() {
    let editor = vscode.window.activeTextEditor, 
        document = editor.document, 
        selections = editor.selections;
    
    editor.edit(function (editBuilder) {
        selections.forEach(function (selection) {
            if (!selection.isSingleLine) {
                return;
            }

            let range = new vscode.Range(selection.start, selection.end);

            if (!selection.isEmpty && selection.isSingleLine) {
                editBuilder.replace(
                    selection, 
                    toggleCase(document.getText(range))
                );
            }
        });
    });
}

function toggleCase(text) {
    if ( /[A-ZА-ЯЁ]/.test(text) ) {
        return text.toLowerCase();
    } else {
        return text.toUpperCase();
    }
}

exports.activate = function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.toggleUpperCase", onCommand);
    context.subscriptions.push(disposable);
};

exports.deactivate = function() {};