# How we do a monthly set of blogs

Reference document — read this at the start of planning each new month's posts. Written for Claude's benefit more than Simeon's; it captures the agreed process so it doesn't have to be re-explained or re-discovered from scratch each month.

## The workflow

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

6. **Simeon schedules the posts into his own CMS himself.** He has a tool that reads posts from a Supabase table (`blog_posts` — content markdown, status, scheduled date, feature image) and separately fires new posts to Buffer/LinkedIn. Claude does not currently have write access to that Supabase project and should not attempt to write to it directly or guess at the publish mechanism — this is a hard boundary, confirmed the hard way in September (see the `feedback_no_unrequested_publishing` memory for this project). Investigating or touching the publish pipeline is fine only when Simeon explicitly asks for it in that moment. Once he's scheduled everything himself, he'll hand back the confirmed dates and slugs; update the tracking file's schedule table with those — that's what unlocks the wrap-up post.

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

Empty so far for this blog specifically — fill in as things get tried.

| Date | What we tried | Result | Keep or drop |
|---|---|---|---|
| | | | |

Known context from Simeon's other projects, for background (not yet tied to a specific blog experiment here): a 3x-week automated LinkedIn posting push on Lenjusu in June 2026 failed hard — traffic dropped 94%, and the few signups that landed took no action — and was killed in July 2026. Worth weighing before proposing similar volume or automation tactics on this blog.
