# Payload bites

Collection of various bite-sized Payload v4 plugins and tools.

- [Image search](packages/image-search/) - search for images in Payload using image providers such as Unsplash and Pexels.
- [Fullscreen editor](packages/fullscreen-editor/) - provides a fullscreen mode for the lexical rich text editor.
- [Audit fields](packages/audit-fields/) - add createdBy and lastModifiedBy audit fields to collections and globals.
- [Activity log](packages/activity-log/) - keep an eye on everything happening in your cms.
- [Broken link checker](packages/broken-link-checker/) - broken links are a thing of the past.
- [Content freeze](packages/content-freeze/) - make sure your team puts the tools down during critical moments.
- [Astro richtext renderer](packages/astro-richtext-renderer/) - render Payload CMS Lexical richtext content in Astro.

## Compatibility table

| Package                 | Payload 3            | Payload 4         |
| ----------------------- | -------------------- | ----------------- |
| Activity log            | v1.x                 | v2.x              |
| Astro richtext renderer | v1.x, v2.x (Astro 5) | v3.x (Astro 7)    |
| Audit fields            | v1.x                 | v2.x (deprecated) |
| Broken link checker     | v1.0.0-beta.x        | v2.0.0-beta.x     |
| Content freeze          | v1.x                 | v2.x              |
| Fullscreen editor       | v1.x                 | v2.x              |
| Image search            | v1.x, v2.x, v3.x     | v4.x              |
| Soft delete             | v1.x, v2.x, v3.x     | Not supported     |

Payload 3 versions live on the [`v3`](https://github.com/rilrom/payload-bites/tree/v3) branch. Payload 4 versions are prereleases on the `beta` dist-tag (`pnpm add @payload-bites/activity-log@beta`). Betas may break, so pin an exact version.
