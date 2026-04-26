# Rozgar.ai — روزگار
### Making skills visible. Making opportunity real.
**MIT Global Hackathon — World Bank UNMAPPED Challenge**

🌐 **Live App:** [rozgar-ai.lovable.app](https://rozgar-ai.lovable.app)
💻 **Repo:** [github.com/maryamfarhan/rozgar-pathways](https://github.com/maryamfarhan/rozgar-pathways)

---

## The Problem

600 million young people in low- and middle-income countries have real skills the formal economy cannot see.

Meet Zara. She is 21, lives in Karachi, and has been doing content creation for local businesses for two years — growing Instagram pages, editing reels on her phone, running WhatsApp marketing campaigns. She taught herself CapCut, Canva, and basic SEO from YouTube. She speaks three languages.

By any reasonable measure, Zara has skills.

But no employer knows she exists. No training program has assessed what she already knows. No labor market system has a record of her.

**To the formal economy, Zara is unmapped. She is not the exception — she is the rule.**

---

## Three Structural Failures

| Failure | What it means |
|---|---|
| Broken signals | Education credentials don't translate into labor market signals. Informal skills are invisible. |
| AI disruption without readiness | Automation is arriving unevenly. Youth have no tools to understand or navigate this. |
| No matching infrastructure | Even where skills and jobs exist in the same place, the connective tissue is absent. |

---

## What Rozgar.ai Does

Rozgar.ai is an open infrastructure layer — not just an app — that closes the distance between a young person's real skills and real economic opportunity.

Any government, NGO, training provider, or employer can plug into it and configure it with local data. No rebuilding from scratch. **Think protocol, not product.**

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    USER INPUT                        │
│         Skills · Experience · Languages              │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │   pk.json / ng.json     │  ← All local assumptions
          │   Country config file   │    live here, not in code
          └────────────┬────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           01 — Skills Signal Engine                  │
│   Maps informal experience → ESCO/ISCO taxonomy      │
│   Output: portable, human-readable skills profile    │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           02 — AI Readiness Lens                     │
│   Automation risk assessment (Frey-Osborne)          │
│   Calibrated for local economy, not global average   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           03 — Opportunity Matcher                   │
│   Real econometric signals: ILO + World Bank         │
│   Realistic income paths in local currency           │
│   Dual view: youth user + policymaker dashboard      │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              OUTPUT                                  │
│   Portable skills profile · Automation risk score    │
│   Matched opportunities · 12-month pathway           │
└─────────────────────────────────────────────────────┘
```

**Adding a new country = adding one JSON file. Zero code changes.**

---

## Why This Is Infrastructure, Not Just An App

| LinkedIn | Rozgar.ai |
|---|---|
| Requires formal credentials | Works from informal experience |
| Platform you log into | Infrastructure others plug into |
| Assumes formal economy | Built for 72%+ informal economies |
| Hides automation risk | Shows it honestly, calibrated locally |
| English only | Language is a config, not an assumption |
| Hardcoded for one market | Any country = one JSON file |

---

## How The Country-Agnostic System Works

All local assumptions live in a single JSON config file — never in the code.

```
config/
├── pk.json    # Pakistan — South Asia, urban informal economy
└── ng.json    # Nigeria — Sub-Saharan Africa, urban informal economy
```

Each config contains:
- Labor market data (wages, sector growth, unemployment rates)
- Education taxonomy and credential mapping (Matric → ISCED Level 2)
- Automation calibration adjusted for local infrastructure
- Opportunity types (formal employment, gig, government schemes)
- Wittgenstein Centre education projections to 2035

---

## Project Structure

```
rozgar/
├── config/
│   ├── pk.json                  # Pakistan config
│   └── ng.json                  # Nigeria config
├── modules/
│   ├── skills_engine.py         # Module 01: Skills Signal Engine
│   ├── readiness_lens.py        # Module 02: AI Readiness Lens
│   └── opportunity_matcher.py   # Module 03: Opportunity Matcher
├── utils/
│   └── config_loader.py         # Country-agnostic config loader
├── main.py                      # Full pipeline entry point
└── requirements.txt
```

---

## Data Sources

All econometric signals are real, not synthetic.

| Source | Used For |
|---|---|
| ILO ILOSTAT | Wage data, employment by sector, labor force participation |
| World Bank WDI | Development indicators, education, poverty |
| Frey & Osborne (2013) | Automation probability scores by occupation |
| ILO Task Indices | Routine vs non-routine task content by occupation |
| ESCO Taxonomy | Multilingual skills and occupation taxonomy (EU/ILO) |
| O*NET (US DOL) | Occupation task content, adapted for LMIC contexts |
| Wittgenstein Centre | Education level projections by country to 2035 |
| World Bank STEP | Skills measurement data from LMIC contexts |
| UNESCO UIS | Enrollment rates and completion rates by country |

---

## Demo Profile — Zara Ahmed

The app comes pre-loaded with Zara's profile for demo purposes:

- **Name:** Zara Ahmed, 21, Karachi
- **Education:** Matric (ISCED Level 2)
- **Work history:** Content creation for local businesses for 2 years. Edits reels, runs Instagram and WhatsApp marketing for a clothing boutique in Tariq Road. Grew their followers from 400 to 4,000.
- **Self-taught:** CapCut, Canva, basic SEO and hashtag strategy from YouTube
- **Languages:** Urdu, Sindhi, English

Zara represents the hundreds of millions of young people whose real skills are invisible to the formal economy. She is not the exception — she is the rule.

---

## Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Run demo for Pakistan
python main.py --demo --country PK

# Run demo for Nigeria — proves country-agnostic design
python main.py --demo --country NG

# Interactive mode — enter your own profile
python main.py --country PK
```

---

## Live Demo

**App:** [rozgar-ai.lovable.app](https://rozgar-ai.lovable.app)

**Organization Portal demo login:**
- Email: `demo@rozgar.ai`
- Password: `demo123`

---

## Built By

Built for the MIT Global Hackathon 2025 — World Bank UNMAPPED Challenge.

*We built Rozgar.ai because we are the people this is for.*

---

## License

Open source. Fork it, configure it for your country, deploy it.
