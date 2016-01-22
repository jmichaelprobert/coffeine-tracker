Feature: Log a brew
Rules:
  - Brew is created when it is added
  - Brew must have barista, brewMethod, and date

  Background:
    Given the following brews exist:
      | date   | barista    | brewMethod |
      | 1/3/16 | "@michael" | "chemex_s" |
      | 1/4/16 | "@michael" | "chemex_m" |
      | 1/4/16 | "@troya"   | "chemex_l" |
      | 1/5/16 | "@troya"   | "chemex_l" |
      | 1/5/16 | "@troya"   | "chemex_l" |
      | 1/6/16 | "@michael" | "chemex_l" |

  Scenario: Brew is added

    When the following brew is added
      | date    | barista    | brewMethod |
      | 1/21/16 | "@michael" | "chemex_l" |
    Then there are 7 brews
