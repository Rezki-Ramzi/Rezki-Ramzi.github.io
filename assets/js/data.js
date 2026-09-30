/* ==========================================================================
   SITE CONTENT — edit this file to update the website.
   Everything below is rendered automatically by main.js.
   Fields marked TODO are placeholders to fill in.
   ========================================================================== */

const SITE = {
  name: "Ramzi Rezki",
  role: "PhD Student in Computer Science — AI for Cybersecurity",
  affiliation: "Cnam Paris — Conservatoire national des arts et métiers",
  email: "ramzi.rezki@lecnam.net",
  links: {
    orcid: "https://orcid.org/0009-0007-4449-8591",
    scholar: "https://scholar.google.com/citations?user=VZrorvkAAAAJ&hl=en",
    // TODO: replace with your exact LinkedIn profile URL (e.g. https://www.linkedin.com/in/ramzi-rezki)
    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ramzi%20Rezki",
    // TODO: your GitHub profile, e.g. "https://github.com/ramzirezki"
    github: "https://github.com/",
  },
  cvPdf: "assets/cv/Ramzi_Rezki_CV.pdf",
};

/* ---------------------------------------------------------------- CV ---- */
const CV = {
  education: [
    {
      period: "2023 — 2027",
      title: "PhD in Computer Science",
      place: "Cnam Paris, France",
      details: [
        "GNN-based attack detection in cyber-physical and IoT systems.",
        "Supervisors: Pr. Fabrice Mourlin, Pr. Youakim Badr, Pr. Samia Bouzefrane.",
        "Funded by the French ANR GNADIS project (ANR-23-IAS4-0002).",
      ],
    },
    {
      period: "2018 — 2023",
      title: "State Engineer Degree — Intelligent Systems & Data Science",
      place: "ESI — Higher National School of Computer Science, Algiers, Algeria",
      details: [
        "Machine learning, deep learning, NLP, image processing, parallel computing and business intelligence.",
      ],
    },
    {
      period: "2016 — 2018",
      title: "Baccalaureate — with honors (17.03 / 20)",
      place: "N'Gaous, Batna, Algeria",
      details: [],
    },
  ],
  experience: [
    {
      period: "2023 — Present",
      title: "Doctoral Researcher — ANR GNADIS project",
      place: "Cnam Paris, France",
      details: [
        "Graph Neural Networks (GAT, Line-Graph GNNs, temporal graphs) for IoT and network intrusion detection.",
        "Benchmarking NLP-style and tabular Transformers for multi-class intrusion detection.",
        "Graph learning for APT stage detection on the Unraveled dataset.",
      ],
    },
    {
      period: "2024 — 2025",
      title: "Master's Student Supervision",
      place: "Cnam Paris, France",
      details: ["Supervised a master's student on IoT attack detection using machine learning."],
    },
    {
      period: "Teaching",
      title: "Lecturer — Professional Diploma in Web Integration Assistance (USAL33)",
      place: "Cnam Paris, France",
      details: [
        "HTML / CSS — more than 60 hours.",
        "Computer Networks — more than 20 hours.",
      ],
    },
    {
      period: "Oct. 2022 — Jun. 2023",
      title: "Research Intern — Word Spotting",
      place: "LCSI Lab, ESI, Algiers, Algeria",
      details: [
        "9-month project on deep-learning keyword spotting: finding every occurrence of a word in scanned documents or audio without full recognition.",
      ],
    },
    {
      period: "Oct. 2022 — Jan. 2023",
      title: "Deep Learning Intern — Forest Fire Detection",
      place: "Algiers, Algeria",
      details: ["Real-time forest fire detection with object-detection models (YOLO, R-CNN)."],
    },
    {
      period: "Mar. 2022 — Jul. 2022",
      title: "Data Science Projects",
      place: "ESI, Algiers, Algeria",
      details: [
        "Community detection: hybrid machine-learning + metaheuristic approach, team of six.",
        "Permutation flow-shop optimization: heuristics, metaheuristics and a reinforcement-learning hyper-heuristic selector.",
      ],
    },
  ],
  skills: {
    "AI & Data Science": ["PyTorch", "PyTorch Geometric", "HuggingFace", "scikit-learn", "XGBoost", "NLP", "Image Processing"],
    "Security & Networks": ["Intrusion Detection", "IoT Security", "APT detection", "DoS / DDoS", "TCP/IP", "CCNA ITN"],
    "Programming": ["Python", "C", "Java", "SQL", "Django", "HTML / CSS / JS"],
    "HPC & BI": ["CUDA", "MPI", "Pthreads", "Tableau", "Pentaho ETL"],
    "Soft skills": ["Communication", "Teamwork", "Problem solving"],
  },
  languages: ["French — Fluent", "English — Fluent"],
};

/* ------------------------------------------------------- PUBLICATIONS ---- */
/*  status: "published" | "under-review" | "preprint" | "in-preparation"
    pdf:    path to the paper (e.g. "assets/papers/ares-2025.pdf") or ""
    code:   GitHub repository URL or ""
    doi:    DOI URL or ""                                                     */
