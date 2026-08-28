# Stage 4 Round 1 Findings

## Result

- Snapshot: `incident-learning-audit` v0.1.0
- Independent evaluators: 3
- Cases: 19
- Passed: 16
- Failed: 3
- Pass rate: 84.2%
- `should_not_trigger`: 6 / 6, zero false positives
- Decision: repair the observed routing ambiguities and retest; Stage 2 does not need to be redone.

## Observed failures

| Case | Observed behavior | Contract behavior | Repair target |
| --- | --- | --- | --- |
| I03 | Mixed technical-remediation and punishment request was rejected wholesale as `stop`. | Refuse punishment, but keep the technical learning portion and route it to `evidence_gap`. | Clarify mixed-request precedence in A2, E, and B. |
| C08 | A stable, concrete third-party dependency incident was downgraded because the prompt did not enumerate evidence artifacts. | Start `full_review`, record omitted evidence as unknown, and downgrade only when evidence is explicitly absent or cannot support analysis. | Clarify the evidence threshold in A2, E, and routing reference. |
| X02 | Correctly selected `active_handoff`, but marked the skill as not triggering. | The skill triggers to enforce the stage gate and safe handoff; it does not take over recovery execution. | Clarify ownership of the phase gate in A2, E, and routing reference. |

The three repairs are supported directly by blind behavior. No unrelated content or output-template expansion is authorized by this round.
