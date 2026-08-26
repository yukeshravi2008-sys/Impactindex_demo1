# Custom Rules for Impact Index Project

- When performing a git push or interacting with remote git commands, check if `GITHUB_PAT` is defined in the `.env` file at the project root.
- If `GITHUB_PAT` exists, construct the remote URL temporarily using the token: `https://<GITHUB_PAT>@github.com/yukeshravi2008-sys/Impactindex_demo1.git` to authenticate the push/operation.
- After any git push completes, reset the remote URL back to the public/unauthenticated URL (`https://github.com/yukeshravi2008-sys/Impactindex_demo1.git`) so the token is not persisted in `.git/config`.
