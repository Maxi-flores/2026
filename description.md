# TRT V2 Launch Roadmap — 1000-Word Summary

This note captures the decisions, guardrails, and remaining work needed to evolve TRT V2 from a validated “semantic bridge runtime” into a launchable Unity ↔ web/app ecosystem within ~3–6 months. It aligns what is already safe, what must be built next, and what must remain gated.

## Current State (Already Built)

**Monorepo foundation.** The core workspace is described as stable and operational: Turborepo orchestration, pnpm workspace structure, typed package boundaries, centralized contract ownership, and a clean dependency graph. Deployment is Vercel-safe with CI guardrails and smoke validation. **TRT is the canonical contract owner.** No external repo may redefine bridge contracts, runtime event schemas, semantic meaning, or Unity action contracts.

**Semantic bridge runtime.** The runtime chain is: external fixture/event → contract validation → semantic processing → runtime meaning → candidate evaluation → review surface. Adapters exist for TPR, WMS, GMS, Sapient, and Unity. Safety is enforced by default: validation, semantic evaluation, orchestration inspection, meaning generation, and bridge-chain reporting are enabled, while Unity dispatch, persistence, network posting, autonomous actions, and mutation hooks are intentionally disabled. The governing stance is that TRT V2 stays **local-only, deterministic, and non-autonomous** until review systems can reliably prevent unsafe behavior.

**Governance & safety layer.** Governance mechanisms are implemented (GovernanceAuditEngine, contract-ownership review, CI bridge-chain guardrails, runtime validation matrix, smoke checks, deterministic audit flows). The safety rules are explicit: no dispatch, no persistence, no runtime mutation, no autonomous execution, and no external posting. Any new capability must pass a gated sequence—contract review → governance approval → smoke validation → runtime inspection → controlled rollout—before it can be activated.

**Sapient semantic layer.** Sapient includes a morphology system (SKB SapientKnowledgeBase), volatile ring buffer, semantic gateway, override leasing, semantic node activation, and bridge integration. Strategically, Sapient is framed as an advisory semantic intelligence and orchestration-memory substrate. The decision is to keep Sapient **non-authoritative** until governance maturity; it can inform evaluation and recognition, but must not become an uncontrolled source of truth or action.

## Roadmap to a Launchable Platform

The remaining work is organized into five phases to preserve determinism and prevent runaway automation.

### Phase 1 — Real Engine Loop

The goal is to connect a live Unity runtime into the TRT semantic bridge. A Unity runtime client must post live runtime events, stream telemetry, maintain session state, and format bridge payloads deterministically. Constraints come from WebGL and networking (async sync, lifecycle/reconnect handling). The near-term decision is to keep Unity **telemetry/input-only** (no autonomous dispatch).

Phase 1 also requires an identity/session system (Firebase Auth, session ownership, profile linkage, anonymous upgrade flow). The hardest requirement is consistent ownership across Unity ↔ web sessions and reconnects. A firm decision is that **session ownership becomes mandatory before persistence.** Finally, Phase 1 introduces a live bridge stream (event intake, buffering, deduplication, throttling). Rate limiting is required to prevent bridge spam, runtime loops, and semantic flooding.

### Phase 2 — Persistent Platform

This phase turns runtime signals into durable platform state. It adds an event persistence layer for BridgeEvent storage, session history, recognition history, and semantic outcomes, while protecting replay determinism and auditability (schema evolution and event volume are the main risks). The decision is that persistence must remain **replay-safe and audit-safe.**

Phase 2 also integrates the PowerStarter feed (progression, achievements, recognitions, milestones, journaling). The goal is meaningful progression without shallow gamification; therefore **PowerStarter owns user-visible progression output.** In parallel, a GMS runtime control layer is required for feature gates, route approvals, governance controls, and semantic overrides. The decision is that **GMS owns approvals and governance**, but not semantic evaluation ownership.

### Phase 3 — Unity Web Engine

This phase delivers the first real “engine surface” via a Unity WebGL experience (targeted at `/engine`) with embedded runtime and live bridge connectivity. Constraints are browser memory limits, performance, and websocket stability. The decision is that **WebGL is the first launchable engine surface.**

Two supporting deliverables follow: semantic visualization (graph overlays, route chains, relationships, pattern inspection) and Design Book integration (design tokens, theming, semantic visual states). Visualization must be layered to avoid overload; Design Book becomes the canonical visual governance layer to reduce UI fragmentation.

### Phase 4 — Controlled Automation

Automation is introduced only through a governed candidate pipeline: event → semantic evaluation → candidate proposal → governance approval → Unity action. The core risks are feedback loops, unsafe behavior, and nondeterministic orchestration. The decision is **no automatic dispatch** without governance review, replay validation, and audit confirmation. Semantic scoring (confidence, priority, recognition strength, route weighting) is required, but it must remain **explainable and inspectable** to avoid “black box” behavior.

### Phase 5 — Launchable Product

The final step is productization: onboarding, clear progression, responsive UX, and visual consistency, with an explicit requirement that users experience progression/recognition/discovery—not internal semantic complexity. Operational stability becomes equal to feature velocity: monitoring, telemetry dashboards, rollback systems, and reliable deployments are needed to manage concurrency, debugging complexity, and cost. A major open decision is mobile/app strategy (web-first vs Unity-native vs PWA vs React Native shell), with a warning that multiple directions can fragment the runtime.

## Biggest Risk Zones

The note highlights four primary risks: architecture fragmentation across systems (TPR ≠ GMS ≠ TRT ≠ SKB), premature automation, UX complexity explosion, and scope explosion. The prevention pattern is consistent: TRT remains canonical, approvals remain gated, complexity is disclosed progressively, and focus stays on the Unity loop, progression feed, governance, and semantic runtime before ecosystem expansion.

## Target MVP (3–6 Months) and Strategic Direction

The target MVP combines: Unity WebGL engine + live bridge + semantic processing; PowerStarter progression feed with recognitions/milestones and session ownership; GMS approvals/feature gates and semantic inspection; Sapient node activation, route chains, and semantic scoring; plus replay validation, audit logging, and governance review.

The note explicitly rejects “too early” ambitions: autonomous AI control, autonomous gameplay orchestration, uncontrolled persistence, multi-agent autonomy, MMORPG-scale complexity, economic simulation, and uncontrolled runtime mutation. Strategically, TRT V2 is framed as a governed semantic operating system—so governance, determinism, replayability, semantic clarity, runtime safety, and orchestration discipline must come before aggressive feature expansion.
