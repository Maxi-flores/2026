Description.md — Sapient KB / Sentient OS Conceptual Architecture

Purpose

This document defines the conceptual architecture for the relationship between Sentient OS, Sapient KB, Powerframe HUB, Powerstarter HUB, and the wider WOMMedia / Powerframe / TRT ecosystem.

The goal is to create a rational project structure where governance, knowledge indexing, execution, and SaaS output are separated into clear layers.

This prevents the ecosystem from becoming polluted by random tasks, Git branches, or temporary prompts being treated as root-level project truth.

Core Principle

The ecosystem must not use individual tasks, Git branches, or one-off prompts as the main structure of the project root.

Instead:

Sentient OS creates and controls tagged input.
Sapient KB stores and displays indexed output.

Every prompt, decision, task, component, integration, or project movement should become a structured knowledge entry that is logged back into the correct root and branch inside Sapient KB.

Correct Layer Separation

Powerframe HUB
└── Sentient OS
    └── Input / governance / prompt-control plane 
Powerstarter HUB
└── Sapient KB
    └── Output / root-branch index / project memory layer
TRT / SaaS Output
└── Selected usable views, tools, dashboards, and product surfaces

System Roles

Powerframe HUB

Powerframe HUB is the operational and control-facing hub.

It is where the active control systems live, including the Sentient OS input layer and future operational modules connected to project governance, agents, and execution.

Sentient OS

Sentient OS is the governance and input-control plane.

Its responsibility is not to store the full project truth directly.

Instead, Sentient OS should:

* Interpret project prompts
* Generate structured project tags
* Classify new project input
* Connect prompts to the correct root or branch
* Control the governance logic
* Prevent agent drift
* Route structured project entries toward Sapient KB

Sentient OS acts as the intelligence layer that decides how new information should be understood.

Powerstarter HUB

Powerstarter HUB is the ecosystem, business, and template hub.

It represents the broader business/output structure where reusable systems, templates, project maps, and knowledge surfaces can be displayed.

Sapient KB

Sapient KB is the root-and-branch knowledge index of the ecosystem.

Sapient KB belongs as an output/index layer inside Powerstarter HUB.

Sapient KB is not a separate “Powerstarter SKB” product. The correct name is Sapient KB.

Sapient KB should:

* Store the root project index
* Store project branches
* Store sub-branches
* Store prompt-generated entries
* Store decision records
* Store component mappings
* Store repo references
* Store output mappings
* Display the relationship between systems
* Act as the durable project memory layer

Sapient KB is the place where the ecosystem grows in an organized way.

Main Data Flow

Prompt / project action
   ↓
Sentient OS on Powerframe HUB interprets and governs the input
   ↓
Sentient OS generates a structured tag
   ↓
Sapient KB on Powerstarter HUB stores the entry
   ↓
Sapient KB maps it under the correct root, branch, project, component, or decision
   ↓
GMS / TPR / CRM / WMS can read from that indexed structure
   ↓
TRT / SaaS output can expose selected views or tools

What This Solves

This structure prevents the ecosystem from confusing:

* A prompt with a project
* A task with a root branch
* A Git branch with a project branch
* A repo with the full business structure
* A temporary idea with production truth
* An agent action with a durable decision

Instead, every new piece of input receives a clear place in the knowledge structure.

Root Project Index

Sapient KB should be able to index the following root-level ecosystem areas:

WOMMedia
Sentient OS
Sapient KB
Powerframe
Powerstarter
TheRocketTree
ConceptSHOP / CustomSHOP
Dealinstinct / Bikerinstinct
Mucho3D / Flink3D

Each root project can contain:

* Branches
* Sub-branches
* Components
* Prompt entries
* Decisions
* Repositories
* Integrations
* SaaS outputs
* State/phase records

Relationship With Other Systems

Powerframe GMS

Powerframe GMS maps root, branch, state, and phase.

It can read from Sapient KB to understand what exists in the ecosystem and what state each branch is in.

Powerframe TPR

