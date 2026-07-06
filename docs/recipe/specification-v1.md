# WineHub Recipe Specification

| Property      | Value                        |
| ------------- | ---------------------------- |
| Specification | WineHub Recipe Specification |
| Version       | 1.0.0-draft                  |
| Status        | Draft                        |
| Last Updated  | YYYY-MM-DD                   |
| License       | MIT                          |
| Authors       | WineHub Contributors         |

---

# Abstract

The WineHub Recipe Specification defines a portable, declarative and versioned format for describing how a Windows application should be prepared and executed on Linux.

The specification intentionally focuses on describing **intent**, not implementation.

A Recipe is independent from any launcher, package manager or Wine distribution.

Recipes may therefore be interpreted by different software implementations such as:

- WineHub CLI
- Lutris
- Bottles
- Heroic
- Steam (where applicable)
- Third-party launchers

The goal of this specification is to create a common language capable of describing reproducible execution environments for Windows software running on Linux.

---

# Motivation

Running Windows games on Linux often requires a combination of:

- Wine
- Proton
- Winetricks
- DXVK
- VKD3D
- Environment variables
- Registry modifications
- Prefix configuration
- Runtime options

Today, this knowledge is scattered across forums, Reddit posts, ProtonDB reports, YouTube videos and personal notes.

WineHub aims to transform this scattered knowledge into structured, reusable and versioned Recipes.

A Recipe should answer a single question:

> "What must be true for this application to run successfully?"

Instead of:

> "Which commands should I execute?"

This distinction is fundamental.

---

# Philosophy

The following principles define the WineHub ecosystem.

Every design decision MUST respect these principles.

---

## Intent over implementation

A Recipe describes **what** is required.

It never describes **how** it should be executed.

Example:

Good

```yaml
dependencies:
  - corefonts
```

Bad

```yaml
script:
  - winetricks corefonts
```

The implementation is the responsibility of the Recipe interpreter.

---

## Declarative

Recipes describe a desired state.

Execution engines are responsible for producing this state.

Recipes MUST remain deterministic.

---

## Portable

Recipes MUST NOT depend on a specific launcher whenever a generic abstraction exists.

The same Recipe SHOULD be executable by multiple implementations.

---

## Reproducible

Executing the same Recipe under identical conditions SHOULD produce the same result.

Recipes are intended to minimize manual intervention.

---

## Immutable

Published Recipe Versions are immutable.

Updating a Recipe creates a new Recipe Version.

Existing versions MUST remain available.

---

## Versioned

Every Recipe references a Specification Version.

Future specification revisions MUST preserve backward compatibility whenever possible.

---

## Generator Friendly

Recipes MUST be machine-readable.

They SHOULD be convertible into:

- Bash scripts
- Lutris installers
- Bottles configurations
- Heroic configurations
- Future runtimes

without requiring manual editing.

---

## Community Data Separation

Recipes contain technical information only.

Community data never belongs inside a Recipe.

Examples of community data:

- ratings
- comments
- votes
- compatibility reports
- bookmarks

These belong to the WineHub platform.

---

## Generated Artifacts

Recipes represent the source of truth.

Generated files are disposable artifacts.

Examples:

- Bash scripts
- Lutris YAML
- Bottles JSON
- Launcher configuration files

They MUST NOT be stored as part of the Recipe itself.

---

# Scope

The specification defines:

- Recipe structure
- Recipe semantics
- Validation rules
- Versioning strategy

The specification does NOT define:

- User authentication
- Community features
- REST APIs
- Database schemas
- User interfaces

Those belong to WineHub implementations.

---

# Terminology

## Recipe

A declarative document describing how a Windows application should be prepared and executed.

A Recipe is platform-independent.

---

## Recipe Version

An immutable snapshot of a Recipe.

Each modification creates a new Recipe Version.

---

## Runtime

Software responsible for executing Windows applications.

Examples:

- Wine
- Proton
- Bottles
- CrossOver

---

## Prefix

The isolated Windows environment used by a Runtime.

---

## Dependency

Any component required before launching the application.

Examples:

- Winetricks packages
- Runtime libraries
- Fonts
- Redistributables

---

## Environment Variable

A key/value pair influencing runtime behavior.

Example:

DXVK_ASYNC=1

---

## Requirement

A prerequisite that MUST be satisfied before executing the Recipe.

Examples:

- Linux distribution
- GPU vendor
- Runtime version
- Driver version

---

## Launcher

Software capable of interpreting a Recipe.

Examples:

- WineHub CLI
- Lutris
- Bottles

---

## Recipe Interpreter

Software that converts a Recipe into executable actions.

The interpreter is responsible for implementation.

The Recipe remains implementation-independent.

---

# Normative Language

The key words:

- MUST
- MUST NOT
- REQUIRED
- SHALL
- SHALL NOT
- SHOULD
- SHOULD NOT
- MAY

are to be interpreted as described in RFC 2119.

---

# Design Goals

WineHub Recipes are designed to be:

- Human readable
- Machine readable
- Easy to validate
- Easy to version
- Easy to diff
- Easy to review
- Easy to export
- Launcher agnostic
- Future proof

---

# Non Goals

Recipes are NOT intended to:

- replace launchers
- replace Wine
- replace IGDB
- contain shell scripts
- execute arbitrary commands
- become a programming language
- describe UI layouts
- store user preferences
- store platform metadata

Recipes describe execution intent only.

---

# High Level Structure

Every Recipe follows the same logical organization.

```yaml
Recipe
│
├── Requirements
├── Runtime
├── Prefix
├── Dependencies
├── Environment
├── Registry
├── Filesystem
├── Launch
└── Verification
```

The following chapters define each section in detail.

```

```
