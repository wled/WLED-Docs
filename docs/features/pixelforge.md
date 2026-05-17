---
title: PixelForge (Image & GIF Tool)
---

PixelForge is WLED's built-in browser tool for uploading images and animated GIFs to your LED matrix. It replaces the older Pixel Art Converter and is accessible at `/pixelforge.htm` on your device.

!!! warning "2D segments required"
    PixelForge only works with 2D segments. If your setup has no 2D segment configured, the tool will warn you and skip processing.

## Opening PixelForge

Navigate to `http://<your-wled-ip>/pixelforge.htm` in a browser, or follow the link from the [Web GUI Sitemap](/features/subpages).

The tool has two tabs: **Image tool** and **Scrolling Text tool**.

---

## Image Tool

### Uploading an image

Click **Choose file** and select any image your browser supports (JPEG, PNG, WebP, BMP, or animated GIF). The image loads into a preview canvas.

- A **drag-resizable crop frame** appears over the image. Drag the edges or corners to select the area you want.
- Pan the image by dragging outside the crop frame, and zoom with the scroll wheel.
- The preview panel on the right shows a live simulation of how the crop will look on your LED matrix, scaled to the segment's pixel dimensions.

### Crop and save

Once happy with the crop:

1. Choose a filename (PixelForge warns you if the name already exists on the filesystem).
2. Click **Save**. The cropped image is saved as a GIF to WLED's internal filesystem.

Non-GIF source images appear with a **red frame** in the file list to indicate they are stored as a converted GIF.

### Animated GIFs

Animated GIFs are fully supported. Each frame is individually loaded, cropped, and saved as part of the output GIF. Frame timing is preserved.

### Additional options

| Option | Description |
|--------|-------------|
| Background color | Picker to fill transparent areas of PNGs before saving. |
| Dark pixel cutoff | Slider (0–255). Pixels darker than this threshold are treated as black / off. Useful for removing near-black noise around subjects. |
| Rotation | Rotate the source image in 90° steps before cropping. |

### Filesystem usage

The tool shows a live **filesystem memory usage** bar so you can see how much space remains before uploading more files.

---

## Scrolling Text Tool

The Scrolling Text tab lets you configure and preview the **Scrolling Text** effect directly from the browser without opening the main WLED UI.

- Type your message in the text box.
- Insert dynamic **tokens** (current date, time, temperature, etc.) using the token picker.
- Adjust local effect controls (speed, size, colour palette) in the panel below.
- Changes are applied live to your LED matrix.

See [Custom Fonts](/features/custom-fonts) for information on loading custom `.wbs` font files for use with the Scrolling Text effect.

---

## Using saved GIFs as effects

Saved GIF files appear in the WLED effect list and can be selected like any other effect. They play back on the 2D segment at the frame rate embedded in the file.