Powerframe TPR handles planning and task execution.

It should not become the root project truth. It should use Sapient KB as the structured reference for where tasks belong.

Powerframe CRM / WMS

CRM and WMS connect Sapient KB structure to business, sales, finance, customer, inventory, and operational workflows.

TRT

TRT is the flagship output layer.

TRT can expose selected parts of Sapient KB, Powerframe, or Powerstarter as SaaS-facing dashboards, tools, or product experiences.

Git Repositories

Git repositories are implementation and code-history layers.

Git is not the main project truth.

Git branches should not be treated as the same thing as Sapient KB project branches.

A Sapient KB branch describes the conceptual/business/product structure.
A Git branch describes implementation history.

Tagging Concept

Sentient OS should generate structured tags for new entries.

Example tags:

[SKB-ROOT:SENTIENT-OS-001]
[SKB-BRANCH:POWERFRAME-GMS-001]
[SKB-PROMPT:SAP-KB-MAPPER-001]
[SKB-DECISION:SENTIENT-INPUT-LAYER-001]
[SKB-OUTPUT:TRT-SAAS-001]
[SKB-INTEGRATION:CSHOP-CRM-001]

Each tag should identify:

* Knowledge layer
* Entry type
* Related system
* Sequential entry number

The tag does not need to be hardcoded into every production script yet.

At this stage, tags should exist inside the Sapient KB data model and UI so the structure can be mapped safely before automation is added.

Entry Types

Sapient KB should support entries such as:

root-project
branch
sub-branch
prompt
decision
component
repo
output
integration
state-record
phase-record

Entry States

Sapient KB entries should support states such as:

idea
mapped
planned
in-development
testing
production-ready
production-active
paused
blocked
archived

Priority Logic

Priority tiers should be used to clarify importance:

1 = Critical / core foundation
2 = High priority
3 = Medium priority
4 = Supporting layer
5 = Showcase / later priority

Priority does not mean automatic execution.
Priority only describes the strategic importance of the entry inside the ecosystem.

Conceptual Data Model

A future implementation can use a structure similar to:

type SapientKBState =
  | "idea"
  | "mapped"
  | "planned"
  | "in-development"
  | "testing"
  | "production-ready"
  | "production-active"
  | "paused"
  | "blocked"
  | "archived";
type SapientKBEntryType =
  | "root-project"
  | "branch"
  | "sub-branch"
  | "prompt"
  | "decision"
  | "component"
  | "repo"
  | "output"
  | "integration"
  | "state-record"
  | "phase-record";
type SapientKBEntry = {
  id: string;
  tag: string;
  type: SapientKBEntryType;
  rootProject: string;
  branch?: string;
  subBranch?: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3 | 4 | 5;
  state: SapientKBState;
  phase?: string;
  sourcePrompt?: string;
  connectedSystems: string[];
  outputLayer?: string;
  repoTarget?: string;
  createdFrom?: "manual" | "sentient-os" | "codex" | "gms" | "tpr";
  notes?: string;
  children?: SapientKBEntry[];
};

First Implementation Target

The first implementation should be a conceptual Sapient KB output page inside Powerstarter HUB.

It should include:

* Root project cards
* Branch explorer
* Prompt entry log
* Decision log
* Tag matrix
* Priority filter
* State filter
* Output layer mapping
* Connected systems view

This must be a safe index layer only.

Safety Rules

Do not create automatic deployment logic.

Do not push to main automatically.

Do not treat all tasks as production-ready.

Do not hardcode tags into every script yet.

Do not modify unrelated dashboard layout.

Do not create a separate product called Powerstarter SKB.

Do not use Git branches as the primary project branch structure.

Final Architecture Statement

Sentient OS is the input and governance layer on Powerframe HUB.

Sapient KB is the indexed output and project memory layer on Powerstarter HUB.

Powerframe GMS maps state and phase.

Powerframe TPR manages planning and execution.

TRT exposes selected SaaS-facing outputs.

Git stores code, but Sapient KB stores project truth.
