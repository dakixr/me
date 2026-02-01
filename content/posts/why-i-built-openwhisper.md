---
title: "Why I Built OpenWhisper: Frustrated with OpenAI's Pricing Model"
date: "2026-02-02"
description: "How OpenAI's Whisper flow pricing and limited free tier led me to build my own macOS transcription app that costs a fraction of the price."
tags: ["macOS", "OpenAI", "Whisper", "Swift", "Side Projects", "Pricing"]
---

Last week, I needed a reliable way to transcribe audio on my Mac. I found [WisprFlow](https://wisprflow.ai/)—a wrapper around OpenAI's Whisper API. But when I saw the pricing, I got pissed.

## The Problem: Expensive Wrapper for a Simple API

WisprFlow is a neat service, but it's essentially a **paid wrapper around OpenAI's Whisper API** with markup:

- **WisprFlow pricing:** Premium subscription or expensive per-minute rates
- **What it actually does:** Calls OpenAI's Whisper API ($0.006/min) and adds a margin
- **Free tier limitations:** Minimal usage before hitting paywalls

For a simple use case—transcribing voice notes, meetings, or random audio clips—paying for a middleman felt wrong. I don't need a fancy flow service. I just want to press a key, talk, and get text.

## The Solution: Build It Myself

So I did what any reasonable engineer would do: I built a native macOS app that calls OpenAI's Whisper API directly, skipping the expensive middleman.

### Enter OpenWhisper

**OpenWhisper** is a hold-to-talk transcription app for macOS:

- **Press Fn** → talk → **release Fn** → text appears in your active app
- **Native menubar app** with live waveform visualization
- **Tracks usage + cost** so you know what you're spending
- **Pure Swift**, no Electron, no bloat
- **Uses OpenAI Whisper API directly** (no wrappers, no markup)

### What's Different

Unlike WisprFlow's premium pricing, OpenWhisper:

- ✅ **Uses OpenAI's Whisper API directly** at $0.006/min (no markup)
- ✅ **No subscription fees**—pay only for what you use
- ✅ **Transparent costs**—you see exactly what you're spending
- ✅ **Runs locally** on your Mac with a native menubar app
- ✅ **Open source**—you can see exactly what it does

## The Economics

Here's the math that made me build this:

- **WisprFlow:** Premium subscription or expensive per-minute rates with markup
- **OpenAI Whisper API (direct):** $0.006/minute—no markup, no middleman
- **OpenWhisper:** Direct API calls, full cost transparency, you control the key

I'm not against paying for good tools. I'm against **paying for a wrapper that marks up a perfectly good API**.

## What I Learned

Building OpenWhisper taught me a few things:

1. **macOS accessibility APIs** are powerful (detecting Fn key globally)
2. **Audio recording** on macOS is simpler than I thought
3. **Keychain integration** for secure API key storage is a must
4. **Hold-to-talk UX** is surprisingly intuitive

## Try It Out

If you're tired of overpriced wrappers around simple APIs, check out [OpenWhisper on GitHub](https://github.com/dakixr/open-whisper).

It's free, open source, and does one thing well: **transcribe audio using OpenAI's Whisper API directly**—no middleman, no markup.

Sometimes the best tool is the one you build yourself.

---

*Have you ever built something just because the existing options were too expensive or over-engineered? I'd love to hear your stories.*
