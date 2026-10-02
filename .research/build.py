#!/usr/bin/env python3
"""Render .research/ into easy-to-read HTML. Run: python3 .research/build.py
- index.html: visual report (new findings + screenshot galleries per flow stage)
- <file>.html: full detail page per research file
"""
import pathlib, re, subprocess, html

DIR = pathlib.Path(__file__).parent
e = html.escape

DETAIL = [
    ("summary", "Summary (text)"),
    ("web-cro-evidence", "Conversion evidence"),
    ("web-competitors", "Competitors"),
    ("web-trust-tone", "Trust & tone"),
    ("web-booking", "Booking (web)"),
    ("mobbin-intake", "Intake · Mobbin"),
    ("refero-intake", "Intake · Refero"),
    ("mobbin-results", "Results · Mobbin"),
    ("refero-results", "Results · Refero"),
    ("mobbin-booking", "Booking · Mobbin"),
    ("refero-booking", "Booking · Refero"),
]

STAGES = [
    ("Questions", "How the best health quizzes ask sensitive things", ["mobbin-intake", "refero-intake"]),
    ("Result", "The moment screening turns into booking", ["mobbin-results", "refero-results"]),
    ("Booking & confirmation", "Picking a time, and making sure people show up", ["mobbin-booking", "refero-booking"]),
]

# New findings — not in the original idea list. (title, image, why it matters, source page)
NEW = [
    ("Play their answers back on the result", "img/mobbin-intake/hers-mirror-back-summary-result.jpg",
     "Hers repeats the person's own answers as a sentence. Feels like being understood, not judged — and lets them fix a wrong answer.", "mobbin-intake"),
    ("Say “may suit you — the doctor decides”", "img/mobbin-results/ro-youve-qualified-whats-next.jpg",
     "Ro: calm verdict + who decides + one button. Honest screening: the doctor decides, not the quiz.", "mobbin-results"),
    ("Show the journey, not a weight promise", "img/refero-results/foodvisor-personalized-program-timeline.jpg",
     "A step timeline (meeting → doctor → start → follow-up) instead of a personal kilo forecast.", "refero-results"),
    ("Short “reviewing your answers” pause", "img/mobbin-results/hers-loading-results-checklist.jpg",
     "2–3 s, three real checks. Makes the result feel earned. Only on the good-news path — before bad news it backfires (Buell & Norton).", "mobbin-results"),
    ("Clinician face + terms at the button", "img/mobbin-results/alan-clinician-profile-free-cancel.jpg",
     "Photo, licence, “20 min · video · 0 kr · cancel anytime” right above the CTA removes the last three objections.", "mobbin-results"),
    ("“Next available” as one tap", "img/mobbin-booking/zocdoc-provider-card-next-available.jpeg",
     "Zocdoc leads with the soonest slot. Sooner meetings also mean fewer no-shows (4.3% vs 7.7%, 1.26M appointments).", "mobbin-booking"),
    ("Sticky button that names the slot", "img/mobbin-booking/futurepro-kickoff-call-coach-photo-sticky-cta.jpeg",
     "“Boka tor kl 10:30” — host photo, purpose line, day strip and slots on one screen.", "mobbin-booking"),
    ("Never a dead-end day", "img/refero-booking/fresha-fully-booked-next-available.jpg",
     "Full day? Jump straight to the next free date instead of an empty screen.", "refero-booking"),
    ("Contact details only after the slot", "img/mobbin-booking/tripadvisor-contact-details-why-we-ask.jpeg",
     "Name, mobile, email — nothing else — with one line on why. Gating the result behind email loses 30–50% (vendor data).", "mobbin-booking"),
    ("Confirmation's job: get them to show up", "img/mobbin-booking/warbyparker-confirmation-intake-calendar.jpeg",
     "Human headline (“Vi ses torsdag!”), add-to-calendar first, SMS reminders. Reminders cut no-shows 21% → 15% (meta-analysis).", "mobbin-booking"),
    ("“An estimate is fine” on weight", "img/mobbin-intake/yazio-weight-okay-to-guess.jpg",
     "Removes the fear of having to step on a scale before answering — a real drop-off point.", "mobbin-intake"),
    ("Safety + time cost before question 1", "img/refero-intake/ada-intro-safety-note.jpg",
     "One quiet card: “2 min · free · read by licensed staff” plus a soft exclusion note.", "refero-intake"),
    ("Conditions only when BMI is 27–29.9", "img/mobbin-intake/hers-conditions-why-it-matters.jpg",
     "Matches the drug label rule (FASS). Everyone else skips the screen. ≤6 options + “Inget av detta”.", "mobbin-intake"),
    ("One empathy moment mid-quiz", "img/refero-intake/seed-feedback-interstitial.jpg",
     "A single “thanks, here's what that means” screen after BMI. More than one becomes padding.", "refero-intake"),
    ("Calm premium visual direction", "img/refero-intake/style-ease-health.jpg",
     "Ease Health: serif headlines, forest green + sage on cream, tinted panels, no shadows. Oura's warm linen as backup.", "refero-intake"),
]

