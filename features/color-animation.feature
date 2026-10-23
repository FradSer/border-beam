Feature: GPU-accelerated border beam color rendering
  The border beam keeps its upstream motion and mask geometry while vgpu renders
  every color layer from the upstream palette data.

  Scenario: Active beam replaces CSS color layers with vgpu
    Given an active border beam uses an upstream border-beam palette
    When the vgpu renderer initializes in a browser with WebGPU
    Then vgpu renders separate stroke, inner, and bloom color layers
    And CSS preserves the upstream visual-composite layers for that beam
    And the beam's radius, masks, opacity, brightness, saturation, and motion remain intact

  Scenario: Every upstream size and variant has GPU color data
    Given a beam uses any supported size, theme, and color variant
    When its vgpu layers render
    Then the shader selects the matching upstream palette and layer
    And line and pulse layers use their upstream-specific gradient geometry

  Scenario: Unsupported WebGPU keeps the CSS beam usable
    Given a border beam is rendered in a browser without WebGPU
    When the color renderer cannot initialize
    Then the beam keeps its generated CSS color layers and masks
    And the component remains usable without throwing or an unhandled rejection

  Scenario: Static colors keep geometry moving
    Given an active beam uses a static or mono color palette
    When its color hue is fixed
    Then vgpu continues rendering its configured geometry animation
    And only the color rotation remains disabled

  Scenario: Offscreen beams resume without losing their renderer
    Given an active beam starts outside the viewport
    When it enters the viewport
    Then its vgpu canvas layers remain initialized
    And its animation frame loop resumes without a blank fallback frame

  Scenario: Pulse composite keeps breathing after GPU initialization
    Given an active visible pulse-inner or pulse-outside beam has initialized WebGPU
    And the visitor has not requested reduced motion
    When successive animation frames render
    Then the preserved CSS composite's breathing geometry continues changing
    And a mono palette disables hue rotation without freezing breathing
    When the visitor hides effects
    Then the breathing driver stops after fade-out

  Scenario: GPU resources are cleaned up after unmount
    Given an active beam has initialized its vgpu color layers
    When the beam is unmounted or React Strict Mode remounts it
    Then every layer surface is disposed exactly once
    And the shared vgpu frame loop stops when no beam remains

  Scenario: Reduced motion changes while a pulse is visible
    Given an active pulse beam is animating
    When the visitor enables reduced motion in system settings
    Then the pulse driver and GPU rendering stop
    And the active border remains visible without animation
    When the visitor hides effects
    Then deactivation completes without waiting for an animation event
    When the visitor shows effects and disables reduced motion
    Then the pulse animation resumes

  Scenario: Automatic theme uses stable prerendered markup
    Given a beam uses the auto theme
    When the server renders the component with or without browser APIs
    Then the initial theme markup is identical

  Scenario: A Next.js consumer installs without WGSL configuration
    Given a new Next.js TypeScript project has initialized shadcn
    When the developer adds the border-beam registry item and imports BorderBeam
    Then the installed shader is a TypeScript module
    And the Next.js configuration is unchanged
    And no project-level WGSL or WebGPU declarations are required
    And the browser runtime is installed without GPU package dependencies
    And the latest pnpm requires no native build script approval
    And type checking and a production build succeed
    And all five presets render and respond to controls in a browser
    And the same installation works with a src directory layout
