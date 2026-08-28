Feature: Border beam showcase experience
  The demo presents the border-beam component as a focused visual showcase
  inspired by the upstream beam.jakubantalik.com experience.

  Scenario: Visitor sees the component and controls immediately
    Given a visitor opens the border-beam demo
    When the page finishes loading
    Then the header identifies the component and links to the project
    And Rotate and Pulse tabs are available before the examples
    And the first example is visible without scrolling

  Scenario: Visitor switches effect families
    Given the Rotate tab is selected
    When the visitor selects Pulse
    Then pulse-specific examples replace the rotate examples
    And the selected tab is announced accessibly

  Scenario: Visitor explores a playground variant
    Given the playground is visible
    When the visitor changes the effect type, color variant, or strength
    Then the preview updates to match the selected controls
    And the generated usage snippet reflects the selected values

  Scenario: Visitor can copy installation and usage snippets
    Given an installation or usage snippet is visible
    When the visitor activates its copy control
    Then the control reports the copied state
    And the snippet remains readable and keyboard accessible

  Scenario: Demo controls use shadcn primitives
    Given the showcase demo is rendered
    When the visitor navigates or changes a control
    Then effect-family navigation uses accessible shadcn Tabs
    And option sets use shadcn Button controls
    And strength uses the shadcn Slider
    And actions, status labels, separators, cards, and fields use shadcn primitives
