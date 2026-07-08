# WineHub Recipe Specification

# Table of Contents

1. Abstract
2. Motivation
3. Philosophy
4. Scope
5. Terminology
6. Normative Language
7. Design Goals
8. Non Goals
9. Recipe Document Structure
10. Validation Rules
11. Versioning
12. Examples
13. Future Extensions
14. Appendices

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

```text
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

# Recipe Document Structure

## Overview

A WineHub Recipe is a structured document describing the desired execution environment for a Windows application running on Linux.

Recipes MUST be serializable as either YAML or JSON.

YAML is the recommended format for human editing.

JSON is recommended for APIs and storage.

Regardless of the serialization format, both representations describe the exact same document.

---

## Root Object

A Recipe document consists of a single root object.

The root object MUST NOT contain duplicated properties.

Example:

```yaml
schemaVersion: 1

requirements:

runtime:

prefix:

dependencies:

environment:

registry:

filesystem:

launch:

verification:
```

The order of sections SHOULD follow the specification for readability.

Parsers MUST NOT rely on field ordering.

Unknown fields MUST trigger a warning.

Strict validation MUST reject unknown fields.

---

# schemaVersion

## Purpose

Identifies the version of the WineHub Recipe Specification implemented by the document.

This field allows future versions of the specification to coexist.

---

## Type

Integer

---

## Required

YES

---

## Constraints

- MUST be the first field of the document.
- MUST be greater than zero.
- Version 1 Recipes MUST contain:

```yaml
schemaVersion: 1
```

---

## Example

```yaml
schemaVersion: 1
```

---

# requirements

## Purpose

Defines the minimum system requirements necessary to successfully execute the Recipe.

Requirements are informational.

They allow implementations to warn users before executing the Recipe.

Requirements MUST NOT contain executable instructions.

---

## Required

NO

---

## Structure

```yaml
requirements:
  distro:

  drivers:

  hardware:

  runtime:
```

Every subsection is optional.

---

## Example

```yaml
requirements:
  distro:
    - ubuntu>=24.04

    - fedora>=42

  drivers:
    nvidia: ">=575"

  hardware:
    ram: 8GB

    gpu:
      - nvidia

      - amd

  runtime:
    minimumVersion: GE-Proton10
```

---

# runtime

## Purpose

Defines the execution runtime required by the Recipe.

The runtime is responsible for executing the Windows application.

---

## Required

YES

---

## Structure

```yaml
runtime:
  provider:

  version:
```

---

## Fields

| Name     | Type   | Required |
| -------- | ------ | -------- |
| provider | string | YES      |
| version  | string | YES      |

---

## Example

```yaml
runtime:
  provider: proton-ge

  version: GE-Proton10-5
```

---

## Notes

The specification intentionally does not restrict provider names.

Examples include:

- wine
- wine-ge
- proton
- proton-ge
- crossover

Future implementations MAY support additional runtimes.

---

# prefix

## Purpose

Defines properties of the Windows prefix.

---

## Required

NO

---

## Structure

```yaml
prefix:
  architecture:
```

---

## Fields

| Name         | Type | Required |
| ------------ | ---- | -------- |
| architecture | enum | NO       |

Allowed values:

- win32
- win64

---

## Example

```yaml
prefix:
  architecture: win64
```

---

# dependencies

## Purpose

Defines external components required before launching the application.

Dependencies describe WHAT is required.

They never describe HOW to install it.

---

## Required

NO

---

## Structure

```yaml
dependencies:
  - provider:

    package:
```

---

## Fields

| Name     | Type   | Required |
| -------- | ------ | -------- |
| provider | string | YES      |
| package  | string | YES      |

---

## Example

```yaml
dependencies:
  - provider: winetricks

    package: corefonts

  - provider: winetricks

    package: vcrun2022
```

---

# environment

## Purpose

Defines environment variables applied before application startup.

---

## Required

NO

---

## Structure

```yaml
environment:
  VARIABLE_NAME: value
```

---

## Example

```yaml
environment:
  DXVK_ASYNC: "1"

  MANGOHUD: "1"

  WINEDEBUG: "-all"
```

---

## Validation

Environment variable names MUST be unique.

---

# registry

## Purpose

Defines Windows Registry modifications required by the Recipe.

---

## Required

NO

---

## Structure

```yaml
registry:
  - key:

    value:

    data:
```

---

## Example

```yaml
registry:
  - key: HKCU\\Software\\Wine\\Direct3D

    value: VideoMemorySize

    data: "8192"
```

---

# filesystem

## Purpose

Describes filesystem operations required by the Recipe.

Filesystem operations describe desired state.

They MUST NOT reference shell commands.

---

## Required

NO

---

## Structure

```yaml
filesystem:
  - operation:

    source:

    destination:
```

---

## Example

```yaml
filesystem:
  - operation: copy

    source: dlls/dinput8.dll

    destination: drive_c/Game/
```

---

# launch

## Purpose

Defines how the Windows application should be started.

---

## Required

YES

---

## Structure

```yaml
launch:
  executable:

  arguments:

  workingDirectory:
```

---

## Fields

| Name             | Type   | Required |
| ---------------- | ------ | -------- |
| executable       | string | YES      |
| arguments        | array  | NO       |
| workingDirectory | string | NO       |

---

## Example

```yaml
launch:
  executable: Diablo IV.exe

  arguments:
    - -dx12

  workingDirectory: drive_c/Program Files/Diablo IV/
```

---

# verification

## Purpose

Describes how a user can verify that the Recipe executed successfully.

Verification is intended for humans.

It MUST NOT contain executable logic.

---

## Required

NO

---

## Structure

```yaml
verification:
  expectedResult:

  knownIssues:
```

---

## Example

verification:

expectedResults:

    - Main menu appears

    - Save creation works

    - No graphical corruption

knownIssues:

    - Intro video may stutter

    - Ray Tracing is unstable

---

# Complete Example

```yaml
schemaVersion: 1

runtime:
  provider: proton-ge

  version: GE-Proton10-5

prefix:
  architecture: win64

dependencies:
  - provider: winetricks

    package: corefonts

  - provider: winetricks

    package: vcrun2022

environment:
  DXVK_ASYNC: "1"

launch:
  executable: Diablo IV.exe

verification:
expectedResults:
  - Main menu loads successfully

  - Campaign is playable
```

# Design Notes

The dependency model may evolve.

The filesystem model may evolve.

The registry abstraction may evolve.

The specification intentionally leaves room for future refinements.
