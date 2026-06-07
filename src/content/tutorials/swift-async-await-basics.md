---
title: "Swift Concurrency: async/await Without the Confusion"
description: "A clear, example-first introduction to async/await in Swift — how to call async functions, run work in parallel, and avoid the common pitfalls."
pubDate: 2026-06-05
category: "Mobile"
topic: "iOS"
subtopic: "Concurrency"
tags: ["Swift", "Concurrency", "iOS", "async-await"]
draft: false
---

Swift's `async`/`await` replaced a tangle of completion handlers with code that reads
top to bottom. This guide gets you productive with the essentials.

## Calling an async function

Mark a function `async` and `await` its result. The `await` is a *suspension point* —
your function pauses there without blocking the thread:

```swift
func fetchUser(id: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: userURL(id))
    return try JSONDecoder().decode(User.self, from: data)
}
```

Calling it from a non-async context (like a SwiftUI view) uses a `Task`:

```swift
Task {
    do {
        let user = try await fetchUser(id: "42")
        print(user.name)
    } catch {
        print("Failed:", error)
    }
}
```

## Running work in parallel with async let

Sequential `await`s wait for each other. When two calls are independent, start them
together with `async let` and they run concurrently:

```swift
async let profile = fetchProfile(id)
async let posts = fetchPosts(id)

// Both requests are already in flight; we await them only when we need the values.
let screen = ProfileScreen(profile: try await profile, posts: try await posts)
```

This is often a 2x speedup for free compared to awaiting one after the other.

## The three pitfalls to avoid

1. **Don't block the main actor.** Heavy CPU work inside a `@MainActor` context freezes
   the UI. Move it off with a detached task or a background actor.
2. **Don't forget cancellation.** When a `Task` is cancelled, `await` points throw
   `CancellationError`. Check `Task.isCancelled` in long loops.
3. **Don't capture `self` strongly forever.** In a long-lived `Task` inside a view model,
   use `[weak self]` to avoid retain cycles.

## When to reach for actors

If multiple tasks touch the same mutable state, wrap it in an `actor` — it serializes
access so you get data-race safety without manual locks:

```swift
actor ImageCache {
    private var store: [URL: UIImage] = [:]
    func image(for url: URL) -> UIImage? { store[url] }
    func insert(_ image: UIImage, for url: URL) { store[url] = image }
}
```

Start with `async`/`await`, add `async let` for parallelism, and reach for `actor`
only when shared mutable state appears. That covers the vast majority of real code.
