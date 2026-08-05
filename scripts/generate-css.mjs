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

// ---- Pulse gradient data tables (ported from Jakubantalik/border-beam) ----

// Region → quadrant map for the 9-gradient perimeter ring (index into the border palette).
const PULSE_RING_MAP = [
  { region: 1, quad: "tl" },
  { region: 2, quad: "tl" },
  { region: 3, quad: "bl" },
  { region: 1, quad: "bl" },
  { region: 2, quad: "br" },
  { region: 3, quad: "br" },
  { region: 1, quad: "tr" },
  { region: 2, quad: "tr" },
  { region: 3, quad: "tr" },
]

// Card 4 inner-perimeter (::before) gradient sizes — slightly smaller than the ring.
const PULSE_INNER_SIZES = [
  [65, 35], [55, 30], [35, 65], [15, 30], [173, 28], [80, 22], [69, 28], [22, 38], [47, 44],
]

// Card 4 bloom — 7 of the 9 colors, expanded sizes (positions come from the palette).
const PULSE_INNER_BLOOM = [
  { ci: 0, region: 1, quad: "tl", w: 84, h: 48 },
  { ci: 1, region: 2, quad: "tl", w: 72, h: 42 },
  { ci: 2, region: 3, quad: "bl", w: 48, h: 84 },
  { ci: 4, region: 2, quad: "br", w: 216, h: 38 },
  { ci: 5, region: 3, quad: "br", w: 102, h: 31 },
  { ci: 6, region: 1, quad: "tr", w: 89, h: 38 },
  { ci: 8, region: 3, quad: "tr", w: 62, h: 58 },
]

// Card 5 outward core (::after hairline + ::before glow share this edge-positioned set).
const PULSE_OUTER_CORE = [
  { ci: 0, region: 1, quad: "tl", w: 80, h: 19, x: "27%", y: "0%" },
  { ci: 6, region: 2, quad: "tr", w: 74, h: 11, x: "73%", y: "-1%" },
  { ci: 7, region: 3, quad: "tr", w: 15, h: 44, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 19, h: 38, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 84, h: 13, x: "67%", y: "100%" },
  { ci: 1, region: 3, quad: "bl", w: 60, h: 21, x: "24%", y: "101%" },
  { ci: 2, region: 1, quad: "bl", w: 17, h: 40, x: "0%", y: "60%" },
  { ci: 3, region: 2, quad: "tl", w: 13, h: 32, x: "-1%", y: "28%" },
]

// Card 5 outward bloom — wider/blurred halo (7 gradients).
const PULSE_OUTER_BLOOM = [
  { ci: 0, region: 1, quad: "tl", w: 110, h: 30, x: "27%", y: "3%" },
  { ci: 6, region: 2, quad: "tr", w: 100, h: 20, x: "73%", y: "1%" },
  { ci: 7, region: 3, quad: "tr", w: 26, h: 62, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 30, h: 56, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 120, h: 22, x: "67%", y: "99%" },
  { ci: 1, region: 3, quad: "bl", w: 88, h: 32, x: "24%", y: "99%" },
  { ci: 2, region: 1, quad: "bl", w: 28, h: 58, x: "0%", y: "60%" },
]

// Breathing params — only `op` (quadrant opacity swing) is needed for the frozen bloom alpha.
function pulseParams(size, theme) {
  const isDark = theme === "dark"
  if (size === "pulse-inner") return isDark ? { op: 0.48 } : { op: 0.45 }
  return isDark ? { op: 0.46 } : { op: 0 }
}

// Convert an rgb() palette color into rgba() whose alpha is the live quadrant opacity var.
function withAlphaVar(color, quad) {
  const m = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)
  const rgb = m ? `${m[1]}, ${m[2]}, ${m[3]}` : "255, 255, 255"
  return `rgba(${rgb}, var(--bop-${quad}))`
}

