# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal GitHub profile repository for NeKoOuO that hosts Traditional Chinese Kotlin programming tutorials. There is no build system, executable code, CI/CD pipeline, or package manager — the repository is exclusively markdown documentation.

## Content Structure

The `Kotlin/` directory contains three sequentially structured tutorial files:

| File | Content |
|------|---------|
| `Kotlin（一）基礎語法.md` | Environment setup (Java 8 + Kotlin 1.9.0), variables, basic syntax |
| `Kotlin（二）類與物件.md` | Functions, classes, OOP, constructors, visibility modifiers, inheritance |
| `Kotlin（三）進階特性.md` | Generics, higher-order functions, lambdas, extension functions, standard library (`apply`, `let`, `run`, `also`, `takeIf`, etc.), collections |

The tutorials are written for JVM-based Kotlin development and build progressively — each file assumes knowledge from the previous one.

## Conventions for Editing Tutorials

- Language: Traditional Chinese (繁體中文)
- Code examples use Kotlin syntax targeting JVM
- Each tutorial file is self-contained but sequentially ordered; maintain the progression when adding content
- New topics should fit the level of the file they belong to (basics → OOP → advanced features)
