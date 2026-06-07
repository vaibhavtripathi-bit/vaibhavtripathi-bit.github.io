---
title: "Debugging ANRs in Android: A Practical Field Guide"
description: "How to find, reproduce, and fix Application Not Responding errors in production Android apps — main-thread blocking, lock contention, and the tools that actually help."
pubDate: 2026-06-06
category: "Mobile"
topic: "Android"
subtopic: "Performance"
tags: ["Android", "Performance", "Coroutines", "Debugging"]
draft: false
---

An **ANR** (Application Not Responding) fires when your app's main thread is blocked
for too long — 5 seconds for input events, or shorter windows for `BroadcastReceiver`
and service callbacks. To users it looks like a freeze; to Google Play it shows up as
a top-tier vitals problem that can suppress your store ranking.

This guide walks through how I approach ANRs on production platforms.

## What actually causes an ANR

Almost every ANR comes down to one of these:

- **Main-thread I/O** — reading a file, hitting a database, or doing network work on the UI thread.
- **Lock contention** — the main thread waits on a lock another thread is holding.
- **Slow `BroadcastReceiver.onReceive()`** — it runs on the main thread and must finish fast.
- **Binder/IPC stalls** — a synchronous call into another process that doesn't return quickly.

## Reproduce it before you fix it

A fix you can't verify is a guess. Enable **StrictMode** in debug builds to surface
main-thread violations the moment they happen:

```kotlin
if (BuildConfig.DEBUG) {
    StrictMode.setThreadPolicy(
        StrictMode.ThreadPolicy.Builder()
            .detectDiskReads()
            .detectDiskWrites()
            .detectNetwork()
            .penaltyLog()
            .build()
    )
}
```

Now any disk or network access on the main thread shows up in Logcat with a full stack trace.

## Move blocking work off the main thread

The most common fix is also the simplest: get the work onto a background dispatcher.
With coroutines, `withContext(Dispatchers.IO)` is your friend:

```kotlin
suspend fun loadProfile(id: String): Profile = withContext(Dispatchers.IO) {
    // Safe: this runs on a background thread, never blocking the UI.
    database.profileDao().getById(id)
}
```

> Rule of thumb: the main thread should only ever *orchestrate* work and *render* results —
> never *perform* slow work itself.

## Read the ANR trace like a map

When an ANR is captured, Android writes a trace to `/data/anr/traces.txt` (also available
via Play Console → Android vitals). Find the thread named `"main"` and read its stack:

1. The **top frame** is where the main thread was stuck.
2. If it shows `Object.wait` or `park`, you have **lock contention** — find which thread holds the lock.
3. If it shows file or network calls, you have **main-thread I/O** — move it off with the pattern above.

## A checklist for production

- [ ] StrictMode enabled in debug builds
- [ ] All database and network calls on `Dispatchers.IO`
- [ ] `BroadcastReceiver.onReceive()` does nothing slow — hand off to `WorkManager`
- [ ] Locks held for the minimum possible time
- [ ] ANR rate tracked in Play Console vitals after every release

Fix the cause, verify with StrictMode and vitals, and your freeze reports should fall steadily.

---

*Have a topic you'd like covered? [Reach out](mailto:vaibhav.tripathime@gmail.com).*
