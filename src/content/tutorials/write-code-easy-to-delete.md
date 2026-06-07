---
title: "Write Code That's Easy to Delete, Not Easy to Extend"
description: "A language-agnostic principle that keeps codebases healthy: optimize for deletion. Why coupling is the real enemy, and how to structure code so changing your mind stays cheap."
pubDate: 2026-06-04
category: "Programming"
topic: "Principles"
tags: ["Principles", "Architecture", "Maintainability"]
draft: false
---

The most underrated property of good code isn't how easy it is to *extend* — it's how
easy it is to *delete*. Requirements change. The code you can throw away without fear is
the code that lets a project keep moving.

## Coupling is what makes deletion hard

When you delete a function, anything depending on it breaks. The more code depends on a
piece, the more expensive it is to remove or change. So the real cost isn't lines of
code — it's **how many things know about each other**.

```text
Low coupling:   [A]   [B]   [C]      delete C → nothing else breaks
High coupling:  [A]──[B]──[C]──[A]   delete C → cascade of breakage
```

## Practical moves that keep code deletable

### 1. Prefer boring duplication over the wrong abstraction

A premature abstraction couples unrelated call sites. If two pieces of code look similar
but change for *different reasons*, leave them apart. Wait until the shared shape is
obvious before extracting it.

> A little copying is far cheaper than a little wrong coupling.

### 2. Push dependencies to the edges

Keep your core logic free of frameworks, databases, and UI. When the network library or
the UI toolkit changes, you delete and replace a thin edge — not your whole core.

### 3. Hide decisions behind small interfaces

Wrap a volatile dependency (a payment SDK, an analytics vendor) behind an interface you
own. Swapping vendors becomes deleting one implementation, not a global find-and-replace.

```text
UI ─▶ PaymentGateway (your interface) ─▶ StripeAdapter
                                          ⌊ delete & replace freely
```

### 4. Make layers one-directional

If A depends on B, B must not depend on A. One-way dependencies mean you can always
delete the *outer* layer without touching the inner one.

## The test: "how hard is this to remove?"

Before adding a feature, ask: *if this turns out to be wrong, how painful is it to rip
out?* If the answer is "very," you've coupled too tightly. Push the dependency outward,
narrow the interface, and keep the blast radius small.

Code that's easy to delete is code that's easy to change — and easy to change is the
only durable definition of "maintainable."
