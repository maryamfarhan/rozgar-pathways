# Rozgar.ai — روزگار
### Making skills visible. Making opportunity real.

**MIT Global Hackathon — World Bank UNMAPPED Challenge**

---

## The Problem

600 million young people in low- and middle-income countries have real skills the formal economy cannot see.

Meet Zara. She is 20, lives in Karachi, and has been repairing phones since she was 16. She speaks three languages, manages her own inventory, and has been teaching herself Python on a shared mobile connection. By any reasonable measure, she has skills.

But no employer knows she exists. No training program has assessed what she already knows. No labor market system has a record of her.

To the formal economy, Zara is unmapped.

She is not the exception. She is the rule.

---

## What Rozgar.ai Does

Rozgar.ai is an open infrastructure layer — not just an app — that closes the distance between a young person's real skills and real economic opportunity.

Any government, NGO, training provider, or employer can plug into it and configure it with local data. No rebuilding from scratch. Think protocol, not product.

### Three Modules

**01 — Skills Signal Engine**
Takes a user's raw, informal inputs — work history, self-taught skills, languages — and maps them to a structured, portable skills profile grounded in ESCO/ISCO taxonomies. The profile is human-readable. Zara can understand and own it.

**02 — AI Readiness & Displacement Risk Lens**
Assesses which of a user's skills are at automation risk and which are durable — calibrated to their local economy, not Silicon Valley assumptions. Automation risk in Karachi looks different than in Kuala Lumpur. Uses Frey-Osborne as a baseline, adjusted for local infrastructure gaps and labor costs.

**03 — Opportunity Matching & Econometric Dashboard**
Connects a user's skills profile to realistic, reachable opportunities — not aspirational ones. Surfaces real econometric signals (ILO wage data, sector growth rates, World Bank WDI) visibly to the user. Dual interface: one for the youth user, one for a policymaker or program officer.

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
- Education taxonomy and credential mapping
- Automation calibration adjusted for local infrastructure
- Opportunity types (formal, gig, government schemes)
- Wittgenstein Centre education projections to 2035

**Adding a new country = adding one JSON file. Zero code changes.**

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
│   └── config_loader.py         # Country-agnostic config system
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
| Frey & Osborne | Automation probability scores by occupation |
| ILO Task Indices | Routine vs non-routine task content by occupation |
| ESCO Taxonomy | Multilingual skills and occupation taxonomy |
| O*NET (US DOL) | Occupation task content, adapted for LMIC contexts |
| Wittgenstein Centre | Education level projections by country to 2035 |
| World Bank STEP | Skills measurement data from LMIC contexts |

---

## Running Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Run demo for Pakistan
python main.py --demo --country PK

# Run demo for Nigeria (proves country-agnostic design)
python main.py --demo --country NG

# Interactive mode
python main.py --country PK
```

---

## Live Demo

**App:** [rozgar-ai.lovable.app](https://rozgar-ai.lovable.app)

**Demo login for Organization Portal:**
- Email: `demo@rozgar.ai`
- Password: `demo123`

---

## Demo Profile — Zara Ahmed

The app comes pre-loaded with Zara's profile for demo purposes:

- **Name:** Zara Ahmed, 21, Karachi
- **Education:** Matric
- **Work history:** Content creation for local businesses in Karachi for 2 years. Edits reels, runs Instagram and WhatsApp marketing for a clothing boutique in Tariq Road. Grew their followers from 400 to 4,000.
- **Self-taught:** CapCut, Canva, basic SEO and hashtag strategy from YouTube
- **Languages:** Urdu, Sindhi, English

Zara represents the hundreds of millions of young people whose real skills are invisible to the formal economy. She is not the exception — she is the rule.

---

## Built By

Built for the MIT Global Hackathon 2025 — World Bank UNMAPPED Challenge.

GitHub: [maryamfarhan/rozgar-pathways](https://github.com/maryamfarhan/rozgar-pathways)

*We built Rozgar.ai because we are the people this is for.*

---

## License

Open source. Fork it, configure it for your country, deploy it.
