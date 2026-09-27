> [!IMPORTANT]
> This project syncs with a hosted editor. Avoid rewriting published git history
> (force pushing or rebasing/amending/squashing pushed commits) because this can
> cause project history to be lost in the editor.
>
> Commits pushed to the connected branch sync back to the editor and show up in
> the editor, so keep the branch in a working state.

- Keep the platform-provided Vite preset and its package references: they configure the app's preview and deployment pipeline.
- Keep the error reporter's external bridge key unchanged while using neutral internal names: the hosted preview injects that key at runtime.