// One radial-gradient blob; width/height/drift/opacity are the global breathing vars.
function pulseGrad(color, w, h, region, quad, x, y) {
  return `radial-gradient(ellipse calc(${w}px * var(--bw${region}) * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${h}px * var(--bh${region}) * var(--bgh) * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at calc(${x} + var(--bx${region})) calc(${y} + var(--by${region})), ${withAlphaVar(color, quad)}, transparent)`
}

// The 9-gradient perimeter ring (Card 4 ::after / Card 5 stroke share this).
function pulseRingGradients(variant) {
  return mdPalettes[variant]
    .map((c, i) => {
      const { region, quad } = PULSE_RING_MAP[i]
      const [x, y] = c.pos.split(" ")
      const [w, h] = c.size.split(" ").map(parseFloat)
      return pulseGrad(c.color, w, h, region, quad, x, y)
    })
    .join(",\n    ")
}

// Card 4 inner-perimeter gradients (smaller sizes) plus the bright corner accents.
function pulseInnerGradients(variant, isDark) {
  const palette = mdPalettes[variant]
  const grads = palette.map((c, i) => {
    const { region, quad } = PULSE_RING_MAP[i]
    const [x, y] = c.pos.split(" ")
    const [w, h] = PULSE_INNER_SIZES[i]
    return pulseGrad(c.color, w, h, region, quad, x, y)
  })
  const cornerRGB = isDark ? "255, 255, 255" : "0, 0, 0"
  const cornerAlpha = isDark ? 0.18 : 0.08
  const corners = [
    ["0%", "0%", "tl"],
    ["100%", "0%", "tr"],
    ["0%", "100%", "bl"],
    ["100%", "100%", "br"],
  ]
  const cornerGrads = corners.map(
    ([x, y, q]) =>
      `radial-gradient(ellipse 60px 60px at ${x} ${y}, rgba(${cornerRGB}, calc(${cornerAlpha} * var(--bop-${q}))), transparent 70%)`
  )
  return [...grads, ...cornerGrads].join(",\n    ")
}

// Emit a fixed gradient table (used by the outer core + both outer bloom layers).
function pulseTableGradients(table, variant) {
  const palette = mdPalettes[variant]
  return table
    .map((e) => {
      const c = palette[e.ci]
      const [px, py] = c.pos.split(" ")
      return pulseGrad(c.color, e.w, e.h, e.region, e.quad, e.x ?? px, e.y ?? py)
    })
    .join(",\n    ")
}

// Frozen variant of the bloom gradients: emits literal sizes with a fixed per-blob
// alpha (the time-average of the breathing range) so the blurred bloom is painted
// ONCE and cached by the compositor instead of re-rasterized every frame.
function pulseTableGradientsStatic(table, variant, frozenAlpha) {
  const palette = mdPalettes[variant]
  const a = +frozenAlpha.toFixed(3)
  return table
    .map((e) => {
      const c = palette[e.ci]
      const [px, py] = c.pos.split(" ")
      const x = e.x ?? px
      const y = e.y ?? py
      const m = c.color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)
      const rgb = m ? `${m[1]}, ${m[2]}, ${m[3]}` : "255, 255, 255"
      return `radial-gradient(ellipse calc(${e.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${e.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at ${x} ${y}, rgba(${rgb}, ${a}), transparent)`
    })
    .join(",\n    ")
}

