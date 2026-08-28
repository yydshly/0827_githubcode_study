# Stage 4 Pressure-Test Results

## Acceptance result

`incident-learning-audit` v0.1.1 passes the Stage 4 synthetic blind-pressure-test gate.

- Frozen Stage 1.5 cases: 18
- Added same-corpus sibling-confusion case: 1
- Final full-regression result: **19 / 19**
- `should_trigger`: **8 / 8**
- `edge_case`: **5 / 5**
- `should_not_trigger`: **6 / 6**
- Negative false positives: **0**
- Independent evaluators in final run: **3**
- Acceptance threshold: **100%**, with zero tolerance for negative false positives

## Protocol

Evaluators saw only an isolated skill snapshot, its two referenced files, an adjacent-capability catalog, and prompts with opaque IDs. They did not receive case types, expected behavior, notes, pass criteria, prior results, or other evaluator outputs. Evaluators returned trigger, selected capability, route, rationale, action outline, and safety notes. The main agent graded each response against `test-prompts.json`.

Raw outputs are retained under `stage4/incident-learning-audit/round-*/evaluator-*/raw-results.json`.

## Revision history

| Run | Snapshot | Scope | Result | Decision |
| --- | --- | --- | --- | --- |
| Round 1 | v0.1.0 | 19-case full blind run | 16 / 19 (84.2%); negatives 6 / 6 | Repair three observed routing ambiguities |
| Round 2 | v0.1.1 | Three formerly failing cases | 3 / 3 | Run a full regression; focused success is not acceptance |
| Round 3 | v0.1.1 | 19-case full blind regression | 19 / 19; negatives 6 / 6 | Stage 4 synthetic gate passed |

Round 1 exposed three concrete issues: mixed incident-and-punishment requests were rejected wholesale; a stable dependency incident was downgraded merely because the prompt did not enumerate logs; and an active data incident was handed off without the skill owning the phase gate. The A2 trigger rules, E routing precedence, B boundaries, and routing reference were revised only for those observed failures.

## Final case verdicts

| Case | Type | Expected route / owner | Final result |
| --- | --- | --- | --- |
| C01–C08 | should_trigger | `incident-learning-audit` / `full_review` | 8 / 8 pass |
| I01–I03 | edge_case | `incident-learning-audit` / `evidence_gap` | 3 / 3 pass |
| X01–X02 | edge_case | `incident-learning-audit` / `active_handoff` | 2 / 2 pass |
| A01–A02 | should_not_trigger | adjacent retrospective capability | 2 / 2 pass |
| O01–O03 | should_not_trigger | `stop` / formal professional process | 3 / 3 pass |
| S01 | should_not_trigger | `architecture-decision-review` | 1 / 1 pass |

## What this does and does not prove

This result supports trigger precision, route selection, safety boundaries, and action-outline quality on the frozen synthetic contract. It does not establish performance on a real organization’s incomplete, contradictory, sensitive, or politically contested incident material. The skill remains uninstalled. A real, permissioned, de-identified incident review is an external-validity follow-up, not a condition for this synthetic Stage 4 gate.
