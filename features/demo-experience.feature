Feature: Border beam showcase experience
  Developers configure a live beam, explore wrappers, and install the registry item.

  Scenario: Visitor sees the component and controls immediately
    Given a visitor opens the border-beam demo on desktop
    When the page finishes loading
    Then the header identifies border-beam and links to this project
    And Rotate and Pulse tabs and the live preview are visible without scrolling
    And the page does not claim an unverified GPU adapter status

  Scenario: Visitor switches effect families
    Given the Rotate tab is selected
    When the visitor selects Pulse
    Then the preview uses the pulse-inner preset
    And only pulse-inner and pulse-outside preset options are available
    And the selected tab is announced accessibly
    When the visitor selects Rotate
    Then the preview uses the md preset

  Scenario: Visitor explores a playground variant
    Given the playground is visible
    When the visitor changes the effect type, color variant, or strength
    Then the preview updates to match the selected controls
    And the generated usage snippet reflects the exact selected values and active state
    And effect-family navigation uses shadcn Tabs
    And option sets use shadcn ToggleGroup controls
    And strength uses a named shadcn Slider

  Scenario: Visitor disables the decorative effect
    Given the beam effects are enabled
    When the visitor selects Hide effects
    Then all preview and wrapper beams are inactive
    And the control offers Show effects
    And the usage snippet includes active={false}

  Scenario: Visitor copies a snippet successfully
    Given an installation or usage snippet is visible
    When the clipboard write succeeds
    Then the copy control reports Copied
    And the snippet remains readable and keyboard accessible

  Scenario: Clipboard access is denied
    Given an installation or usage snippet is visible
    When the clipboard write fails
    Then the control does not report success
    And a persistent status asks the visitor to select and copy the code manually

  Scenario: Visitor explores component wrappers
    Given the component examples are visible
    Then button, card, input, and textarea wrappers are shown
    And editable fields have visible bound labels
    And each wrapper has its own registry installation command

  Scenario: Visitor uses a narrow screen or reduced motion
    Given the viewport is 320 CSS pixels wide
    Then the page has no horizontal overflow
    And code can scroll inside its own container
    And every toolbar control fits inside the workbench without clipping
    When the visitor requests reduced motion
    Then page scrolling is not animated

  Scenario: Visitor switches the page theme
    Given the demo uses the dark theme
    When the visitor selects Switch to light theme
    Then the page and every preview use the light theme
    And the control offers Switch to dark theme
    And inactive family tabs remain readable with sufficient text contrast
