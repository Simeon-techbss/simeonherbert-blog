# How we do a monthly set of blogs

Reference document — read this at the start of planning each new month's posts. Written for Claude's benefit more than Simeon's; it captures the agreed process so it doesn't have to be re-explained or re-discovered from scratch each month.

## The workflow

0. **Before agreeing anything: pull the last month's real Buffer performance.** Ask Simeon for the latest `buffer-insights-*.md` export (or check via the `buffer` MCP if it's ever granted the `insights:read` scope) and actually look at what landed and what didn't — reactions, comments, impressions, per post — before proposing a theme or topics. This step got skipped going into September, and the whole month's series (a structured coaching-topic format) went out without anyone checking it against the one clear signal already sitting in the data: personal, first-person "this happened to me" posts (e.g. the 24 Jul job-market post, 23 reactions/3,865 impressions) heavily outperform the structured monthly series, which had already been declining for weeks before September started. Don't let that happen again — this step is not optional, and it's not the same as fixing voice/tone later. Editing sentences after the fact doesn't recover a month spent on the wrong format.

1. **Agree the theme.** Talk it through with Simeon first. Recent themes: July = where to look first, August = don't do transformation theatre, September = the small things that actually move a team. Themes build on each other month to month — check what the last 2–3 months covered before proposing a new one, so it connects rather than repeats.

2. **Suggest topics — and write them down immediately.** Simeon has been burned before by ideas discussed only in chat and lost when the session ended. The moment topics are agreed, they go into that month's working file (see "Where things live" below), even in skeleton form. Never let a topic idea exist only in scrollback.

3. **Simeon writes the first pass of each post himself.** He dictates or transcribes his own version of a post — this is not optional or a nice-to-have. He finds it genuinely hard to adapt something Claude originated from a blank page. Wait for his version, even if it's rough, spoken-word, or just a paragraph of loose thoughts.

4. **Claude modifies and they iterate together.** Once Simeon's rough version exists, tighten it, match voice (see "Writing philosophy" below), and go back and forth. This is where Claude's actual writing work happens — editing and shaping what he gave you, not originating it.

   Exception: if Simeon explicitly asks Claude to draft something from scratch (a topic he hasn't personally gotten to, or "finish these off for me"), that's fine to do — but it's the exception, not the default, and it's worth treating the result as a first draft that still needs his voice pass, not a finished post.

5. **Maintain one living tracking file per month**, stored in this repo under `content-planning/`, not on the Desktop and not only as a Claude Artifact. It should track:
   - the theme and month
   - every topic considered, including dropped ones and why they were dropped
   - the confirmed running order
   - each post's status (not started / drafted / needs review / approved)
   - excerpt and full content for each post, each with its own one-click copy button so pasting into the CMS never mangles paragraph breaks (see "Copy button mechanism" below)
   - a reference table for the confirmed publish schedule (dates + slugs) once step 6 happens

   Publish this file as a Claude Artifact too, so Simeon can read and comment on it comfortably — he's dyslexic, and a wall of raw markdown in the terminal is genuinely hard for him to review. But **the git-tracked file in this repo is the source of truth**, not the Artifact's hosted copy. Redeploy the Artifact to the same URL after every edit (pass `url:` pointing at the existing artifact) so his link never breaks and never turns into a second, divergent copy.

6. **Simeon schedules the posts into his own CMS himself.** It's a Lovable-built admin tool ("New Post" screen) backed by the `blog_posts` Supabase table, with a separate integration to Buffer for LinkedIn. The screen's fields: Title, Slug, Author (defaults to Simeon Herbert), Excerpt, Content (Markdown, has its own Copy button — same idea as ours), Status (Draft/etc.), Scheduled Date, Feature Image upload. Actions: Save, Publish Now, Schedule via Buffer, and a pinned "Buffer at [time]" option. He currently does this by hand: copy title, excerpt, content from our tracking file, paste into the form, pick the date, hit schedule — once per post.

   Claude does not currently have write access to that Supabase project and should not attempt to write to it directly or guess at the publish mechanism — this is a hard boundary, confirmed the hard way in September (see the `feedback_no_unrequested_publishing` memory for this project). Investigating or touching the publish pipeline is fine only when Simeon explicitly asks for it in that moment.

   **Future improvement — agreed in principle, not yet active.** Simeon wants Claude to eventually take over this "mundane posting job" — writing the `blog_posts` row (title, slug, author, excerpt, content, feature image, scheduled date) and scheduling the Buffer/LinkedIn post, using the `buffer` MCP server already connected in this environment, instead of him copy-pasting per post. His conditions, stated explicitly at the end of September's cycle: (1) not this month — September was still done by hand; (2) it only happens once he's approved this workflow doc; (3) he still needs both destinations covered — his own blog *and* Buffer — so whatever Claude ends up doing has to do both, matching what the CMS's "Schedule via Buffer" button currently does in one step. Do not assume Supabase access has been granted or attempt to post anything until Simeon explicitly confirms both the doc is approved and access is set up.

   Once posts are scheduled (by hand or, eventually, directly), Simeon has a "round-up" button that spits back the confirmed date/slug feed for the whole month; update the tracking file's schedule table with that — it's what unlocks the wrap-up post.

## The wrap-up post

Every month ends with one extra post that isn't in the original topic list: a round-up linking back to every post published that month, in order, with a one-line takeaway per link, plus a short call to action (Simeon's September framing: "pick one, try it, tell me what changed"). It can only be written once real slugs and dates exist for every post that month — don't draft it until step 6 is done. Check Simeon's second brain (search "this month I") for prior examples of the tone before writing a new one — it has an established shape.