let css = `/*
 * border-beam.css — auto-generated by scripts/generate-css.mjs
 *
 * Refactored from Jakubantalik/border-beam (MIT) into static, registry-native CSS.
 * All per-instance @property names eliminated; multi-instance independence is
 * provided by the CSS standard (each element holds its own value of each
 * inheriting custom property).
 *
 * Supports border (sm/md), line (bottom-only traveling glow), and pulse
 * (pulse-inner / pulse-outside breathing glow) size variants.
 * Theme can be set per-component via data-theme="dark"|"light" attribute,
 * or inherited from the page's .dark class (default when no data-theme is set).
 *
 * The pulse breathing (blob size/drift/quadrant-opacity + hue drift) is driven
 * by a shared requestAnimationFrame loop writing the global bw/bx/bop/hue
 * custom properties on each element (see pulse-driver.ts), so no per-instance
 * @property names exist. The pulse gradient tables are baked into per-variant
 * custom properties (--beam-pulse-*) that reference those globals.
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
@property --bw1 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bh1 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bw2 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bh2 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bw3 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bh3 {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bgh {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bop-tl {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bop-tr {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bop-bl {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bop-br {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --bx1 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --by1 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --bx2 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --by2 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --bx3 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --by3 {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}
@property --beam-hue {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}
@property --pulse-glow-sx {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --pulse-glow-sy {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}
@property --pulse-glow-boost {
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

[data-beam][data-active]:not([data-size="line"]):not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-in 0.6s ease forwards;
}
[data-beam][data-fading]:not([data-size="line"]):not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) {
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

/* ---- pulse-specific opacity/brightness defaults (theme-dependent) ---- */

[data-beam][data-size="pulse-inner"] {
  --beam-stroke-opacity: 0.32;
  --beam-inner-opacity: 0.4;
  --beam-bloom-opacity: 0.8;
  --beam-brightness: 1.3;
  --beam-saturation: 0.75;
}
.dark [data-beam][data-size="pulse-inner"],
[data-beam][data-size="pulse-inner"][data-theme="dark"] {
  --beam-stroke-opacity: 1.54;
  --beam-inner-opacity: 0.44;
  --beam-bloom-opacity: 0.66;
  --beam-brightness: 0.75;
  --beam-saturation: 1.2;
}
[data-beam][data-size="pulse-inner"][data-theme="light"] {
  --beam-stroke-opacity: 0.32;
  --beam-inner-opacity: 0.4;
  --beam-bloom-opacity: 0.8;
  --beam-brightness: 1.3;
  --beam-saturation: 0.75;
}

[data-beam][data-size="pulse-outside"] {
  --beam-stroke-opacity: 1.96;
  --beam-inner-opacity: 1.04;
  --beam-bloom-opacity: 0.42;
  --beam-brightness: 1.7;
  --beam-saturation: 0.6;
  --beam-core-blur: 6px;
  --beam-bloom-blur: 15px;
  --beam-glow-brightness: var(--beam-brightness);
  --beam-glow-saturate: var(--beam-saturation);
}
.dark [data-beam][data-size="pulse-outside"],
[data-beam][data-size="pulse-outside"][data-theme="dark"] {
  --beam-stroke-opacity: 0.94;
  --beam-inner-opacity: 0.34;
  --beam-bloom-opacity: 0.3;
  --beam-brightness: 1.9;
  --beam-saturation: 1.2;
  --beam-core-blur: 3px;
  --beam-bloom-blur: 22.5px;
}
[data-beam][data-size="pulse-outside"][data-theme="light"] {
  --beam-stroke-opacity: 1.96;
  --beam-inner-opacity: 1.04;
  --beam-bloom-opacity: 0.42;
  --beam-brightness: 1.7;
  --beam-saturation: 0.6;
  --beam-core-blur: 6px;
  --beam-bloom-blur: 15px;
  --beam-glow-brightness: var(--beam-brightness);
  --beam-glow-saturate: var(--beam-saturation);
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

[data-beam][data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::after,
[data-beam][data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::after {
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

[data-beam]:not([data-static-colors])[data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::after,
[data-beam]:not([data-static-colors])[data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::after {
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
  border-radius: var(--beam-radius, 16px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 5px 1px var(--beam-inner-shadow, rgba(0, 0, 0, 0.14));
  -webkit-mask-image: ${SMALL_INNER_MASK};
  -webkit-mask-composite: source-over;
  mask-image: ${SMALL_INNER_MASK};
  mask-composite: add;
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

[data-beam]:not([data-static-colors])[data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::before,
[data-beam]:not([data-static-colors])[data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"])::before {
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

[data-beam][data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom],
[data-beam][data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom] {
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

[data-beam]:not([data-static-colors])[data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom],
[data-beam]:not([data-static-colors])[data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom] {
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

/* ---- mono bloom blur override (all sizes) ---- */

[data-beam][data-variant="mono"][data-static-colors][data-active]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom],
[data-beam][data-variant="mono"][data-static-colors][data-fading]:not([data-size="pulse-inner"]):not([data-size="pulse-outside"]) [data-beam-bloom] {
  filter: blur(6px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1));
}
`
// ---- Pulse variant color gradient rules (theme-dependent) ----