NEW_TEXT = [
    ("Stigma-free language", "“vikt”, “BMI”, never “fet/fetma”. ~75% of Swedes with obesity report bad treatment in healthcare — tone is a differentiator.", "web-trust-tone"),
    ("Nordic model, not US", "Yazen/Kry/Doktor24: short quiz → a person. Noom/Ro/Hims: 55-screen intake → payment. Velora = Nordic: short, ends in a booked time.", "web-competitors"),
    ("Easy, no-wrong-answer first question", "Foot-in-the-door: a small first yes raised agreement to a later big ask 76% vs 17%.", "web-cro-evidence"),
    ("Say who it isn't for", "Top UK/Nordic players list exclusions openly — builds trust and screens correctly.", "web-competitors"),
]

YOURS = [
    ("Fewer steps, merged screens", "Backed: fewer, simpler mobile pages lower quit rates. Ro and Hers both put height + weight on one screen.", "img/mobbin-intake/ro-height-weight-one-screen.jpg"),
    ("% bar, front-loaded", "Backed: fast-early bar 11.3% quit vs 21.8% slow-early (Conrad). Upgrade: call it effort-weighted and put heavy screens early.", None),
    ("Help button", "Upgrade: Oura's “Why we ask” bottom sheet + a one-line reason under each sensitive field.", "img/mobbin-intake/oura-why-we-ask-sheet.jpg"),
    ("Better graphs", "Upgrade: journey timeline instead of a weight curve — promises nothing.", None),
]

