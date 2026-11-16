# Creating an application

Start with the user's main job and a minimal runnable vertical slice. Identify users, critical workflows, data, external systems, deployment environment, accessibility and security needs, and any non-negotiable constraints. Make technology choices based on those needs and existing organizational skills; record why a dependency earns its place.

Define a small module map before filling directories. Use the default responsibilities and dependency direction in [architecture-and-replacement.md](architecture-and-replacement.md): `app`, `features`, `domain`, and `shared`, creating only the folders needed now. Give each rule and source of truth one owner. Keep dependencies directed toward stable contracts; avoid a generic `utils` or `services` dumping ground. Do not create layers or abstractions that have no current responsibility.

Build one end-to-end path: user action → interface → API or local action → domain rule → persistence or external effect → visible outcome. Include a failure or denied state. Run it, inspect it, and adjust the structure before multiplying features. Add features by extending the relevant owners, not by creating a second path for the same behavior.

Choose established packages for common behavior after checking compatibility, license, integration cost, and accessibility. Keep package use behind a narrow project-facing boundary when replacement is plausible. Document commands for local run, checks, and configuration without storing secrets.

For an existing app receiving a major feature, first map current modules and ownership. Reuse the actual project conventions where they work. Read [architecture-and-replacement.md](architecture-and-replacement.md) when the new feature supersedes an old one, and [verification.md](verification.md) before claiming it works.