for (const v of variants) {
  const ring = pulseRingGradients(v)
  const core = pulseTableGradients(PULSE_OUTER_CORE, v)
  const innerDark = pulseInnerGradients(v, true)
  const innerLight = pulseInnerGradients(v, false)
  const innerBloomDark = pulseTableGradientsStatic(
    PULSE_INNER_BLOOM,
    v,
    1 - pulseParams("pulse-inner", "dark").op * 0.5
  )
  const innerBloomLight = pulseTableGradientsStatic(
    PULSE_INNER_BLOOM,
    v,
    1 - pulseParams("pulse-inner", "light").op * 0.5
  )
  const outerBloomDark = pulseTableGradientsStatic(
    PULSE_OUTER_BLOOM,
    v,
    1 - pulseParams("pulse-outside", "dark").op * 0.5
  )
  const outerBloomLight = pulseTableGradientsStatic(
    PULSE_OUTER_BLOOM,
    v,
    1 - pulseParams("pulse-outside", "light").op * 0.5
  )

  css += `
[data-beam][data-size="pulse-inner"][data-variant="${v}"] {
  --beam-pulse-ring: ${ring};
  --beam-pulse-inner: ${innerLight};
  --beam-pulse-bloom: ${innerBloomLight};
}
.dark [data-beam][data-size="pulse-inner"][data-variant="${v}"],
[data-beam][data-size="pulse-inner"][data-variant="${v}"][data-theme="dark"] {
  --beam-pulse-inner: ${innerDark};
  --beam-pulse-bloom: ${innerBloomDark};
}
[data-beam][data-size="pulse-inner"][data-variant="${v}"][data-theme="light"] {
  --beam-pulse-inner: ${innerLight};
  --beam-pulse-bloom: ${innerBloomLight};
}

[data-beam][data-size="pulse-outside"][data-variant="${v}"] {
  --beam-pulse-core: ${core};
  --beam-pulse-bloom: ${outerBloomLight};
}
.dark [data-beam][data-size="pulse-outside"][data-variant="${v}"],
[data-beam][data-size="pulse-outside"][data-variant="${v}"][data-theme="dark"] {
  --beam-pulse-bloom: ${outerBloomDark};
}
[data-beam][data-size="pulse-outside"][data-variant="${v}"][data-theme="light"] {
  --beam-pulse-bloom: ${outerBloomLight};
}
`
}

// ---- Pulse hue-shift custom property (JS drives --beam-hue) ----