const PUBLICATIONS = [
  {
    title: "Leveraging Graph Neural Networks for Attack Detection in IoT Systems",
    authors: "Ramzi Rezki et al.", // TODO: full author list
    venue: "ARES — International Conference on Availability, Reliability and Security",
    year: "2025",
    status: "published",
    tags: ["GNN", "IoT", "Attack Detection"],
    abstract:
      "Models IoT network traffic as graphs and applies Graph Neural Networks to detect attacks, exploiting the relations between communicating devices rather than treating each flow in isolation.",
    pdf: "",
    code: "",
    doi: "", // TODO: add the ARES DOI
  },
  {
    title: "When Does Graph Structure Matter for Network Intrusion Detection? An Empirical Study Beyond Flow-Level Features",
    authors: "Ramzi Rezki et al.",
    venue: "Q1 Journal — (Elsevier)",
    year: "2026",
    status: "under-review",
    tags: ["GNN", "Random Forest", "Bot-IoT", "ToN-IoT", "Ablation"],
    abstract:
      "A controlled empirical study questioning whether Graph Neural Networks are necessary for DoS/DDoS detection. Classical models reach near-perfect scores on Bot-IoT and ToN-IoT from flow-level statistics alone; multi-seed ablations expose label-proxy features and show that graph-derived features matter only for specific classes, repositioning GNNs toward low-rate attacks and cross-dataset generalization.",
    pdf: "",
    code: "",
    doi: "",
  },
  {
    title: "Transformer-Based Multi-Class Intrusion Detection for IoT and Network Traffic Analysis",
    authors: "Ramzi Rezki et al.",
    venue: "Conference — under evaluation",
    year: "2026",
    status: "in-preparation",
    tags: ["Transformers", "BERT", "FT-Transformer", "Calibration", "XAI"],
    abstract:
      "A reproducible comparison of text-serialized NLP transformers (DistilBERT, BERT, SecBERT, DeBERTa-v3, GPT-2) and tabular transformers (TabTransformer, FT-Transformer, SAINT) for multi-class intrusion detection on IoT and network datasets, covering F1-macro, MCC, calibration and CPU inference latency.",
    pdf: "",
    code: "",
    doi: "",
  },
  {
    title: "Disentangling Spatial and Temporal Context for APT Stage Detection: A Graph Learning Study on Unraveled",
    authors: "Ramzi Rezki et al.",
    venue: "Journal — under review",
    year: "2026",
    status: "under-review",
    tags: ["APT", "Temporal GNN", "Unraveled", "Stage Detection"],
    abstract:
      "Detects the stages of Advanced Persistent Threats on the Unraveled dataset by building temporal flow graphs, separating the contribution of spatial (host-relation) context from temporal context, and comparing graph models against strong tree-based baselines.",
    pdf: "",
    code: "",
    doi: "",
  },
  {
    title: "Endpoint-Relation-Aware Line Graph Neural Networks for Multiclass IoT Intrusion Detection",
    authors: "Ramzi Rezki et al.",
    venue: "Q1 journal",
    year: "2026",
    status: "under-review",
    tags: ["Line Graph", "GNN", "IoT", "Multiclass"],
    abstract:
      "Turns flows into nodes of a line graph so that relations between communication endpoints become explicit, enabling a GNN to classify IoT traffic into multiple attack classes.",
    pdf: "",
    code: "",
    doi: "",
  },
];

/* ------------------------------------------------------------ TEACHING ---- */
/*  Put your PDFs in /courses/html-css/ and /courses/networks/,
    then add one line per file below.  type: "lecture" | "lab" | "exam" | "solution" */
const COURSES = [
  {
    id: "html-css",
    title: "Web Development — HTML & CSS",
    level: "Professional Diploma USAL33 · 60+ hours",
    description:
      "From semantic HTML to modern, responsive layouts with Flexbox and Grid, accessibility and deployment on GitHub Pages.",
    icon: "code",
    files: [
      { name: "Lecture 1 — Introduction to HTML", file: "courses/html-css/html.pdf", type: "lecture" },
      { name: "Lab 1 — Your first page",          file: "courses/html-css/",     type: "lab" },
    ],
  },
  {
    id: "networks",
    title: "Computer Networks",
    level: "Professional Diploma USAL33 · 20+ hours",
    description:
      "OSI & TCP/IP models, addressing and subnetting, routing, transport protocols and network security fundamentals — lectures and past exams.",
    icon: "network",
    files: [
      { name: "Chapter 1 — Network models",  file: "courses/networks/", type: "lecture" },
      { name: "Exam 2025 — with solutions",  file: "courses/networks/",  type: "exam" },
    ],
  },
];

/* ------------------------------------------- CERTIFICATIONS & AWARDS ---- */
/*  kind: "certification" | "award" | "achievement"  — status: "earned" | "in-progress"
    link: credential URL (shows a "verify ↗" link) or ""                        */
const ACHIEVEMENTS = [
  // { kind: "achievement", title: "Paper accepted at ARES 2025", issuer: "International Conference on Availability, Reliability and Security", date: "2025", status: "earned", link: "" },
  // { kind: "achievement", title: "ANR GNADIS Doctoral Funding", issuer: "Agence Nationale de la Recherche (ANR-23-IAS4-0002)", date: "2023", status: "earned", link: "" },

  { kind: "certification", title: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "2021", status: "earned", link: "" },
  { kind: "certification", title: "Deep Learning & Machine Learning", issuer: "Coursera", date: "", status: "earned", link: "" },
  { kind: "certification", title: "Machine Learning & Data Engineering", issuer: "Kaggle", date: "", status: "earned", link: "" },
  { kind: "certification", title: "Database Management with SQL", issuer: "", date: "", status: "earned", link: "" },
  { kind: "certification", title: "Frontend Fundamentals", issuer: "Pirple", date: "2020", status: "earned", link: "" },
  { kind: "certification", title: "JavaScript & jQuery", issuer: "SoloLearn", date: "", status: "earned", link: "" },
    { kind: "achievement", title: "Baccalaureate with Honors", issuer: "17.03 / 20", date: "2018", status: "earned", link: "" },
];
