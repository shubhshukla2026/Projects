# Tech Stack Recommender

**Project 3 — AI Recommendation Logic**

A content-based recommendation engine that maps a user's skills and interests to the tech job roles they best match, using **TF-IDF vectorization** and **cosine similarity**. The project ships two parallel implementations: a Python CLI and a self-contained interactive web demo.

## How it works

The recommender treats each job role as an "item" described by a document of its associated skills. A user's entered skills are treated as a query, transformed into the same vector space, and scored against every role by similarity.

**4-step ranking pipeline:**

| Step | Description |
|---|---|
| **Ingestion** | Load job roles + skill sets from the dataset; capture user's skills (minimum of 3) |
| **Scoring** | Vectorize all documents with TF-IDF, score user vs. each role with cosine similarity |
| **Sorting** | Rank roles by descending similarity score |
| **Filtering** | Truncate to the Top-N (default 3) recommendations |

**IPO framework:**
- **Input** — user's skills (≥3) + `raw_skills.csv` (roles as items)
- **Process** — TF-IDF vector mapping, cosine similarity scoring
- **Output** — top-N ranked job role recommendations, with match percentage

## Project structure

```
project-3/
├── tech_stack_recommender.py   # Python CLI implementation (scikit-learn)
├── raw_skills.csv               # Dataset: job roles and their associated skills
├── index.html                   # Interactive browser demo (vanilla JS TF-IDF)
├── requirements.txt              # Python dependencies
└── readme.md
```

## Getting started (CLI)

**Requirements:** Python 3.8+

```bash
pip install -r requirements.txt
python tech_stack_recommender.py
```

You'll be prompted to enter at least 3 skills or interests, comma-separated:

```
Enter at least 3 skills or interests, separated by commas.
Example: Python, Cloud Computing, Automation

Your skills: Python, SQL, Machine Learning
```

The script prints your top 3 matching roles with a match percentage:

```
--- Top Recommended Career Paths ---
1. Data Scientist  —  74.3% match
2. Machine Learning Engineer  —  61.2% match
3. Data Engineer  —  48.9% match
```

If none of the entered skills overlap with the dataset (a "cold start"), the tool notes this and suggests broader terms.

## Getting started (web demo)

`index.html` is a fully self-contained, dependency-free page — just open it in a browser. It reimplements the same TF-IDF + cosine similarity logic in vanilla JavaScript (mirroring `raw_skills.csv`) with:

- A chip-based skill input with quick-add suggestions
- An animated pipeline visualization (Ingestion → Scoring → Sorting → Filtering)
- A live match gauge and ranked results list

No build step or server required.

## Dataset

`raw_skills.csv` contains 12 job roles (e.g. Data Scientist, DevOps Engineer, Backend Developer, Cloud Architect, ML Engineer, Cybersecurity Analyst) each mapped to a representative skill set. Edit or extend this CSV to add new roles or adjust matching behavior — the CLI will automatically pick up changes; the web demo's `ROLES` array in `index.html` should be updated to match.

## Dependencies

- `scikit-learn` (CLI only — `TfidfVectorizer`, `cosine_similarity`)
- The web demo has zero dependencies (TF-IDF implemented from scratch in JS)

🌐 Live Demo: (https://shubhshukla2026.github.io/DecodeLab-Internships/project-3)

👨‍💻 Author
Shubh Shukla

🎓 Student & Developer 🚀 GitHub Project 📚  — Project 3

⭐ Thanks for checking out my project!
