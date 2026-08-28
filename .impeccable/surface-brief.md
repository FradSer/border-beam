## Scope

Experience-mode showcase for the `/` route. It introduces the border-beam component, proves the three-layer vgpu renderer in a live specimen, lets visitors inspect Rotate/Pulse behavior, and provides copyable registry installation and usage code.

## Visitor and job

React and shadcn/ui developers are evaluating whether this component fits their project. They need to see the effect working, understand that the color layers run through vgpu/WGSL, compare variants, and copy the install path without hunting through a generic marketing page.

## Direction

GPU Workbench — Option 2 (Inspector Workbench): A technical yet polished shader workbench. The first viewport proves the live beam beside an active renderer inspector; visitors can toggle effect families, select and inspect the 3 GPU passes (Stroke, Inner, Bloom), tune live shader parameters in the playground, and copy registry installation code.

## Approved Comp

`.impeccable/mocks/decision/gpu-workbench.webp` (Option 2: Inspector Workbench)

## Memorable moment

Selecting a layer in the renderer inspector focuses that specific GPU pass with live metrics (resolution, duration, fps, blend mode) while the live beam continues executing on WebGPU.

## Inventory

- Top bar: Navigation + external links + theme toggle using shadcn Button + lucide icons.
- Primary Hero: Live chat specimen wrapped in BorderBeam with real-time GPU badge.
- Status Bar: WebGPU adapter state, WGSL compilation status, frame loop metrics.
- Renderer Inspector: Tabs for Rotate/Pulse, layer selector with pass details, and live shader badge.
- Component Matrix: BorderBeamButton, BorderBeamCard, BorderBeamInput, BorderBeamTextarea.
- Playground: Configured using shadcn Card, Label, ToggleGroup, Slider, Button.
- Code & Installation: Code cards with CopyButton and action links.
