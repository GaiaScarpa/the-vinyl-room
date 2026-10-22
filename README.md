# The Vinyl Room
A responsive, editable guest-speaker learning journal with a retro vinyl-store design.

## Open it
Double-click `index.html` to view it in a browser. No build tools required. An internet connection is helpful for loading the optional Google Fonts; the site works without them.

## Use it
- Add a record for each guest speaker.
- Open any record to edit the speaker, company, session, lecture notes, takeaways and reflection.
- Search and filter records.
- Add standalone reflections.
- Use **BACK UP MY NOTES** in the footer to download a JSON backup and **RESTORE BACKUP** to import it.

## Important: data storage
This standalone version saves data **only in your browser's localStorage**. It does not synchronize across devices and it has no online account or cloud database. Browser data can be erased, so export backups regularly. Anyone using the same browser profile can edit the local notes. For secure online saving, connect a backend with authentication and database access controls before making editing features publicly accessible.

## Publish with GitHub + Vercel
Upload all three website files (`index.html`, `style.css`, `script.js`) to a new GitHub repository, then import it in Vercel as a static site. No framework or build command is needed. If Vercel asks for an output directory, use the repository root (`.`). The public website will load, but each visitor will have their own browser-local notes; your notes do not sync between devices.

## Personalize
Edit the About Me text in `index.html`, or ask a developer to customize the design and add cloud storage.