css += `
/* ---- pulse hue-shift (driven by --beam-hue from the shared rAF loop) ---- */

[data-beam][data-size="pulse-inner"],
[data-beam][data-size="pulse-outside"] {
  --beam-pulse-hue-shift: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue, 0deg)));
}
[data-beam][data-size="pulse-inner"][data-static-colors],
[data-beam][data-size="pulse-outside"][data-static-colors] {
  --beam-pulse-hue-shift: hue-rotate(0deg);
}

/* ---- pulse wrapper geometry + fade ---- */

[data-beam][data-size="pulse-inner"] {
  overflow: hidden;
  isolation: isolate;
}
[data-beam][data-size="pulse-outside"] {
  overflow: visible;
  isolation: isolate;
}
[data-beam][data-size="pulse-inner"][data-active],
[data-beam][data-size="pulse-outside"][data-active] {
  animation: beam-fade-in 0.6s ease forwards;
}
[data-beam][data-size="pulse-inner"][data-fading],
[data-beam][data-size="pulse-outside"][data-fading] {
  animation: beam-fade-out 0.5s ease forwards;
}

/* ---- pulse-inner layers ---- */

[data-beam][data-size="pulse-inner"][data-active]::after,
[data-beam][data-size="pulse-inner"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-pulse-ring);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-opacity, 1.54) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: var(--beam-pulse-hue-shift) brightness(var(--beam-brightness, 0.75)) saturate(var(--beam-saturation, 1.2));
}

[data-beam][data-size="pulse-inner"][data-active]::before,
[data-beam][data-size="pulse-inner"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-pulse-inner);
  -webkit-mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-over;
  mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  will-change: opacity, filter;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-inner-opacity, 0.44) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: var(--beam-pulse-hue-shift) brightness(var(--beam-brightness, 0.75)) saturate(var(--beam-saturation, 1.2));
}

[data-beam][data-size="pulse-inner"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-pulse-bloom);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
  pointer-events: none;
  z-index: 3;
  will-change: opacity;
  opacity: 0;
}
[data-beam][data-size="pulse-inner"][data-active] [data-beam-bloom],
[data-beam][data-size="pulse-inner"][data-fading] [data-beam-bloom] {
  display: block;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-opacity, 0.66) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: blur(8px) var(--beam-pulse-hue-shift) brightness(var(--beam-brightness, 0.75)) saturate(var(--beam-saturation, 1.2));
}

/* ---- pulse-outside layers ---- */

[data-beam][data-size="pulse-outside"][data-active]::after,
[data-beam][data-size="pulse-outside"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-pulse-core);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-stroke-opacity, 0.94) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: var(--beam-pulse-hue-shift) brightness(var(--beam-brightness, 1.9)) saturate(var(--beam-saturation, 1.2));
}

[data-beam][data-size="pulse-outside"][data-active]::before,
[data-beam][data-size="pulse-outside"][data-fading]::before {
  content: "";
  position: absolute;
  inset: -10px;
  z-index: -1;
  border-radius: calc(var(--beam-radius, 16px) + 10px);
  background: var(--beam-pulse-core);
  transform: scale(0.95, 0.9);
  pointer-events: none;
  will-change: opacity, filter;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-inner-opacity, 0.34) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: blur(var(--beam-core-blur, 3px)) var(--beam-pulse-hue-shift) brightness(var(--beam-glow-brightness, 1.9)) saturate(var(--beam-glow-saturate, 1.2));
}

[data-beam][data-size="pulse-outside"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: -30px;
  z-index: -1;
  border-radius: calc(var(--beam-radius, 16px) + 30px);
  background: var(--beam-pulse-bloom);
  transform: scale(0.95, 0.9);
  pointer-events: none;
  will-change: transform;
  opacity: 0;
}
[data-beam][data-size="pulse-outside"][data-active] [data-beam-bloom],
[data-beam][data-size="pulse-outside"][data-fading] [data-beam-bloom] {
  display: block;
  animation: none;
  opacity: calc(var(--beam-opacity) * var(--beam-bloom-opacity, 0.3) * var(--beam-mono-multiplier, 1) * var(--beam-strength, 1));
  filter: blur(var(--beam-bloom-blur, 22.5px)) var(--beam-pulse-hue-shift) brightness(var(--beam-glow-brightness, 1.9)) saturate(var(--beam-glow-saturate, 1.2));
}

/* ---- pulse paused rule (offscreen, set by IntersectionObserver) ---- */

[data-beam][data-paused],
[data-beam][data-paused]::after,
[data-beam][data-paused]::before,
[data-beam][data-paused] [data-beam-bloom] {
  animation-play-state: paused !important;
}

/* ---- pulse reduced-motion ---- */

@media (prefers-reduced-motion: reduce) {
  [data-beam][data-active],
  [data-beam][data-fading],
  [data-beam][data-active]::after,
  [data-beam][data-fading]::after,
  [data-beam][data-active]::before,
  [data-beam][data-fading]::before,
  [data-beam][data-active] [data-beam-bloom],
  [data-beam][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`

writeFileSync(OUT, css, "utf8")
console.log(`Wrote ${OUT} (${css.length} chars, ${css.split("\n").length} lines)`)
