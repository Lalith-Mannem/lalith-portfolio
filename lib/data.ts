import type {
  StatItem,
  ExperienceEntry,
  Project,
  SkillGroup,
  ModelCardSpec,
  NavItem,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
];

export const TYPEWRITER_ROLES: string[] = [
  "SWE @ Google · Data Infrastructure",
  "Distributed Systems at Scale",
  "C++ · Apache Beam · Bigtable",
  "10M+ QPS · 5 PB/day",
  "Targeting ML Engineer @ FAANG",
];

export const STATS: StatItem[] = [
  {
    label: "Peak QPS Handled",
    value: 10,
    suffix: "M+",
    description: "DV360 audience serving traffic",
  },
  {
    label: "Records / Day",
    value: 20,
    suffix: "B+",
    description: "Audience profiling pipeline at Google",
  },
  {
    label: "Data Processed Daily",
    value: 5,
    suffix: "PB+",
    description: "Petabyte-scale pipeline throughput",
  },
  {
    label: "Global DV360 Traffic",
    value: 48,
    suffix: "%",
    description: "Of global DV360 ad serving supported",
  },
];

export const MODEL_CARD_SPECS: ModelCardSpec[] = [
  { key: "architecture", value: "Distributed Systems + Data Infra" },
  { key: "training_data", value: "Google · AWS · Magic Leap · Openlane" },
  { key: "primary_domain", value: "Data Infrastructure & Dist. Systems" },
  { key: "current_employer", value: "Google (DV360 Audience Backend)" },
  { key: "optimization_target", value: "latency × throughput × correctness" },
  { key: "inference_speed", value: "ships fault-tolerant pipelines" },
  { key: "languages", value: "C++, Python, Go, C#, Java" },
  { key: "license", value: "Open to ML Engineer roles · FAANG" },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "💻",
    skills: [
      { name: "C++", confidence: 93 },
      { name: "Python", confidence: 88 },
      { name: "Go", confidence: 80 },
      { name: "C# / Java", confidence: 82 },
      { name: "SQL", confidence: 85 },
    ],
  },
  {
    category: "Distributed & Streaming",
    icon: "⚡",
    skills: [
      { name: "Apache Beam / Flume", confidence: 92 },
      { name: "Apache Kafka / Pulsar", confidence: 85 },
      { name: "Apache Spark", confidence: 78 },
      { name: "Distributed Data Processing", confidence: 90 },
      { name: "MapReduce / Batch Pipelines", confidence: 85 },
    ],
  },
  {
    category: "Databases & Storage",
    icon: "🗄️",
    skills: [
      { name: "Bigtable / Kansas", confidence: 88 },
      { name: "PostgreSQL / SQL Server", confidence: 84 },
      { name: "Redis", confidence: 86 },
      { name: "Elasticsearch / OpenSearch", confidence: 78 },
      { name: "MongoDB", confidence: 75 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "Google Cloud Platform", confidence: 90 },
      { name: "AWS (Lambda, Fargate, S3)", confidence: 85 },
      { name: "Kubernetes / Docker", confidence: 83 },
      { name: "Terraform", confidence: 80 },
      { name: "CI/CD · Observability", confidence: 82 },
    ],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Google",
    role: "Software Engineer — Data Infrastructure & Distributed Systems",
    period: "",
    location: "Seattle, WA",
    isCurrent: true,
    description:
      "Building large-scale DV360 Audience Backend infrastructure powering Customer Match, audience profiling, advertiser ingestion, identity resolution, and serving-time user-list eligibility across systems handling 10M+ QPS and supporting 48% of global DV360 ad serving traffic.",
    bullets: [
      "Stabilized and hardened a Flume/Beam-based audience profiling pipeline processing 20B+ records/day and 5 PB/day, improving ingestion reliability, distributed-stage fault isolation, and production stability across petabyte-scale audience workflows.",
      "Redesigned a 6 PB/day audience processing workflow from repeated full recomputes to an incremental architecture using 1-day processing + 6-day rollups, reducing end-to-end latency by 60% while preserving 7-day aggregation correctness.",
      "Improved runtime performance by 38% by reworking memory-intensive C++ pipeline stages, optimizing distributed transforms, and hardening a 7-day TTL workflow into a fault-tolerant production data pipeline.",
      "Migrating DV360 Customer Match ID graph infrastructure from classic Nebula to Platinum Data Lake across advertiser ingestion and ads-serving flows, modernizing identity resolution for 10M+ QPS serving-time eligibility checks.",
      "Enhanced Customer Match ingestion logic processing 20B+ advertiser-ingested records/day by mapping hashed PII signals to internal graph IDs, linking user-list memberships to cluster IDs, and persisting serving-ready state into Kansas.",
      "Implemented deduplication, affinity rollups, and validation checks for multi-day audience aggregations, improving user-list membership consistency across advertiser analytics and downstream serving workflows.",
    ],
    tech: ["C++", "Apache Beam", "Flume", "Bigtable/Kansas", "Platinum Data Lake", "GCP"],
  },
  {
    company: "Amazon Web Services — Redshift",
    role: "Software Development Engineer",
    period: "",
    location: "Palo Alto, CA",
    isCurrent: false,
    description:
      "Drove migration of legacy SWF-based Redshift control-plane workflows to an AWS-native serverless stack, improving observability, maintainability, and deployment velocity.",
    bullets: [
      "Drove migration of legacy SWF-based Redshift control-plane workflows to an AWS-native serverless stack using Lambda, Fargate, and Step Functions.",
      "Re-engineered the S3Commit garbage-collection path from a legacy cleanup process into a serverless architecture, reducing operational cost by 50% while improving workflow maintainability.",
      "Designed fault-tolerant orchestration for transaction-related cleanup workflows, improving reliability of transient artifact cleanup across distributed Redshift infrastructure.",
      "Built failure-handling, retry, and rollout mechanisms for shared infrastructure workflows, reducing operational risk during control-plane migration.",
      "Partnered with adjacent teams on interface contracts, rollout planning, and failure-mode handling for cross-service infrastructure dependencies.",
    ],
    tech: ["AWS Lambda", "Fargate", "Step Functions", "S3", "SWF", "Distributed Control Plane"],
  },
  {
    company: "Magic Leap",
    role: "Software Developer — Build & Release Infrastructure",
    period: "",
    location: "Austin, TX",
    isCurrent: false,
    description:
      "Built and optimized distributed CI/CD infrastructure supporting 170+ concurrent distributed builds across the Magic Leap platform engineering organization.",
    bullets: [
      "Built a distributed Docker-image deduplication system using SHA-based hashing and Redis caching, reducing image redundancy by 50% across high-volume CI/CD workflows.",
      "Integrated RabbitMQ, Logstash, and OpenSearch into build infrastructure to support real-time log processing, indexing, and metric visibility across 170+ concurrent distributed builds.",
      "Optimized the Lead Verifier system across 150+ repositories by implementing selective build-triggering logic, reducing unnecessary CI executions and saving 1,000+ compute hours/month.",
      "Modernized internal developer tooling by rebasing 7+ years of RepoTool customizations and adding Git LFS support, improving developer workflow performance and repository scalability.",
      "Designed and implemented a configurable linter framework to enforce shared coding standards and reduce inconsistent code-quality checks in CI pipelines.",
    ],
    tech: ["Docker", "Redis", "RabbitMQ", "Logstash", "OpenSearch", "Git LFS", "CI/CD"],
  },
  {
    company: "Openlane",
    role: "Software Engineer — Backend & Event-Driven Systems",
    period: "",
    location: "Austin, TX",
    isCurrent: false,
    description:
      "Owned core services in a distributed .NET Core inspection workflow platform processing high-volume vehicle inspection, inventory, VIN intelligence, validation, audit, and downstream integration events.",
    bullets: [
      "Built and scaled backend services for vehicle inspection workflows handling 100K+ daily transactions with reliable throughput, production stability, and SLA-driven operations.",
      "Designed Apache Pulsar-based streaming pipelines for inspection events, reducing workflow processing latency by 35% and improving near-real-time state availability across downstream systems.",
      "Implemented replay-safe event consumers with correlation IDs, idempotency keys, retry handling, dead-letter paths, and vendor-failure isolation to prevent duplicate processing and invalid state transitions.",
      "Added Redis-backed caching for VIN decode and reference-data lookups using TTL-based invalidation and request coalescing, improving response latency by 70% while reducing repeated third-party API calls.",
      "Led production rollout using Terraform-managed feature flags, staged enablement, canary deployments, rollback paths, and Honeycomb tracing, improving release safety and reducing incident detection time.",
    ],
    tech: [".NET Core", "Apache Pulsar", "Redis", "PostgreSQL", "Terraform", "Honeycomb"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "RAG-Powered Document Q&A",
    tagline: "Grounded document intelligence with retrieval-augmented generation",
    description:
      "FastAPI-based retrieval-augmented generation system for PDF ingestion, semantic chunking, FAISS-based vector retrieval, context ranking, and grounded document Q&A. Added retrieval-quality checks and ranking logic that reduced irrelevant responses by 40% compared with baseline generation.",
    tech: ["Python", "FAISS", "FastAPI", "Docker", "Vector Search"],
    githubUrl: "https://github.com/Lalith-Mannem/rag-document-qa",
    gradient: "from-cyan-500/20 via-blue-600/10 to-cyan-500/5",
    accentColor: "#06b6d4",
    featured: true,
  },
  {
    title: "Multi-Threaded File System Simulator",
    tagline: "POSIX-style FS with concurrent I/O, journaling & crash recovery",
    description:
      "POSIX-style file system simulator in C++ supporting concurrent reads/writes, block allocation, inode-style metadata indexing, journaling, and crash recovery. Improved throughput by 70% over a single-threaded baseline under contention-heavy workloads using read-write locks and fine-grained synchronization.",
    tech: ["C++", "POSIX APIs", "Read-Write Locks", "Journaling", "Concurrency"],
    githubUrl: "https://github.com/Lalith-Mannem/multithreaded-fs",
    gradient: "from-purple-500/20 via-violet-600/10 to-purple-500/5",
    accentColor: "#8b5cf6",
    featured: true,
  },
];
