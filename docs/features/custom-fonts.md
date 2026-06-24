---
title: Custom Fonts
---

WLED supports loading custom bitmap fonts for use with the **Scrolling Text** effect. Custom fonts are stored on the device filesystem as `.wbf` files and can be created with the Font Factory tool, see below.
The source code of the tool as well as a collection free-to-use fonts are available [on GitHub](https://github.com/DedeHai/WLED-Tools/tree/main/WLED-FontFactory).

---

## Built-in Fonts

WLED ships with five built-in fonts. In v16.0, four of them were redrawn for improved legibility while keeping the same pixel heights for backward compatibility. All built-in fonts now use **per-glyph variable width**, so narrow characters like `i` take less space than wide ones like `W`.

| "Font Size" | Height |
|------|---------------|
| 1  | 6 px |
| 2  | 8 px |
| 3  | 8 px |
| 4  | 9 px |
| 5  | 12 px |

!!! tip "Classic Pre-16.0 Fonts"
    If you want the classic pre-16.0 fonts, a button in the PixelForge Scrolling Text tab lets you download "Classic WLED Fonts" as custom fonts. Make sure no additional custom fonts are installed, then enable the "Custom Font" checkbox.

---

## Custom Font Files

WLED uses a custom font format called **WBF** which stands for WLED Bitmap Font. Up to **5 custom font files** can be loaded from the filesystem. To use custom fonts enable the "Custom Font" checkmark in the scrolling text effect and choose the font using the "Size" slider. If less than 5 fonts are available, the smallest ones use custom fonts and larger sizes default to the built-in fonts. When more than 5 fonts are uploaded, only the first five are used (in alphabetical order).

### File Format

`.wbf` files use a tightly bit-packed binary format with a 12-byte header. You don't need to create or edit them by hand — use the Font Factory tool instead that is available in PixelForge.

### UTF-8 Support

Custom fonts can include Unicode characters beyond standard ASCII. The `.wbf` format supports 2-, 3-, and 4-byte UTF-8 code points, making it possible to use accented Latin characters, Cyrillic and other scripts. To add international characters please use the Font Factory tool - it has a user friendly drop-down menu to select from and even allows to specify custom UTF8 table offsets to add mathematical symbols for example.

### Enabling Custom Fonts

1. Upload your `.wbf` file(s) to the WLED filesystem via the **File Manager** (`/edit`) or create and upload a font using the Font Factory tool.
2. Open the **Scrolling Text** effect settings.
3. Enable the **Custom Font** checkbox.
4. Use the "Size" slider to select the font

If no `.wbf` files are found on the filesystem, WLED falls back to the built-in fonts automatically. You can see currently available fonts and also delete them using the PixelForge tool.

---

## Creating Fonts with Font Factory

[WLED Font Factory](https://github.com/DedeHai/WLED-Tools/tree/main/WLED-FontFactory) is a web-based tool for creating `.wbf` font files. It is available in the PixelForge (button below the color picker)under "Other Tools".

!!! info "Terminology"
    A single symbol or letter in a font is also referred to as a "glyph" — a typographical character.

### Workflow

1. Load a source font — supported formats are **TTF**, **OTF**, **WOFF** as well as pixel based **BDF** and native **WBF**
2. Choose whether to use variable or fixed glyph width
3. Adjust the three sliders until you get the desired font size - the sliders are not available when loading bitmap fonts
4. Choose which UTF-8 extension to include (e.g. Latin, Cyrillic, Greek etc.) - use preview example text to test
5. Edit individual glyphs pixel by pixel in the built-in glyph editor if needed or delete unwanted glyphs to save space
6. Click **Upload** to save the `.wbf` file to the controller directly or **Download** to store it on your phone/pc

### Showcase Your Font

The Font Factory source files include the [showcase tool](https://github.com/DedeHai/WLED-Tools/blob/main/WLED-FontFactory/source/wbfShowcaseGenerator.htm) available for download (click "Download raw file", then open the file).
It renders a `.wbf` file into a PNG image with all glyphs in the font. Use it to show a preview of your font if you want to share it on discord, reddit or any other place.
