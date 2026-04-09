# Railroad Loader

> Animated DNA helix loader with terminal-style progress messages.

**Part of the Railroad ecosystem** — Pure DOM utilities that work standalone or with [Railroad Runtime](https://github.com/faroncoder/railroad-runtime).

**Zero dependencies. ~2KB minified.**

---

## Features

✅ Animated DNA helix spinner  
✅ Cycling progress messages  
✅ Minimum display duration (prevents flash)  
✅ HTMX integration (automatic)  
✅ Simple API (`show()` / `hide()`)  
✅ Customizable messages  

---

## Installation

** CDN (fastest):**
```html
<script src="https://unpkg.com/railroad-loader@1.0.0/dist/loader.min.js"></script>
```

**npm:**
```bash
npm install railroad-loader
```

---

## Quick Start

### Basic Usage

```javascript
// Show loader
RailroadLoader.show();

// Hide loader (respects min duration)
RailroadLoader.hide();
```

### With Custom Messages

```javascript
RailroadLoader.show([
  'Loading posts...',
  'Fetching comments...',
  'Rendering view...',
  'Almost done...'
]);

// Hide after async operation
fetchData().then(() => {
  RailroadLoader.hide();
});
```

### With HTMX (Automatic)

```html
<!-- Loader shows/hides automatically -->
<div hx-get="/api/data" hx-target="#content">
  Load Data
</div>
```

No JavaScript needed! Loader appears automatically on HTMX requests.

---

## API

### `RailroadLoader.show(messages?)`

Show the loader.

**Parameters:**
- `messages` (Array<string>, optional) - Custom messages to cycle through

**Example:**
```javascript
RailroadLoader.show(['Processing...', 'Building...', 'Done!']);
```

---

### `RailroadLoader.hide()`

Hide the loader. Respects minimum display duration (500ms) to prevent flash.

**Example:**
```javascript
RailroadLoader.hide();
```

---

### `RailroadLoader.isLoading()`

Check if loader is currently visible.

**Returns:** `boolean`

**Example:**
```javascript
if (RailroadLoader.isLoading()) {
  console.log('Still loading...');
}
```

---

### `RailroadLoader.setMessages(messages)`

Update the default messages.

**Parameters:**
- `messages` (Array<string>) - New default messages

**Example:**
```javascript
RailroadLoader.setMessages([
  'Loading...',
  'This might take a moment...',
  'Still working...'
]);
```

---

## HTMX Integration

Railroad Loader automatically integrates with HTMX if present:

```html
<script src="https://unpkg.com/htmx.org"></script>
<script src="https://unpkg.com/railroad-loader"></script>

<!-- Loader shows automatically on request -->
<button hx-get="/api/data">Fetch Data</button>
```

**Loader lifecycle:**
1. `htmx:beforeRequest` → Loader shows
2. Request in progress → Messages cycle
3. `htmx:afterRequest` → Loader hides (respects min duration)

---

## Examples

### Async Operations

```javascript
async function saveSettings() {
  RailroadLoader.show(['Saving settings...', 'Validating...', 'Done!']);
  
  try {
    await fetch('/api/settings', {method: 'POST', body: data});
    RailroadLoader.hide();
    toast('Settings saved', 'success');
  } catch (err) {
    RailroadLoader.hide();
    toast('Save failed', 'error');
  }
}
```

### Form Submission

```javascript
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  RailroadLoader.show(['Submitting form...', 'Processing...']);
  
  await submitForm(e.target);
  
  RailroadLoader.hide();
});
```

### Multiple Steps

```javascript
async function deployApp() {
  RailroadLoader.show([
    'Building application...',
    'Running tests...',
    'Deploying to server...',
    'Verifying deployment...',
    'Complete!'
  ]);
  
  await build();
  await test();
  await deploy();
  await verify();
  
  RailroadLoader.hide();
}
```

---

## Styling

The loader is centered on screen by default. Customize via CSS:

```css
#railroad-loader {
  /* Change position */
  top: 30% !important;
  
  /* Change colors */
  color: #f0f0f0 !important;
}

#railroad-loader svg circle {
  /* Change helix colors */
  fill: #your-color !important;
}
```

---

## Minimum Display Duration

The loader enforces a **500ms minimum display duration** to prevent flash:

```javascript
RailroadLoader.show();

// Even if data loads in 50ms, loader stays for 500ms
fetch('/fast-endpoint').then(() => {
  RailroadLoader.hide();  // Will hide after 500ms total
});
```

This prevents jarring flash when data loads quickly.

---

## Works With

✅ Vanilla JavaScript (no dependencies)  
✅ HTMX (automatic integration)  
✅ Alpine.js  
✅ Turbo/Hotwire  
✅ Any framework or no framework  

---

## Why Railroad Loader?

**Other loaders:**
- Complex configuration
- Framework dependencies
- No HTMX integration
- Generic spinners

**Railroad Loader:**
- Zero config (works out of the box)
- Zero dependencies
- Automatic HTMX integration
- Unique DNA helix animation
- Terminal-style messages

**One line to get started:**
```html
<script src="https://unpkg.com/railroad-loader"></script>
```

---

## License

MIT

## Contributing

Issues and PRs welcome at https://github.com/faroncoder/railroad-loader

---

**Part of the Railroad ecosystem:**
- [Railroad Runtime](https://github.com/faroncoder/railroad-runtime) - Governed execution substrate
- [Railroad Toasts](https://github.com/faroncoder/railroad-toasts) - Toast notifications
- **Railroad Loader** - This package

**Not a framework. Just utilities.**
