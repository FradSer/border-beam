// Generates registry/new-york/ui/border-beam.css from palette data.
// Source-of-truth for color palettes; rerun this script after tweaking palettes.
//   pnpm run generate:css
// Run as part of `pnpm run registry:build` via the prebuild script.

import { writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, "../registry/new-york/ui/border-beam.css")

// ---- Palette data (md size; preserved from Jakubantalik/border-beam, MIT) ----

const mdPalettes = {
  colorful: [
    { color: "rgb(255, 50, 100)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(40, 140, 255)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(50, 200, 80)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(30, 185, 170)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(100, 70, 255)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(40, 140, 255)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(255, 120, 40)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(240, 50, 180)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(180, 40, 240)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  mono: [
    { color: "rgb(180, 180, 180)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(140, 140, 140)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(160, 160, 160)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(130, 130, 130)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(170, 170, 170)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(150, 150, 150)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(190, 190, 190)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(145, 145, 145)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(165, 165, 165)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  ocean: [
    { color: "rgb(100, 80, 220)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(60, 120, 255)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(80, 100, 200)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(50, 140, 220)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(120, 80, 255)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(70, 130, 255)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(140, 100, 240)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(90, 110, 230)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(130, 70, 255)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  sunset: [
    { color: "rgb(255, 80, 50)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(255, 160, 40)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(255, 120, 60)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(255, 200, 50)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(255, 100, 80)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(255, 180, 60)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(255, 60, 60)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(255, 140, 50)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(255, 90, 70)", pos: "100% 27.1%", size: "52px 48px" },
  ],
}

// ---- Spike colors (for line bloom) ----

const spikeColors = {
  colorful: {
    dark: { primary: "rgb(255, 60, 80)", secondary: "rgba(40, 190, 180, 0.98)" },
    light: { primary: "rgb(200, 30, 60)", secondary: "rgb(20, 150, 140)" },
  },
  mono: {
    dark: { primary: "rgb(200, 200, 200)", secondary: "rgb(170, 170, 170)" },
    light: { primary: "rgb(80, 80, 80)", secondary: "rgb(120, 120, 120)" },
  },
  ocean: {
    dark: { primary: "rgb(100, 120, 255)", secondary: "rgba(130, 100, 220, 0.98)" },
    light: { primary: "rgb(60, 60, 180)", secondary: "rgb(80, 100, 200)" },
  },
  sunset: {
    dark: { primary: "rgb(255, 140, 80)", secondary: "rgba(255, 100, 60, 0.98)" },
    light: { primary: "rgb(200, 80, 40)", secondary: "rgb(220, 120, 30)" },
  },
}

const smPalettes = {
  colorful: {
    border: [
      { color: "rgb(50, 200, 80)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(30, 185, 170)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 120, 40)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(100, 70, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(40, 140, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 50, 100)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(50, 200, 80, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(30, 185, 170, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 120, 40, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(100, 70, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(240, 50, 180, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(180, 40, 240, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(40, 140, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 50, 100, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  mono: {
    border: [
      { color: "rgb(160, 160, 160)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(140, 140, 140)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(180, 180, 180)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(150, 150, 150)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(170, 170, 170)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(155, 155, 155)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(160, 160, 160, 0.25)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(140, 140, 140, 0.22)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(180, 180, 180, 0.17)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(150, 150, 150, 0.17)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(170, 170, 170, 0.15)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(155, 155, 155, 0.20)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(145, 145, 145, 0.15)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(165, 165, 165, 0.15)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  ocean: {
    border: [
      { color: "rgb(60, 140, 200)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(50, 120, 180)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(100, 80, 220)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(80, 100, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(120, 70, 240)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(90, 80, 220)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(70, 110, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(110, 90, 230)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(60, 140, 200, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(50, 120, 180, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(100, 80, 220, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(80, 100, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(120, 70, 240, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(90, 80, 220, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(70, 110, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(110, 90, 230, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  sunset: {
    border: [
      { color: "rgb(255, 180, 50)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 150, 40)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 80, 60)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(255, 100, 80)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(255, 60, 80)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(255, 120, 60)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(255, 200, 50)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(255, 180, 50, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(255, 150, 40, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 80, 60, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(255, 100, 80, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(255, 60, 80, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(255, 120, 60, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(255, 200, 50, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 90, 70, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
}

// ---- Line variant palettes (theme-dependent) ----

const linePalettes = {
  colorful: {
    dark: [
      { color: "rgb(255, 50, 100)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 180, 220)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 160, 30)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(240, 50, 180)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(30, 185, 170)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: "rgb(255, 50, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 140, 255)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(30, 185, 170)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(255, 120, 40)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(240, 50, 180)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  mono: {
    dark: [
      { color: "rgb(200, 200, 200)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(170, 170, 170)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(155, 155, 155)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(185, 185, 185)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(165, 165, 165)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(180, 180, 180)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(160, 160, 160)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(175, 175, 175)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(190, 190, 190)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: "rgb(100, 100, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(80, 80, 80)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(90, 90, 90)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(70, 70, 70)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(85, 85, 85)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(95, 95, 95)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(75, 75, 75)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(105, 105, 105)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(65, 65, 65)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  ocean: {
    dark: [
      { color: "rgb(100, 80, 220)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(60, 120, 255)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(80, 100, 200)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(130, 70, 255)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(70, 130, 255)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(120, 80, 255)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(90, 110, 230)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(110, 90, 240)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(140, 100, 255)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: "rgb(80, 60, 200)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(50, 100, 220)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(70, 90, 190)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(110, 60, 220)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(60, 110, 230)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(100, 70, 240)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(80, 100, 210)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(90, 80, 225)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(120, 90, 245)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
  sunset: {
    dark: [
      { color: "rgb(255, 100, 60)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(255, 180, 50)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(255, 140, 70)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(255, 80, 80)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 200, 60)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(255, 120, 50)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(255, 160, 80)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(255, 90, 60)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(255, 70, 70)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 },
    ],
    light: [
      { color: "rgb(220, 80, 40)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(230, 150, 30)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(210, 110, 50)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(200, 60, 60)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(220, 170, 40)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(210, 100, 30)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(230, 130, 60)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(190, 70, 50)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(180, 50, 50)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 },
    ],
  },
}

// ---- Line inner gradient data (theme-independent) ----

const lineInnerPalettes = {
  colorful: [
    { color: "rgba(255, 50, 100, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(40, 180, 220, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(50, 200, 80, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(180, 40, 240, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 160, 30, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(100, 70, 255, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(40, 140, 255, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(240, 50, 180, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(30, 185, 170, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  mono: [
    { color: "rgba(200, 200, 200, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(170, 170, 170, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(155, 155, 155, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(185, 185, 185, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(165, 165, 165, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(180, 180, 180, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(160, 160, 160, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(175, 175, 175, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(190, 190, 190, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  ocean: [
    { color: "rgba(100, 80, 220, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(60, 120, 255, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(80, 100, 200, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(130, 70, 255, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(70, 130, 255, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(120, 80, 255, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(90, 110, 230, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(110, 90, 240, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(140, 100, 255, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
  sunset: [
    { color: "rgba(255, 100, 60, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(255, 180, 50, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(255, 140, 70, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(255, 80, 80, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 200, 60, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(255, 120, 50, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(255, 160, 80, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(255, 90, 60, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(255, 70, 70, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 },
  ],
}

// ---- Line bloom color data (spike pairs, theme-dependent) ----

const lineBloomColors = {
  colorful: {
    dark: {
      spikes: [
        { color1: "rgb(100, 70, 255)", color2: "rgba(100, 70, 255, 1)" },
        { color1: "rgba(255, 170, 40, 0.59)", color2: "rgba(255, 170, 40, 0.29)" },
        { color1: "rgb(50, 200, 100)", color2: "rgba(50, 200, 100, 1)" },
        { color1: "rgba(200, 50, 240, 0.91)", color2: "rgba(200, 50, 240, 0.45)" },
        { color1: "rgb(40, 140, 255)", color2: "rgba(40, 140, 255, 1)" },
      ],
    },
    light: {
      spikes: [
        { color1: "rgb(80, 50, 200)", color2: "rgba(80, 50, 200, 0.8)" },
        { color1: "rgba(210, 130, 0, 0.7)", color2: "rgba(210, 130, 0, 0.46)" },
        { color1: "rgb(30, 160, 70)", color2: "rgba(30, 160, 70, 0.82)" },
        { color1: "rgb(160, 30, 190)", color2: "rgba(160, 30, 190, 0.7)" },
        { color1: "rgb(30, 100, 200)", color2: "rgba(30, 100, 200, 0.78)" },
      ],
    },
  },
  mono: {
    dark: {
      spikes: [
        { color1: "rgb(200, 200, 200)", color2: "rgba(200, 200, 200, 1)" },
        { color1: "rgba(180, 180, 180, 0.59)", color2: "rgba(180, 180, 180, 0.29)" },
        { color1: "rgb(190, 190, 190)", color2: "rgba(190, 190, 190, 1)" },
        { color1: "rgba(170, 170, 170, 0.91)", color2: "rgba(170, 170, 170, 0.45)" },
        { color1: "rgb(185, 185, 185)", color2: "rgba(185, 185, 185, 1)" },
      ],
    },
    light: {
      spikes: [
        { color1: "rgb(80, 80, 80)", color2: "rgba(80, 80, 80, 0.8)" },
        { color1: "rgba(100, 100, 100, 0.7)", color2: "rgba(100, 100, 100, 0.46)" },
        { color1: "rgb(70, 70, 70)", color2: "rgba(70, 70, 70, 0.82)" },
        { color1: "rgb(90, 90, 90)", color2: "rgba(90, 90, 90, 0.7)" },
        { color1: "rgb(85, 85, 85)", color2: "rgba(85, 85, 85, 0.78)" },
      ],
    },
  },
  ocean: {
    dark: {
      spikes: [
        { color1: "rgb(100, 80, 255)", color2: "rgb(100, 80, 255)" },
        { color1: "rgba(80, 130, 220, 0.59)", color2: "rgba(80, 130, 220, 0.29)" },
        { color1: "rgb(60, 100, 255)", color2: "rgb(60, 100, 255)" },
        { color1: "rgba(90, 120, 200, 0.91)", color2: "rgba(90, 120, 200, 0.45)" },
        { color1: "rgb(120, 90, 255)", color2: "rgb(120, 90, 255)" },
      ],
    },
    light: {
      spikes: [
        { color1: "rgb(50, 40, 180)", color2: "rgba(50, 40, 180, 0.8)" },
        { color1: "rgba(40, 80, 200, 0.7)", color2: "rgba(40, 80, 200, 0.46)" },
        { color1: "rgb(30, 50, 190)", color2: "rgba(30, 50, 190, 0.82)" },
        { color1: "rgb(60, 90, 180)", color2: "rgba(60, 90, 180, 0.7)" },
        { color1: "rgb(70, 60, 200)", color2: "rgba(70, 60, 200, 0.78)" },
      ],
    },
  },
  sunset: {
    dark: {
      spikes: [
        { color1: "rgb(255, 100, 80)", color2: "rgb(255, 100, 80)" },
        { color1: "rgba(255, 150, 80, 0.59)", color2: "rgba(255, 150, 80, 0.29)" },
        { color1: "rgb(255, 80, 60)", color2: "rgb(255, 80, 60)" },
        { color1: "rgba(255, 120, 50, 0.91)", color2: "rgba(255, 120, 50, 0.45)" },
        { color1: "rgb(255, 140, 70)", color2: "rgb(255, 140, 70)" },
      ],
    },
    light: {
      spikes: [
        { color1: "rgb(200, 60, 30)", color2: "rgba(200, 60, 30, 0.8)" },
        { color1: "rgba(220, 100, 20, 0.7)", color2: "rgba(220, 100, 20, 0.46)" },
        { color1: "rgb(180, 40, 20)", color2: "rgba(180, 40, 20, 0.82)" },
        { color1: "rgb(210, 80, 10)", color2: "rgba(210, 80, 10, 0.7)" },
        { color1: "rgb(190, 70, 30)", color2: "rgba(190, 70, 30, 0.78)" },
      ],
    },
  },
}

// ---- Helper functions ----

const radial = (c) =>
  `radial-gradient(ellipse ${c.size} at ${c.pos}, ${c.color}, transparent)`

const joinRadial = (palette) => palette.map(radial).join(",\n      ")

const mdInner = (variant) => {
  const baseAlpha = variant === "mono" ? 0.225 : 0.45
  return mdPalettes[variant].map((c) => {
    const rgba = c.color.replace("rgb(", "rgba(").replace(")", `, ${baseAlpha})`)
    const smaller = c.size
      .split(" ")
      .map((s) => `${Math.round(parseInt(s, 10) * 0.9)}px`)
      .join(" ")
    return `radial-gradient(ellipse ${smaller} at ${c.pos}, ${rgba}, transparent)`
  }).join(",\n      ")
}

function withAlpha(color, alpha) {
  const rgbaMatch = color.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/)
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`
  const rgbMatch = color.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/)
  if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
  return color
}

function attenuateSpike(color, factor) {
  const rgbaMatch = color.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/)
  if (rgbaMatch) return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${(parseFloat(rgbaMatch[4]) * factor).toFixed(2)})`
  const rgbMatch = color.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/)
  if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${factor.toFixed(2)})`
  return color
}

function offsetExpr(n) {
  if (n === 0) return ""
  return n > 0 ? ` + ${n}px` : ` - ${Math.abs(n)}px`
}

function lineRadial(c) {
  const ox = offsetExpr(c.offsetX)
  const oy = offsetExpr(c.offsetY)
  return `radial-gradient(ellipse calc(${c.sizeW}px * var(--beam-w)) calc(${c.sizeH}px * var(--beam-h)) at calc(var(--beam-x) * 100%${ox}) calc(100%${oy}), ${c.color}, transparent)`
}

function getLineColorGradients(variant, isDark) {
  const palette = linePalettes[variant][isDark ? "dark" : "light"]
  return palette.map(lineRadial).join(",\n      ")
}

function getLineInnerGradients(variant) {
  return lineInnerPalettes[variant].map(lineRadial).join(",\n      ")
}

function getLineBloomGradients(variant, isDark) {
  const sc = spikeColors[variant][isDark ? "dark" : "light"]
  const bloomData = lineBloomColors[variant][isDark ? "dark" : "light"]
  const isMono = variant === "mono"

  const att = isMono ? 0.14 : 1
  const sc1     = isMono ? attenuateSpike(sc.primary, 0.14) : sc.primary
  const sc1_mid = isMono ? attenuateSpike(sc.primary, 0.09) : sc.primary
  const sc2     = isMono ? attenuateSpike(sc.secondary, 0.12) : sc.secondary
  const sc2_mid = isMono ? withAlpha(sc.secondary, 0.06) : withAlpha(sc.secondary, 0.49)

  const spikes = bloomData.spikes.map((s) => isMono
    ? { color1: attenuateSpike(s.color1, att), color2: attenuateSpike(s.color2, att * 0.7) }
    : s
  )

  const thinW1 = isMono ? "12px"  : "0.8px"
  const thinW2 = isMono ? "14px"  : "2px"
  const thinW3 = isMono ? "12px"  : "1.2px"
  const thinW4 = isMono ? "10px"  : "0.6px"
  const thinH1 = isMono ? "42px"  : "92px"
  const thinH2 = isMono ? "38px"  : "72px"
  const thinH3 = isMono ? "40px"  : "85px"
  const thinH4 = isMono ? "32px"  : "60px"
  const thinLW = isMono ? "12px"  : "1px"

  const glowDotC   = isMono ? "rgba(255, 255, 255, 0.5)"  : "rgba(255, 255, 255, 1)"
  const glowDot20  = isMono ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.9)"
  const glowDot50  = isMono ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.5)"
  const glowAmbC   = isMono ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.3)"
  const glowAmb25  = isMono ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.12)"
  const glowAmb55  = isMono ? "rgba(255, 255, 255, 0.015)": "rgba(255, 255, 255, 0.03)"

  if (isDark) {
    return `radial-gradient(ellipse calc(${thinW1} * var(--beam-spike)) calc(${thinH1} * var(--beam-h)) at 8% calc(100% - 2px), ${sc1}, ${sc1_mid} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2)) calc(35px * var(--beam-h)) at 22% calc(100% - 4px), ${sc2}, ${sc2_mid} 50%, transparent 95%),
       radial-gradient(ellipse calc(${thinW2} * (2 - var(--beam-spike))) calc(${thinH2} * var(--beam-h)) at 36% calc(100% - 3px), ${spikes[0].color1}, ${spikes[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2)) calc(28px * var(--beam-h)) at 50% calc(100% - 2px), ${spikes[1].color1}, ${spikes[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${thinW3} * (2 - var(--beam-spike2))) calc(${thinH3} * var(--beam-h)) at 64% calc(100% - 4px), ${spikes[2].color1}, ${spikes[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike)) calc(45px * var(--beam-h)) at 78% calc(100% - 2px), ${spikes[3].color1}, ${spikes[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${thinW4} * (2 - var(--beam-spike))) calc(${thinH4} * var(--beam-h)) at 92% calc(100% - 3px), ${spikes[4].color1}, ${spikes[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike)) calc(15px * var(--beam-spike2)) at calc(var(--beam-x) * 100%) calc(100% + 1px), ${glowDotC} 0%, ${glowDot20} 20%, ${glowDot50} 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w)) calc(40px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%, ${glowAmbC} 0%, ${glowAmb25} 25%, ${glowAmb55} 55%, transparent 80%)`
  } else {
    const sc1_lt = isMono ? attenuateSpike(sc.primary, 0.11) : withAlpha(sc.primary, 0.85)
    const sc2_lt = isMono ? attenuateSpike(sc.secondary, 0.09) : withAlpha(sc.secondary, 0.7)
    return `radial-gradient(ellipse calc(${thinW1} * var(--beam-spike)) calc(${thinH1} * var(--beam-h)) at 8% calc(100% - 2px), ${sc1}, ${sc1_lt} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2)) calc(35px * var(--beam-h)) at 22% calc(100% - 4px), ${sc2}, ${sc2_lt} 50%, transparent 95%),
       radial-gradient(ellipse calc(${thinW2} * (2 - var(--beam-spike))) calc(${thinH2} * var(--beam-h)) at 36% calc(100% - 3px), ${spikes[0].color1}, ${spikes[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2)) calc(28px * var(--beam-h)) at 50% calc(100% - 2px), ${spikes[1].color1}, ${spikes[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${thinW3} * (2 - var(--beam-spike2))) calc(${thinH3} * var(--beam-h)) at 64% calc(100% - 4px), ${spikes[2].color1}, ${spikes[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike)) calc(45px * var(--beam-h)) at 78% calc(100% - 2px), ${spikes[3].color1}, ${spikes[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${thinLW} * (2 - var(--beam-spike))) calc(${thinH4} * var(--beam-h)) at 92% calc(100% - 3px), ${spikes[4].color1}, ${spikes[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w)) calc(32px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`
  }
}

// ---- Conic overlays (theme-dependent) ----

const conicWhite = (theme) => {
  const stops =
    theme === "dark"
      ? [
          [54, "transparent"],
          [57, "rgba(255, 255, 255, 0.1)"],
          [60, "rgba(255, 255, 255, 0.3)"],
          [63, "rgba(255, 255, 255, 0.6)"],
          [66, "rgba(255, 255, 255, 0.75)"],
          [69, "rgba(255, 255, 255, 0.6)"],
          [72, "rgba(255, 255, 255, 0.3)"],
          [75, "rgba(255, 255, 255, 0.1)"],
          [78, "transparent"],
        ]
      : [
          [54, "transparent"],
          [57, "rgba(0, 0, 0, 0.08)"],
          [60, "rgba(0, 0, 0, 0.2)"],
          [63, "rgba(0, 0, 0, 0.4)"],
          [66, "rgba(0, 0, 0, 0.55)"],
          [69, "rgba(0, 0, 0, 0.4)"],
          [72, "rgba(0, 0, 0, 0.2)"],
          [75, "rgba(0, 0, 0, 0.08)"],
          [78, "transparent"],
        ]
  const inner = stops.map(([p, c]) => `${c} ${p}%`).join(", ")
  return `conic-gradient(from var(--beam-angle), transparent 0%, ${inner}, transparent 100%)`
}

const conicBloom = (theme) => {
  const stops =
    theme === "dark"
      ? [
          [58, "transparent"],
          [62, "rgba(255, 255, 255, 0.03)"],
          [65, "rgba(255, 255, 255, 0.08)"],
          [67, "rgba(255, 255, 255, 0.2)"],
          [69, "rgba(255, 255, 255, 0.45)"],
          [70, "rgba(255, 255, 255, 0.85)"],
          [70.5, "rgba(255, 255, 255, 0.85)"],
          [71.5, "rgba(255, 255, 255, 0.45)"],
          [73, "rgba(255, 255, 255, 0.2)"],
          [75, "rgba(255, 255, 255, 0.08)"],
          [78, "rgba(255, 255, 255, 0.03)"],
          [82, "transparent"],
        ]
      : [
          [58, "transparent"],
          [62, "rgba(0, 0, 0, 0.02)"],
          [65, "rgba(0, 0, 0, 0.08)"],
          [67, "rgba(0, 0, 0, 0.2)"],
          [69, "rgba(0, 0, 0, 0.4)"],
          [70, "rgba(0, 0, 0, 0.6)"],
          [70.5, "rgba(0, 0, 0, 0.6)"],
          [71.5, "rgba(0, 0, 0, 0.4)"],
          [73, "rgba(0, 0, 0, 0.2)"],
          [75, "rgba(0, 0, 0, 0.08)"],
          [78, "rgba(0, 0, 0, 0.03)"],
          [82, "transparent"],
        ]
  const inner = stops.map(([p, c]) => `${c} ${p}%`).join(", ")
  return `conic-gradient(from var(--beam-angle), transparent 0%, ${inner})`
}

// ---- Line highlight (theme-dependent) ----

const lineHighlight = (theme) => {
  if (theme === "dark") {
    return `radial-gradient(
        ellipse calc(24px * var(--beam-w)) calc(28px * var(--beam-h)) at calc(var(--beam-x) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )`
  }
  return `radial-gradient(
      ellipse calc(35px * var(--beam-w)) calc(28px * var(--beam-h)) at calc(var(--beam-x) * 100%) calc(100% + 2px),
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.25) 35%,
      transparent 70%
    )`
}

// ---- Mask conic gradients (theme-independent) ----

const STROKE_MASK = `conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    )`

const SMALL_INNER_MASK = `conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 22%,
      rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
      white 46%, white 82%,
      rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
      transparent 97%, transparent 100%
    )`

const LINE_MASK = `radial-gradient(
      ellipse calc(78px * var(--beam-w)) calc(60px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    )`

const LINE_BLOOM_MASK = `radial-gradient(
      ellipse calc(84px * var(--beam-w)) calc(110px * var(--beam-h)) at calc(var(--beam-x) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
    )`

// ---- CSS emission ----

const variants = ["colorful", "mono", "ocean", "sunset"]

let css = `/*
 * border-beam.css — auto-generated by scripts/generate-css.mjs
 *
 * Refactored from Jakubantalik/border-beam (MIT) into static, registry-native CSS.
 * All per-instance @property names eliminated; multi-instance independence is
 * provided by the CSS standard (each element holds its own value of each
 * inheriting custom property).
 *
 * Supports border (sm/md) and line (bottom-only traveling glow) size variants.
 * Theme can be set per-component via data-theme="dark"|"light" attribute,
 * or inherited from the page's .dark class (default when no data-theme is set).
 *
 * To tweak palettes or stop positions, edit scripts/generate-css.mjs and rerun
 *   pnpm run generate:css
 */

@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}
@property --beam-opacity {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}
@property --beam-x {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}
@property --beam-w {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --beam-h {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --beam-spike {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --beam-spike2 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --beam-edge {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@keyframes beam-spin     { to { --beam-angle: 360deg; } }
@keyframes beam-fade-in  { to { --beam-opacity: 1; } }
@keyframes beam-fade-out { from { --beam-opacity: 1; } to { --beam-opacity: 0; } }
@keyframes beam-hue-shift {
  0%, 100% {
    filter: hue-rotate(calc(var(--beam-hue-range, 30deg) * -1))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
  50% {
    filter: hue-rotate(var(--beam-hue-range, 30deg))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
}
@keyframes beam-hue-shift-bloom {
  0%, 100% {
    filter: blur(8px) hue-rotate(calc(var(--beam-hue-range, 30deg) * -1 + 10deg))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
  50% {
    filter: blur(8px) hue-rotate(calc(var(--beam-hue-range, 30deg) + 10deg))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
}

@keyframes beam-travel {
  0%   { --beam-x: 0.06;  --beam-w: 0.5; }
  10%  { --beam-x: 0.15;  --beam-w: 0.8; }
  20%  { --beam-x: 0.25;  --beam-w: 1.1; }
  30%  { --beam-x: 0.35;  --beam-w: 1.3; }
  40%  { --beam-x: 0.44;  --beam-w: 1.45; }
  50%  { --beam-x: 0.5;   --beam-w: 1.5; }
  60%  { --beam-x: 0.56;  --beam-w: 1.45; }
  70%  { --beam-x: 0.65;  --beam-w: 1.3; }
  80%  { --beam-x: 0.75;  --beam-w: 1.1; }
  90%  { --beam-x: 0.85;  --beam-w: 0.8; }
  100% { --beam-x: 0.94;  --beam-w: 0.5; }
}

@keyframes beam-edge-fade {
  0%    { --beam-edge: 0; }
  12.5% { --beam-edge: 0; }
  32.5% { --beam-edge: 1; }
  67.5% { --beam-edge: 1; }
  87.5% { --beam-edge: 0; }
  100%  { --beam-edge: 0; }
}

@keyframes beam-breathe {
  0%, 100% { --beam-h: 0.8; }
  25%      { --beam-h: 1.25; }
  55%      { --beam-h: 0.85; }
  80%      { --beam-h: 1.3; }
}

@keyframes beam-spike {
  0%   { --beam-spike: 0.8; }
  25%  { --beam-spike: 1.3; }
  50%  { --beam-spike: 0.9; }
  75%  { --beam-spike: 1.4; }
  100% { --beam-spike: 0.8; }
}

@keyframes beam-spike2 {
  0%   { --beam-spike2: 1.2; }
  25%  { --beam-spike2: 0.7; }
  50%  { --beam-spike2: 1.4; }
  75%  { --beam-spike2: 0.8; }
  100% { --beam-spike2: 1.2; }
}

[data-beam] {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
}
[data-beam] [data-beam-bloom] {
  display: none;
}

/* ---- border/sm/md animation rules ---- */

[data-beam][data-active]:not([data-size="line"]) {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-in 0.6s ease forwards;
}
[data-beam][data-fading]:not([data-size="line"]) {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-out 0.5s ease forwards;
}

/* ---- line animation rules ---- */

[data-beam][data-size="line"][data-active] {
  animation:
    beam-travel var(--beam-duration, 2.4s) linear infinite,
    beam-edge-fade var(--beam-duration, 2.4s) linear infinite,
    beam-breathe var(--beam-breathe-duration, 3.12s) ease-in-out infinite,
    beam-spike var(--beam-spike-duration, 3.19s) ease-in-out infinite,
    beam-spike2 var(--beam-spike2-duration, 4.08s) ease-in-out infinite,
    beam-fade-in 0.6s ease forwards;
}
[data-beam][data-size="line"][data-fading] {
  animation:
    beam-travel var(--beam-duration, 2.4s) linear infinite,
    beam-edge-fade var(--beam-duration, 2.4s) linear infinite,
    beam-breathe var(--beam-breathe-duration, 3.12s) ease-in-out infinite,
    beam-spike var(--beam-spike-duration, 3.19s) ease-in-out infinite,
    beam-spike2 var(--beam-spike2-duration, 4.08s) ease-in-out infinite,
    beam-fade-out 0.5s ease forwards;
}

/* ---- variant overrides for opacity multiplier (mono is half-strength) ---- */

[data-beam][data-variant="mono"] {
  --beam-mono-multiplier: 0.5;
}
[data-beam] {
  --beam-mono-multiplier: 1;
}

/* ---- line-specific opacity overrides ---- */

[data-beam][data-size="line"] {
  --beam-stroke-opacity: 0.72;
  --beam-inner-opacity: 0.7;
  --beam-bloom-opacity: 0.8;
  --beam-inner-shadow: rgba(0, 0, 0, 0.14);
  --beam-saturation: 1.2;
}
.dark [data-beam][data-size="line"] {
  --beam-inner-shadow: rgba(255, 255, 255, 0.1);
}
[data-beam][data-size="line"][data-theme="dark"] {
  --beam-inner-shadow: rgba(255, 255, 255, 0.1);
  --beam-saturation: 1.2;
}
[data-beam][data-size="line"][data-theme="light"] {
  --beam-inner-shadow: rgba(0, 0, 0, 0.14);
  --beam-saturation: 1.2;
}

/* ---- mappings for the conic theme overlays (border/sm/md) ---- */

[data-beam] {
  --beam-conic-overlay: ${conicWhite("light")};
  --beam-bloom-overlay: ${conicBloom("light")};
}
.dark [data-beam] {
  --beam-conic-overlay: ${conicWhite("dark")};
  --beam-bloom-overlay: ${conicBloom("dark")};
}
[data-beam][data-theme="dark"] {
  --beam-conic-overlay: ${conicWhite("dark")};
  --beam-bloom-overlay: ${conicBloom("dark")};
}
[data-beam][data-theme="light"] {
  --beam-conic-overlay: ${conicWhite("light")};
  --beam-bloom-overlay: ${conicBloom("light")};
}

/* ---- line highlight (theme-dependent) ---- */

[data-beam][data-size="line"] {
  --beam-line-highlight: ${lineHighlight("light")};
}
.dark [data-beam][data-size="line"] {
  --beam-line-highlight: ${lineHighlight("dark")};
}
[data-beam][data-size="line"][data-theme="dark"] {
  --beam-line-highlight: ${lineHighlight("dark")};
}
[data-beam][data-size="line"][data-theme="light"] {
  --beam-line-highlight: ${lineHighlight("light")};
}

/* ---- per-variant color gradients (theme-independent for border/sm/md) ---- */
`

// ---- Border/sm/md variant color gradient rules ----

for (const v of variants) {
  css += `
[data-beam][data-size="md"][data-variant="${v}"] {
  --beam-color-gradient: ${joinRadial(mdPalettes[v])};
  --beam-inner-gradient: ${mdInner(v)};
}
[data-beam][data-size="sm"][data-variant="${v}"] {
  --beam-color-gradient: ${joinRadial(smPalettes[v].border)};
  --beam-inner-gradient: ${joinRadial(smPalettes[v].inner)};
}
`
}

// ---- Line variant color gradient rules (theme-dependent) ----

css += `
/* ---- line variant color gradients (theme-dependent) ---- */
`

for (const v of variants) {
  const lineColorDark = getLineColorGradients(v, true)
  const lineColorLight = getLineColorGradients(v, false)
  const lineInner = getLineInnerGradients(v)
  const lineBloomDark = getLineBloomGradients(v, true)
  const lineBloomLight = getLineBloomGradients(v, false)

  css += `
[data-beam][data-size="line"][data-variant="${v}"] {
  --beam-color-gradient: ${lineColorLight};
  --beam-inner-gradient: ${lineInner};
  --beam-bloom-gradient: ${lineBloomLight};
}
.dark [data-beam][data-size="line"][data-variant="${v}"] {
  --beam-color-gradient: ${lineColorDark};
  --beam-bloom-gradient: ${lineBloomDark};
}
[data-beam][data-size="line"][data-variant="${v}"][data-theme="dark"] {
  --beam-color-gradient: ${lineColorDark};
  --beam-bloom-gradient: ${lineBloomDark};
}
[data-beam][data-size="line"][data-variant="${v}"][data-theme="light"] {
  --beam-color-gradient: ${lineColorLight};
  --beam-bloom-gradient: ${lineBloomLight};
}
`
}

// ---- ::after stroke layer (border/sm/md) ----

css += `
/* ---- ::after stroke layer (border/sm/md, active + fading) ---- */

[data-beam][data-active]::after,
[data-beam][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-conic-overlay), var(--beam-color-gradient);
  -webkit-mask:
    ${STROKE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    ${STROKE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-stroke-opacity, 0.48)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active]::after,
[data-beam]:not([data-static-colors])[data-fading]::after {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- ::after stroke layer (line, active + fading) ---- */

[data-beam][data-size="line"][data-active]::after,
[data-beam][data-size="line"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-line-highlight), var(--beam-color-gradient);
  -webkit-mask:
    ${LINE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    ${LINE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-edge)
    * var(--beam-stroke-opacity, 0.72)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam][data-size="line"]:not([data-static-colors])[data-active]::after,
[data-beam][data-size="line"]:not([data-static-colors])[data-fading]::after {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- ::before inner glow layer (border/sm/md, active + fading) ---- */

[data-beam][data-size="md"][data-active]::before,
[data-beam][data-size="md"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 9px 1px var(--beam-inner-shadow, rgba(0, 0, 0, 0.14));
  -webkit-mask-image:
    ${STROKE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    ${STROKE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  clip-path: inset(0 round var(--beam-radius, 16px));
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-inner-opacity, 0.7)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam][data-size="sm"][data-active]::before,
[data-beam][data-size="sm"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 18px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 5px 1px var(--beam-inner-shadow, rgba(0, 0, 0, 0.14));
  -webkit-mask-image: ${SMALL_INNER_MASK};
  -webkit-mask-composite: source-over;
  mask-image: ${SMALL_INNER_MASK};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  clip-path: inset(0 round var(--beam-radius, 18px));
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-inner-opacity, 0.7)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active]::before,
[data-beam]:not([data-static-colors])[data-fading]::before {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- ::before inner glow layer (line, active + fading) ---- */

[data-beam][data-size="line"][data-active]::before,
[data-beam][data-size="line"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 9px 1px var(--beam-inner-shadow, rgba(255, 255, 255, 0.1));
  -webkit-mask-image:
    ${LINE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    ${LINE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  clip-path: inset(0 round var(--beam-radius, 16px));
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-edge)
    * var(--beam-inner-opacity, 0.7)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam][data-size="line"]:not([data-static-colors])[data-active]::before,
[data-beam][data-size="line"]:not([data-static-colors])[data-fading]::before {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- bloom layer (border/sm/md) ---- */

[data-beam][data-active] [data-beam-bloom],
[data-beam][data-fading] [data-beam-bloom] {
  display: block;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-bloom-overlay);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
  filter: blur(8px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1));
  pointer-events: none;
  z-index: 3;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-bloom-opacity, 0.8)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active] [data-beam-bloom],
[data-beam]:not([data-static-colors])[data-fading] [data-beam-bloom] {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- bloom layer (line) ---- */

[data-beam][data-size="line"][data-active] [data-beam-bloom],
[data-beam][data-size="line"][data-fading] [data-beam-bloom] {
  display: block;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  padding: 0;
  background: var(--beam-bloom-gradient);
  -webkit-mask: ${LINE_BLOOM_MASK};
  -webkit-mask-composite: source-over;
  mask: ${LINE_BLOOM_MASK};
  mask-composite: add;
  pointer-events: none;
  z-index: 3;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-edge)
    * var(--beam-bloom-opacity, 0.8)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam][data-size="line"]:not([data-static-colors])[data-active] [data-beam-bloom],
[data-beam][data-size="line"]:not([data-static-colors])[data-fading] [data-beam-bloom] {
  animation: beam-hue-shift-bloom 8s ease-in-out infinite;
}

/* ---- mono line bloom blur override ---- */

[data-beam][data-size="line"][data-variant="mono"][data-static-colors][data-active] [data-beam-bloom],
[data-beam][data-size="line"][data-variant="mono"][data-static-colors][data-fading] [data-beam-bloom] {
  filter: blur(6px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1));
}
`

writeFileSync(OUT, css, "utf8")
console.log(`Wrote ${OUT} (${css.length} chars, ${css.split("\n").length} lines)`)
