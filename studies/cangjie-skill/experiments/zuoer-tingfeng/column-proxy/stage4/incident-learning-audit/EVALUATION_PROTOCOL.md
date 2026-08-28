# Incident Learning Audit — Stage 4 Evaluation Protocol

## Purpose

Test trigger precision, route selection, safety boundaries, and action quality without exposing the oracle to evaluators.

## Blind-evaluation rules

1. Each evaluator receives only an isolated skill snapshot, a small adjacent-capability catalog, and prompts with opaque IDs.
2. Evaluators must not inspect the source repository, Stage 1.5 cases, `test-prompts.json`, prior reports, other evaluator groups, or expected answers.
3. For every prompt, the evaluator returns `would_trigger`, `selected_capability`, `route`, `reason`, `if_triggered_action`, and `safety_notes`.
4. Evaluators do not grade themselves. The main agent maps opaque IDs back to the frozen oracle and records verdicts.
5. Any false positive in `should_not_trigger` blocks acceptance. Overall acceptance requires 100% in this production-candidate round.

## Isolation

The `round-01/evaluator-*` directories contain independent copies of only the files an evaluator is allowed to read. Raw evaluator output is retained unchanged for auditability.
