---
title: Custom Fonts
---

WLED supports loading custom bitmap fonts for use with the **Scrolling Text** effect. Custom fonts are stored on the device filesystem as `.wbs` files and can be created with the [WLED Font Factory](https://github.com/DedeHai/WLED-Tools/tree/main/WLED-FontFactory) tool.

---

## Built-in fonts

WLED ships with five built-in fonts. In v0.16, four of them were redrawn for improved legibility while keeping the same pixel heights for backward compatibility. All built-in fonts now use **per-glyph variable width**, so narrow characters like `i` take less space than wide ones like `W`.

| Name | Width × Height |
|------|---------------|
| 6×3  | variable × 3 px |
| 5×8  | variable × 8 px |
| 6×8  | variable × 8 px |
| 7×9  | variable × 9 px |
| 5×12 | variable × 12 px |

---

## Custom font files (`.wbs`)

Up to **5 custom font files** can be loaded from the filesystem at the same time. They appear alongside the built-in fonts in the Scrolling Text effect settings.

### File format

`.wbs` files use a tightly bit-packed binary format with a 12-byte header. You don't need to create or edit them by hand — use the Font Factory tool instead.

### UTF-8 support

Custom fonts can include Unicode characters beyond standard ASCII. The `.wbs` format supports 2-, 3-, and 4-byte UTF-8 code points, making it possible to use accented Latin characters, Cyrillic, CJK glyphs, and other scripts.

### Enabling custom fonts

1. Upload your `.wbs` file(s) to the WLED filesystem via the **File Manager** (`/edit`) or the OTA update page.
2. Open the **Scrolling Text** effect settings.
3. Enable the **Custom Font** checkbox.

If no `.wbs` files are found on the filesystem, WLED falls back to the built-in fonts automatically.

---

## Creating fonts with Font Factory

[WLED Font Factory](https://github.com/DedeHai/WLED-Tools/tree/main/WLED-FontFactory) is a web-based tool for creating `.wbs` font files.

### Workflow

1. Load a source font — either a **TrueType (TTF)** or **BDF bitmap** font file.
2. Choose which Unicode range(s) to include (e.g. Basic Latin, Latin Extended, Cyrillic).
3. Set the pixel height. The tool renders each glyph at that height.
4. Edit individual glyphs pixel by pixel in the built-in glyph editor if needed.
5. Click **Export** to download the `.wbs` file.

### Showcase mode

Font Factory includes a **showcase** export that renders a PNG preview of all glyphs in the font — useful for checking readability before uploading to a device.

---

## Using custom fonts in PixelForge

The [PixelForge Scrolling Text tool](/features/pixelforge#scrolling-text-tool) also uses the Scrolling Text effect and will pick up any custom fonts you have loaded.
