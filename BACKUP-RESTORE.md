# Backup And Restore

## Why This Exists

Studio Occasus deploys quickly, and quick deployment is useful only if rollback is simple when a bad change slips through. This backup flow gives you a local recovery point before risky edits or deploys.

## What Gets Backed Up

- `.github/`
- `agents/`
- `functions/`
- `scripts/`
- `site/`
- `README.md`
- `firebase.json`
- `firestore.rules`
- `.firebaserc`
- `.gitignore`

Backups are stored locally in `backups/` as:

- one `.zip` archive
- one `.manifest.json` file with timestamp, included paths, and git commit if available

## Create A Backup

Run this from the project root or any location:

```powershell
.\scripts\project-backup.ps1 -Label pre-deploy
```

Example labels:

- `pre-deploy`
- `before-auth-refactor`
- `before-onboarding-ui`

## Restore The Latest Backup

```powershell
.\scripts\project-restore.ps1
```

## Restore A Specific Backup

```powershell
.\scripts\project-restore.ps1 -BackupName 20260413-153000-pre-deploy
```

You can also pass the filename with `.zip` if you want.

## Recommended Release Habit

Before any deploy that changes UI flow, auth, billing, or data behavior:

1. Run `.\scripts\project-backup.ps1 -Label pre-deploy`
2. Run your checks
3. Deploy only if checks pass
4. If the deploy breaks something important, run `.\scripts\project-restore.ps1 -BackupName <backup-name>`

## Important Notes

- Restore overwrites the backed-up project paths with the selected snapshot.
- The `backups/` folder is local and ignored by git.
- This backup system complements git; it does not replace commits, tags, or GitHub history.
- If a deploy is already live and broken, restore locally first, verify, then push the recovered state.