## Post length

September's set was eight short posts (roughly 5–7 short paragraphs each) plus a wrap-up. Short is the default, but not a rule. If a topic genuinely needs more room, say so and write it longer rather than forcing it into the short template — ask if it's unclear whether a topic wants the longer treatment.

## Writing philosophy — what makes a post actually work

This is the thing that got lost partway through September and needs holding onto every month: **the point isn't to produce N posts, it's to produce N posts someone would actually stop scrolling for.**

- Voice reference is `/Users/simeonherbert/.claude/SimeonsVoice.md` — read it fresh every time, don't rely on memory of it.
- Every post should pass the "was this actually said in a client room" test. If a sentence sounds like it came from a training deck rather than a real conversation, make it specific and concrete, or cut it.
- Hook first line — a scene, a quote, a piece of dialogue. Never open with a general statement.
- Problem before solution, always. Name what's broken before offering the fix.
- One idea per post. Resist folding two related ideas into one post just because they're adjacent — better to split into two sharp posts than blur one (this is exactly the mistake that got a topic dropped in September before it got revived later as something genuinely distinct).
- End on a real question — not a rhetorical throwaway, one Simeon would actually want an answer to in the comments.
- No frameworks, no consultant-speak, no bullet-pointed advice inside the post body itself. The wrap-up's link list is the one standing exception — it's a different, list-shaped kind of post by design.

## Copy button mechanism (technical note)

Selecting and copying text out of a rendered HTML page does not reliably preserve blank lines between differently-styled block elements. This caused a real bug in September: the last body paragraph and the closing question ran together with no line break once pasted into the CMS ("...closer to done?Next stand-up..."). Fix: every post in the tracking artifact gets its exact plain-text content stored in a `<script type="application/json">` block, with a "Copy" button that reads it and calls `navigator.clipboard.writeText()` directly (with an `execCommand('copy')` fallback for older browsers). That guarantees the pasted text matches the source markdown exactly, paragraph breaks included, regardless of how the browser handles copying styled HTML. Reuse this pattern for every future month's tracking file — don't fall back to manual select-and-copy.

## Driving traffic and engagement — experiment log