CSS = """
:root{--bg:#f6f3ec;--card:#fffdf8;--ink:#1d2722;--mute:#5f6d65;--line:#e4ded2;--accent:#2f5d4a;--soft:#e5ede7;--new:#b4532a;--newsoft:#f6e6dc}
@media (prefers-color-scheme:dark){:root{--bg:#131916;--card:#1b231f;--ink:#e9ede9;--mute:#9ba9a1;--line:#2d3732;--accent:#8fc7a9;--soft:#22302a;--new:#f0a37c;--newsoft:#3a2a21}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif}
nav{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);overflow-x:auto;white-space:nowrap;padding:10px 16px}
nav a{display:inline-block;margin-right:4px;padding:6px 12px;border-radius:999px;color:var(--mute);text-decoration:none;font-size:14px}
nav a.on{background:var(--accent);color:var(--bg)}
main{max-width:1180px;margin:0 auto;padding:28px 16px 80px}
main.narrow{max-width:760px}
h1,h2,h3{font-family:Georgia,"Iowan Old Style",serif;font-weight:600;line-height:1.2;margin:0}
h1{font-size:clamp(30px,5vw,44px);margin:8px 0 10px}
.lead{font-size:18px;color:var(--mute);max-width:62ch;margin:0 0 8px}
section{margin-top:56px}
.sh{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:6px}
.sh h2{font-size:28px}
.sub{color:var(--mute);margin:0 0 20px}
.tag{display:inline-block;font:600 11px/1 -apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:5px 8px;border-radius:6px;background:var(--newsoft);color:var(--new)}
.tag.yours{background:var(--soft);color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.shot{background:var(--soft);height:340px;display:flex;align-items:flex-start;justify-content:center;overflow:hidden;cursor:zoom-in}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top}
.body{padding:14px 16px 16px;display:flex;flex-direction:column;gap:6px;flex:1}
.body h3{font-size:18px}
.app{font-size:12px;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:.05em}
.body p{margin:0;font-size:14.5px;color:var(--mute)}
.body a.more{margin-top:auto;padding-top:6px;font-size:13px;color:var(--accent)}
.textgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.tcard{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--new);border-radius:12px;padding:14px 16px}
.tcard h3{font-size:17px;margin-bottom:4px}
.tcard p{margin:0;font-size:14.5px;color:var(--mute)}
.yours .tcard{border-left-color:var(--accent)}
.row{display:flex;gap:12px;align-items:flex-start}
.row img{width:72px;height:110px;object-fit:cover;object-position:top;border-radius:8px;border:1px solid var(--line);cursor:zoom-in;flex:none}
@media (max-width:560px){.grid{grid-template-columns:1fr 1fr;gap:10px}.shot{height:240px}.body{padding:10px 10px 12px}.body h3{font-size:15px}.body p{font-size:13px}}
a{color:var(--accent);overflow-wrap:anywhere}
#lb{position:fixed;inset:0;background:rgba(10,14,12,.86);display:none;align-items:center;justify-content:center;z-index:20;padding:16px;cursor:zoom-out}
#lb img{max-width:100%;max-height:100%;border-radius:12px}
#lb.on{display:flex}
/* detail pages */
.md h1{font-size:32px}.md h2{font-size:23px;margin:44px 0 10px;padding-top:22px;border-top:1px solid var(--line)}.md h3{font-size:19px;margin:26px 0 8px}
.md p,.md li{max-width:68ch}.md hr{display:none}
.md code{background:var(--soft);padding:1px 6px;border-radius:4px;font-size:.9em}
.md img{display:block;max-width:min(100%,320px);margin:14px 0;border-radius:14px;border:1px solid var(--line);cursor:zoom-in}
.md table{width:100%;border-collapse:collapse;margin:16px 0;font-size:14.5px;display:block;overflow-x:auto}
.md th,.md td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}.md th{background:var(--soft)}
"""

JS = """const lb=document.getElementById('lb'),li=lb.querySelector('img');
document.querySelectorAll('.shot img,.row img,.md img').forEach(i=>i.parentElement.onclick=i.onclick=ev=>{ev.stopPropagation();li.src=i.src;lb.classList.add('on')});
lb.onclick=()=>lb.classList.remove('on');document.onkeydown=k=>k.key==='Escape'&&lb.classList.remove('on')"""


