Feature: GPU-accelerated border beam color rendering
  The border beam keeps its upstream motion and mask geometry while vgpu renders
  every color layer from the upstream palette data.

  Scenario: Active beam replaces CSS color layers with vgpu
    Given an active border beam uses an upstream border-beam palette
    When the vgpu renderer initializes in a browser with WebGPU
    Then vgpu renders separate stroke, inner, and bloom color layers
    And CSS pseudo-element color backgrounds are disabled for that beam
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

  Scenario: GPU resources are cleaned up after unmount
    Given an active beam has initialized its vgpu color layers
    When the beam is unmounted or React Strict Mode remounts it
    Then every layer surface is disposed exactly once
    And the shared vgpu frame loop stops when no beam remains