**Prerequisite, not yet done: the blog has no analytics at all** (checked `app/` and `lib/` — no Vercel Analytics, Plausible, GA, anything). Without it, the "Result" column below can't be filled in honestly. Add basic analytics before running any experiment that needs a before/after comparison — Vercel Analytics is the obvious first choice since the site's already deployed there (one import + one component, free tier, no cookie banner needed). Flag this to Simeon rather than assuming it's sorted.

Known context from Simeon's other projects, for background: a 3x-week automated LinkedIn posting push on Lenjusu in June 2026 failed hard — traffic dropped 94%, and the few signups that landed took no action — and was killed in July 2026. And a paid LinkedIn engagement service (linkedia.org — fake followers/reactions/comments) was considered and rejected in August 2026: against LinkedIn's platform-manipulation policy, and buys a number that doesn't read the blog or hire Simeon. Both point the same way: volume and fake signals aren't the lever here.

**Legitimate options worth testing, one at a time, not yet tried:**

- ~~Native LinkedIn posts, not link-shares.~~ **Considered and set aside, 4 Sep 2026.** The theory was that the "Originally published on my blog" link in the post body suppresses reach. Simeon's call after seeing the full picture: the link has been in every post for 2+ months, including the two best-performing posts of the period, so it isn't the mechanic that's failing — the content itself isn't resonating. Don't re-raise link placement as the lead theory; see the content-resonance note below instead.
- **Reply to every comment, fast.** Early engagement (first 60–90 minutes) is what LinkedIn's algorithm weights most for further reach. Simeon replying personally to comments in that window matters more than posting volume.
- **Comment on other people's posts in the same niche**, not just publish his own — a known organic-reach lever, and lower effort than writing new content. The `network-reach` skill already exists for drafting outreach; a similar habit for thoughtful comments on other agile/delivery voices' posts could be worth trying.
- **A/B the posting time.** The CMS already has a pinned "Buffer at 10am" slot — try a second time slot (e.g. lunchtime or early evening, when people scroll on the way home) for a few posts and compare.
- **Internal linking between posts.** The wrap-up post already links back to the month's posts — consider also linking sideways between related posts as they're published (e.g. "Smelly tickets" linking to "Management by apathy" mid-post), which helps both readers and search.

| Date | What we tried | Result | Keep or drop |
|---|---|---|---|
| 1–3 Sep 2026 | Baseline (no experiment yet) — posts 1 and 2 of September, both with the "Originally published on my blog" link inline in the post body | ~95-100 impressions each, 0 reactions, 0 comments on both. Total impressions/reach down ~32% vs prior week. Profile views spiked on both post days (78 and 108, vs 7-18 baseline) — posts are getting seen and driving profile clicks, just no visible reactions. Source: Buffer insights export, `buffer-insights-2026-08-29_to_2026-09-04.md` | Baseline |
| 4 Sep 2026 | Reviewed full July–Sep Buffer history to decide next move | Confirmed the September "small things" series has been declining for 6+ weeks, well before September started. The two standout posts of the period (24 Jul job-market frustration: 23 reactions/3,865 impressions; 7 Aug Claude Code course story: 13 reactions/1,249 impressions) were both personal, first-person, timely — nothing like them exists in the September series. Simeon's read: "I don't think it's the problem [the link] — I think the content is not calling to people." | Drop the link-removal test; treat content resonance (personal/timely vs structured-series) as the live hypothesis instead |

Note on getting real numbers: the Buffer MCP connection here doesn't have the `insights:read` scope, so Claude can't pull metrics directly — Simeon downloads the insights export from Buffer himself (markdown file, e.g. `~/Downloads/buffer-insights-<range>.md`) and shares it when checking how a post did.

**Decision, 4 Sep 2026: run one more week of the series unchanged (posts 3 and 4, 8 and 10 Sep, no edits), then check the numbers again.** No time to rewrite this week. If posts 3–4 show the same pattern (near-zero reactions/comments), that's confirmation to actually act on the content-resonance finding rather than a rewrite for its own sake — bring it up again once that week's Buffer export is in, don't wait for Simeon to raise it.