def page(title, active, body, narrow=False):
    tabs = '<a href="index.html"%s>Visual report</a>' % (' class=on' if active == "index" else "")
    tabs += "".join(f'<a href="{s}.html"{" class=on" if s == active else ""}>{e(t)}</a>'
                    for s, t in DETAIL if (DIR / f"{s}.md").exists())
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)}</title><style>{CSS}</style></head>
<body><nav>{tabs}</nav><main class="{'narrow md' if narrow else ''}">{body}</main>
<div id="lb"><img alt=""></div><script>{JS}</script></body></html>"""


OFFTOPIC = re.compile(r"bankid|legal|läkemedelsverket|gdpr|consent|compliance|personnummer|advertis|integritetspolicy", re.I)


def strip_offtopic(t):
    """Drop sentences outside the brief (legal/compliance/BankID)."""
    return " ".join(x for x in re.split(r"(?<=[.!?])\s+", t) if not OFFTOPIC.search(x))


def patterns(slug):
    """Extract numbered pattern sections: title, app, image, velora text."""
    text = (DIR / f"{slug}.md").read_text()
    out = []
    for m in re.finditer(r"^#{2,3} \d+\. (.+?)\n(.*?)(?=^#{2,3} |\Z)", text, re.S | re.M):
        title, sec = m.group(1).strip(), m.group(2)
        img = re.search(r"(img/[\w./-]+\.(?:jpe?g|png|webp))", sec)
        app = re.search(r"\(([^()]+)\)\s*$", title) or re.search(r"\*\*App:\*\*\s*(.+)", sec)
        vel = re.search(r"\*\*Velora:\*\*\s*(.+?)(?=\n\s*\n|\n- |\n!\[|\Z)", sec, re.S)
        if not img or not (DIR / img.group(1)).exists():
            continue
        out.append(dict(
            title=re.sub(r"\s*\([^()]+\)\s*$", "", title),
            app=app.group(1).strip() if app else "",
            img=img.group(1),
            velora=strip_offtopic(re.sub(r"\s+", " ", re.sub(r"[*`]", "", vel.group(1))).strip()) if vel else "",
            slug=slug))
    return out


# ---------- index.html ----------
n_imgs = len(list((DIR / "img").rglob("*.*")))
b = [f"""<h1>Velora quiz research</h1>
<p class="lead">10 research agents, {n_imgs} screenshots from Mobbin and Refero, plus web evidence. Start with what's <b>new</b> — ideas that weren't on our list. Tap any screenshot to enlarge.</p>"""]

b.append('<section><div class="sh"><h2>New ideas</h2><span class="tag">not on our list</span></div>'
         '<p class="sub">Each one with a real example.</p><div class="grid">')
for t, img, why, src in NEW:
    b.append(f'<div class="card"><div class="shot"><img loading="lazy" src="{img}" alt="{e(t)}"></div>'
             f'<div class="body"><h3>{e(t)}</h3><p>{e(why)}</p><a class="more" href="{src}.html">Details →</a></div></div>')
b.append('</div><div class="textgrid" style="margin-top:18px">')
for t, why, src in NEW_TEXT:
    b.append(f'<div class="tcard"><h3>{e(t)}</h3><p>{e(why)}</p><p><a href="{src}.html">Source →</a></p></div>')
b.append("</div></section>")

b.append('<section class="yours"><div class="sh"><h2>Our ideas, checked</h2><span class="tag yours">from our list</span></div>'
         '<p class="sub">What the research says about the ideas we started with.</p><div class="textgrid">')
for t, why, img in YOURS:
    pic = f'<img src="{img}" alt="">' if img else ""
    b.append(f'<div class="tcard"><div class="row">{pic}<div><h3>{e(t)}</h3><p>{e(why)}</p></div></div></div>')
b.append("</div></section>")

for name, sub, slugs in STAGES:
    cards = [p for s in slugs if (DIR / f"{s}.md").exists() for p in patterns(s)]
    b.append(f'<section><div class="sh"><h2>{e(name)}</h2><span class="sub" style="margin:0">{len(cards)} examples</span></div>'
             f'<p class="sub">{e(sub)}</p><div class="grid">')
    for p in cards:
        b.append(f'<div class="card"><div class="shot"><img loading="lazy" src="{p["img"]}" alt="{e(p["title"])}"></div>'
                 f'<div class="body"><span class="app">{e(p["app"])}</span><h3>{e(p["title"])}</h3>'
                 f'<p><b>For Velora:</b> {e(p["velora"])}</p><a class="more" href="{p["slug"]}.html">Details →</a></div></div>')
    b.append("</div></section>")

styles = [i for i in ["img/refero-intake/style-ease-health.jpg", "img/refero-intake/style-oura.jpg"] if (DIR / i).exists()]
if styles:
    b.append('<section><div class="sh"><h2>Visual direction</h2></div><p class="sub">Ease Health for the quiz (calm, clinical, serif). Oura for warmth on result and confirmation.</p><div class="grid">')
    for i, cap in zip(styles, ["Ease Health — forest green, sage, cream, serif", "Oura — linen, sand, italic serif accent"]):
        b.append(f'<div class="card"><div class="shot"><img src="{i}" alt=""></div><div class="body"><h3>{e(cap)}</h3></div></div>')
    b.append("</div></section>")

(DIR / "index.html").write_text(page("Velora quiz research", "index", "".join(b)))
print("wrote index.html")

# ---------- detail pages ----------
for slug, title in DETAIL:
    src = DIR / f"{slug}.md"
    if not src.exists():
        continue
    md = re.sub(r"^- Image: `(img/[^`]+)`", r"![](\1)", src.read_text(), flags=re.M)
    body = subprocess.run(["npx", "-y", "marked", "--gfm"], input=md, capture_output=True, text=True, check=True).stdout
    body = re.sub(r"<code>([\w-]+)\.md</code>", r'<a href="\1.html"><code>\1</code></a>', body)
    (DIR / f"{slug}.html").write_text(page(f"{title} · Velora research", slug, body, narrow=True))
    print("wrote", f"{slug}.html")
