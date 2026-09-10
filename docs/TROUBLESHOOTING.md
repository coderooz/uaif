# Troubleshooting

> Common issues and their solutions.

## Installation Issues

### "Cannot find module '@uaif/core'"

**Cause:** Package not installed or not built.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### TypeScript errors after install

**Cause:** Missing type declarations or stale build artifacts.

```bash
# Clean and rebuild
pnpm clean
pnpm build
```

---

## CLI Issues

### "Manifest not found" (`uaif validate`)

**Cause:** No `uaif.json` in the project root.

**Solution:** Create a manifest:

```bash
echo '{"name":"my-project","version":"1.0.0","integrations":{}}' > uaif.json
```

### "Provider not registered" (`uaif list`)

**Cause:** Provider ID doesn't match any registered provider.

**Solution:** Check available providers:

```bash
npx uaif list
```

Common provider IDs: `clerk`, `firebase`, `mongodb`, `cloudinary`, `postgresql`, `s3`.

### Detection returns unexpected project type

**Cause:** Detection relies on `package.json` dependencies.

**Solution:** Ensure your `package.json` lists the correct framework:

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0"
  }
}
```

---

## Adapter Issues

### "Secret key required for login" (Clerk)

**Cause:** Calling server-only methods without providing `secretKey`.

**Solution:** Pass `secretKey` in adapter config:

```typescript
const auth = createClerkAdapter({
  publishableKey: 'pk_...',
  secretKey: 'sk_...', // Required for server-side operations
});
```

**Alternative:** Use the Clerk client-side SDK directly for browser operations.

### "Not authenticated" (Firebase Auth)

**Cause:** Calling methods that require an active session.

**Solution:** Call `login()` or `register()` first:

```typescript
await auth.login({ email: 'user@example.com', password: 'pass' });
const user = await auth.getCurrentUser(); // Now works
```

### "Database not connected" (MongoDB)

**Cause:** Calling query methods before `connect()`.

**Solution:** Connect first:

```typescript
const db = createMongoDBAdapter({ connectionString: '...', database: 'mydb', collection: 'users' });
await db.connect();
const results = await db.find();
```

### "Unsupported content type" (Cloudinary)

**Cause:** Passing a string or non-Buffer/Blob content to `upload()`.

**Solution:** Use `Buffer` or `Blob`:

```typescript
// Buffer
const buffer = Buffer.from(fileContent);
await storage.upload({ content: buffer, name: 'photo.jpg', mimeType: 'image/jpeg' });

// Blob
const blob = new Blob([fileContent], { type: 'image/jpeg' });
await storage.upload({ content: blob, name: 'photo.jpg', mimeType: 'image/jpeg' });
```

---

## Build Issues

### pnpm workspace errors

**Cause:** Workspace protocol (`workspace:*`) not resolved.

```bash
# Reinstall from root
pnpm install
```

### "outDir must be set" in tsconfig

**Cause:** Missing `outDir` in adapter tsconfig.

Ensure each adapter has:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

---

## Phantom LSP Errors

### Errors from deleted `registry/` directory

**Cause:** Editor/IDE LSP cache references deleted files.

**Solution:** The `registry/` directory was consolidated into `packages/core/src/registry/` in Phase 2. These errors are phantom — they don't affect the build or tests.

To clear LSP cache:

- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- JetBrains: File → Invalidate Caches / Restart

---

## Getting Help

- Check [API Reference](./API_REFERENCE.md) for type signatures
- Review [Architecture](./architecture/ARCHITECTURE.md) for system design
- Read [Adding Providers](./guides/ADDING_PROVIDERS.md) for provider setup
- Open an issue at https://github.com/coderooz/uaif/issues
