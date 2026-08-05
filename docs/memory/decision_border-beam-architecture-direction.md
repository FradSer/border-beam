---
name: border-beam-architecture-direction
category: decision
summary: border-beam 项目刻意保持 shadcn registry + 静态 CSS 架构，即使上游已重构为 npm 库
source: border-beam
created: 2026-08-05
updated: 2026-08-05
---

## Fact

border-beam（FradSer fork of Jakubantalik/border-beam）决定保持 **shadcn registry 分发 + 静态 CSS + @property** 架构，而不是跟随上游 v1.4.0 完全重构为 npm 库（运行时 `<style>` 注入）。

## Why

上游 Jakubantalik/border-beam 在 v1.4.0 彻底重构：从静态 CSS 改为每实例 `useId` 注入 `<style>`，新增 pulse-inner/pulse-outside 呼吸类型 + 共享 rAF 驱动（pulseDriver.ts）。2026-08-05 确认三项决策：对齐上游功能（5 种 size、全部参数）、保留静态 CSS 定位（不引入运行时注入）、补充 pulse 预包装组件。多实例隔离靠「继承的自定义属性 + 静态 data-* 选择器」，pulse 呼吸由共享 rAF 写全局变量（--bw1/--bop-tl/--beam-hue）到各元素。

## How to apply

未来同步上游时，先确认上游新功能能否静态化（全局 @property + 继承变量）；若上游改架构，评估是否值得保留本项目 registry 形态。pulse 功能的关键约束：`pulse-driver.ts` 的振荡器变量名与 `generate-css.mjs` 里 `var()` 引用需手动保持同步（两者不共享代码），bloom 层用冻结 alpha 让合成器缓存。上游引入的 pulse 渐变数据表（PULSE_RING_MAP 等）已在 generate-css.mjs 移植并复用了脚本已有的 mdPalettes（与上游 colorPalettes.border 一致）。

## Related

- `registry/new-york/ui/pulse-driver.ts`
- `scripts/generate-css.mjs`
