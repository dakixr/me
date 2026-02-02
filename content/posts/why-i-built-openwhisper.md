---
title: "Why I Built OpenWhisper: Raw Speech-to-Text for Coding"
date: "2026-02-02"
description: "I wanted raw speech-to-text for AI coding context, not a polished dictation service. So I built a native macOS app."
tags: ["macOS", "OpenAI", "Whisper", "Swift", "Coding", "Developer Tools"]
---

I use coding assistants like Codex, OpenCode, and Claude Code daily. Sometimes explaining context out loud is faster than typing it. I looked at [WisprFlow](https://wisprflow.ai/) for this, but it didn't fit my use case.

## The Problem

WisprFlow is a polished dictation service — and that's the problem:

- **What WisprFlow does:** Multi-layer processing (ASR + LLM cleanup/editing via Llama on Baseten + other providers)
- **What I need:** Raw speech-to-text, injected directly into my editor
- **The mismatch:** I'm feeding text to an AI coding assistant anyway — I don't need WisprFlow's cleanup layer

WisprFlow's value is in *polished output*. My use case is *raw context for another AI*. Their subscription model makes sense for general dictation, not for my workflow.

I just want to press a key, explain my code context verbally, and get text. I don't need a service layer I'll immediately bypass.

## The Solution

**OpenWhisper** = native macOS app that calls OpenAI Whisper API directly.

- **Hold Fn** → talk → **release Fn** → text inserted into your active app
- Native menubar with live waveform
- Tracks usage + cost transparently
- Pure Swift, no bloat

## Why It Matters for Coding

When working with AI coding assistants, **context is king**. Sometimes explaining architecture out loud is faster than writing it:

- "Add a cache layer with Redis using this key pattern..."
- "Refactor this function to use async/await with error handling..."
- "Generate unit tests for these edge cases..."

Talking beats typing for complex context.

## The Economics

- **WisprFlow:** Subscription pricing for a full service stack (ASR + cleanup + infrastructure)
- **OpenAI Whisper API (direct):** $0.006/minute, raw output
- **OpenWhisper:** Direct API calls, you control the key, pay only what you use

I'll pay for good tools. I won't pay for a service layer I don't need.

## Try It

[OpenWhisper on GitHub](https://github.com/dakixr/open-whisper) — free, open source, does one thing well.

Sometimes the best tool is the one you build yourself.
