---
title: PixelForge
---

PixelForge is WLED's built-in browser tool for images & scrolling text and accessing additional tools like PixelPaint or the legacy Pixel Art Converter.

!!! warning "ESP8266 Limitation"
    The GIF image player is **not available on ESP8266** and therefore the image converter is disabled on these controllers. Other tools like PixelPaint are available.

## Overview

The tool is available through the icon below the color picker or by navigating to `http://<your-wled-ip>/pixelforge.htm` in a browser.

The tool has three tabs: **Image Tool**, **Scrolling Text**, **Other Tools**

Both the image tool to convert images into GIFs and the scrolling text tool are built-in tools. In the "Other Tools" tab you can download additional tools. These are not included by default but once downloaded they are stored and available permanently on your controller unless you choose to delete them. In order to be able to download these tools your phone/PC requires internet access - but not your WLED controller. Once downloaded no internet access is needed, the tools will continue to work offline and even in AP mode.

---

## Image Tool

### Display an Image

- At the very top, select the segment you would like to use - only one segment can display an image at a time
- Select any of the images available on your controller
- Tap&hold / right click an image to download a backup or to delete a stored image

### Uploading an Image

Click the designated area to upload or drag&drop any image your browser supports (JPEG, PNG, WebP, BMP, or animated GIF). The image loads into the preview.

#### Crop, Zoom, Pan

- A **drag-resizable crop frame** appears over the image. Drag the edges to select the area you want to use. Use the buttons to match aspect ratio, size etc.
- Pan the image by dragging outside the crop frame, use the sliders to zoom or rotate the image.
- The preview area underneath shows how the final image will look, you can adjust the output image size at the bottom - the default is the selected segment size.

#### Background Removal

Use the slider "Dark Pixel Cutoff" to turn dark pixels transparent and color them in the selected background color. Images with transparent pixels like GIF and PNG are supported.

#### Save

Once happy with the crop:

1. Choose a filename (PixelForge warns you if the name already exists on the filesystem).
2. Click **Save**. The cropped image is saved as a GIF to WLED's internal filesystem.

!!! info "Unsupported Image Formats"
    If you directly upload an image to your controller through the file editor in a format that is not supported (i.e. anything other than GIF), it still appears in the list but with a **red frame** and cannot be displayed on the LEDs without converting it first.

#### Animated GIFs

Animated GIFs are _mostly_ supported natively by WLED i.e. even through a direct upload of the GIF using the file editor - if you experience any issues you can convert the GIF using the PixelForge tool using the process described above and re-save it.

### Filesystem Usage

At the bottom the **filesystem memory usage** is shown so you can see how much file system space remains on your controller.

---

## Scrolling Text Tool

The Scrolling Text tab lets you configure and preview and control the **Scrolling Text** effect.

- Select the segment you want the text to be displayed on
- Type your message in the text box and click the checkmark to apply.
- Insert dynamic **tokens** (current date, time, temperature, etc.) using the tokens list.
- Adjust local effect controls (speed, size, colour palette) in the panel below.

!!! info "Preview Limitations"
    The preview shows only a simulation and does not accurately represent what is shown on the LED matrix. If your text is very short, the preview still shows scrolling but on the actual LEDs it will show as a static, non-scrolling text for example. If you need the text to scroll, make it longer by adding spaces.

See [Custom Fonts](/features/custom-fonts) for information on loading custom `.wbf` font files for use with the Scrolling Text effect.

---

## Using Saved GIFs as Effects

Saved GIF files appear in the WLED effect list and can be selected like any other effect. They play back on the 2D segment at the frame rate embedded in the file.
