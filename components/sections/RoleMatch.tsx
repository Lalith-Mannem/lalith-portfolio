"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, XCircle, Loader2, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILL_GROUPS } from "@/lib/data";

/* ── Keyword bank ─────────────────────────────────────────────────────────── */

interface ScoredKeyword {
  name: string;
  aliases: string[];
  confidence: number;
  category: string;
}

const KEYWORD_BANK: ScoredKeyword[] = [
  // Languages
  { name: "C++", aliases: ["c++", "cpp", "c plus plus"], confidence: 93, category: "Languages" },
  { name: "Python", aliases: ["python"], confidence: 88, category: "Languages" },
  { name: "Go / Golang", aliases: [" go ", "golang", "go language"], confidence: 80, category: "Languages" },
  { name: "Java", aliases: ["java", "spring boot", "jvm"], confidence: 82, category: "Languages" },
  { name: "C# / .NET", aliases: ["c#", ".net", "dotnet", "asp.net", ".net core"], confidence: 82, category: "Languages" },
  { name: "SQL", aliases: ["sql", "query language", "relational"], confidence: 85, category: "Languages" },
  // Distributed & Streaming
  { name: "Apache Beam / Flume", aliases: ["apache beam", "beam", "flume", "dataflow"], confidence: 92, category: "Distributed & Streaming" },
  { name: "Apache Kafka", aliases: ["kafka", "apache kafka", "event streaming", "message queue"], confidence: 85, category: "Distributed & Streaming" },
  { name: "Apache Pulsar", aliases: ["pulsar", "apache pulsar", "event-driven"], confidence: 85, category: "Distributed & Streaming" },
  { name: "Apache Spark", aliases: ["spark", "apache spark", "pyspark", "rdd"], confidence: 78, category: "Distributed & Streaming" },
  { name: "MapReduce / Batch Pipelines", aliases: ["mapreduce", "batch processing", "etl", "data pipeline", "airflow"], confidence: 85, category: "Distributed & Streaming" },
  { name: "Distributed Systems", aliases: ["distributed systems", "fault tolerant", "fault-tolerant", "high availability", "eventual consistency", "consensus"], confidence: 90, category: "Distributed & Streaming" },
  // Databases & Storage
  { name: "Bigtable / NoSQL", aliases: ["bigtable", "kansas", "nosql", "wide-column", "hbase"], confidence: 88, category: "Databases & Storage" },
  { name: "PostgreSQL / SQL Server", aliases: ["postgresql", "postgres", "sql server", "relational database", "rdbms"], confidence: 84, category: "Databases & Storage" },
  { name: "Redis", aliases: ["redis", "caching", "in-memory", "cache layer"], confidence: 86, category: "Databases & Storage" },
  { name: "Elasticsearch / OpenSearch", aliases: ["elasticsearch", "opensearch", "elk", "search engine", "logstash"], confidence: 78, category: "Databases & Storage" },
  { name: "MongoDB", aliases: ["mongodb", "document store", "document database"], confidence: 75, category: "Databases & Storage" },
  // Cloud & DevOps
  { name: "Google Cloud (GCP)", aliases: ["gcp", "google cloud", "google cloud platform", "bigquery", "bigtable", "dataflow", "pubsub"], confidence: 90, category: "Cloud & DevOps" },
  { name: "AWS", aliases: ["aws", "amazon web services", "lambda", "fargate", "step functions", "s3", "ec2", "eks"], confidence: 85, category: "Cloud & DevOps" },
  { name: "Kubernetes / Docker", aliases: ["kubernetes", "k8s", "docker", "containerization", "container orchestration"], confidence: 83, category: "Cloud & DevOps" },
  { name: "Terraform / IaC", aliases: ["terraform", "infrastructure as code", "iac", "pulumi", "cloudformation"], confidence: 80, category: "Cloud & DevOps" },
  { name: "CI/CD", aliases: ["ci/cd", "continuous integration", "continuous deployment", "github actions", "jenkins", "build pipeline"], confidence: 82, category: "Cloud & DevOps" },
  { name: "Observability", aliases: ["observability", "monitoring", "datadog", "grafana", "prometheus", "honeycomb", "opentelemetry", "tracing"], confidence: 82, category: "Cloud & DevOps" },
  // ML & Data (supplementary)
  { name: "FAISS / Vector Search", aliases: ["faiss", "vector search", "vector database", "embedding", "semantic search", "pinecone", "weaviate"], confidence: 78, category: "ML & Data" },
  { name: "PyTorch / TensorFlow", aliases: ["pytorch", "tensorflow", "torch", "keras", "deep learning framework"], confidence: 75, category: "ML & Data" },
  { name: "RAG / LLM Tooling", aliases: ["rag", "retrieval augmented", "llm", "large language model", "langchain", "llamaindex"], confidence: 78, category: "ML & Data" },
  { name: "Data Infrastructure", aliases: ["data infrastructure", "data platform", "data lake", "platinum", "data warehouse", "lakehouse"], confidence: 90, category: "ML & Data" },
  // Engineering Practice
  { name: "System Design", aliases: ["system design", "scalable architecture", "high-scale", "petabyte", "large-scale"], confidence: 90, category: "Engineering" },
  { name: "Microservices / APIs", aliases: ["microservices", "rest api", "grpc", "api design", "service mesh"], confidence: 85, category: "Engineering" },
  { name: "Performance / Optimization", aliases: ["performance", "latency", "throughput", "optimization", "profiling", "p99", "p95"], confidence: 88, category: "Engineering" },
];

/* ── Scoring logic ─────────────────────────────────────────────────────────── */

interface MatchResult {
  score: number;
  matched: ScoredKeyword[];
  missing: ScoredKeyword[];
  topCategory: string;
  recommendation: string;
}

function scoreJobDescription(jd: string): MatchResult {
  const lower = jd.toLowerCase();

  const matched: ScoredKeyword[] = [];
  const missing: ScoredKeyword[] = [];

  for (const kw of KEYWORD_BANK) {
    const hit = kw.aliases.some((a) => lower.includes(a.toLowerCase()));
    if (hit) matched.push(kw);
    else missing.push(kw);
  }

  const totalPossible = KEYWORD_BANK.reduce((s, k) => s + k.confidence, 0);
  const totalMatched = matched.reduce((s, k) => s + k.confidence, 0);
  // Sigmoid-like scaling so even 50% keyword match → high score (realistically strong candidate)
  const raw = totalMatched / totalPossible;
  const score = Math.min(99, Math.round(30 + raw * 72));

  const categoryCounts: Record<string, number> = {};
  for (const m of matched) {
    categoryCounts[m.category] = (categoryCounts[m.category] ?? 0) + 1;
  }
  const topCategory =
    Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "ML Systems";

  let recommendation = "";
  if (score >= 88) recommendation = "Exceptional match — strong hire signal";
  else if (score >= 75) recommendation = "Strong match — recommend interview";
  else if (score >= 60) recommendation = "Good match — worth a conversation";
  else recommendation = "Partial match — review growth areas below";

  return { score, matched, missing: missing.slice(0, 6), topCategory, recommendation };
}

/* ── Circular progress SVG ─────────────────────────────────────────────────── */

function CircularScore({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 88 ? "#10b981" : score >= 75 ? "#06b6d4" : score >= 60 ? "#8b5cf6" : "#f59e0b";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="136" height="136" className="-rotate-90">
        <circle
          cx="68" cy="68" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <motion.circle
          cx="68" cy="68" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-4xl font-black text-white"
        >
          {score}%
        </motion.span>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">match</span>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────────── */

export default function RoleMatch() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const analyze = async () => {
    if (!jd.trim() || analyzing) return;
    setAnalyzing(true);
    setResult(null);
    // Simulate a brief "inference" delay for effect
    await new Promise((r) => setTimeout(r, 900));
    setResult(scoreJobDescription(jd));
    setAnalyzing(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle bg gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="section-container relative">
        <SectionHeading
          eyebrow="// role match · powered by nlp"
          title="See how I fit your role"
          description="Paste a job description and get an instant skills match — so you know exactly what you're getting before the first call."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/6 bg-white/3 px-4 py-2.5">
                <Cpu size={13} className="text-purple-400" />
                <span className="font-mono text-xs text-slate-500">
                  job_description.txt
                </span>
              </div>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={12}
                placeholder="Paste the full job description here...&#10;&#10;e.g. 'We are looking for a Senior ML Engineer to build and scale our LLM training infrastructure using PyTorch and JAX...'"
                className="w-full resize-none bg-transparent px-4 py-4 text-sm text-slate-300 placeholder-slate-700 outline-none leading-relaxed"
              />
            </div>

            <button
              onClick={analyze}
              disabled={!jd.trim() || analyzing}
              className="group relative flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {analyzing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running inference…
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Analyze Match
                  <span className="font-mono text-[10px] text-purple-200 ml-1">
                    · client-side NLP
                  </span>
                </>
              )}
            </button>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            ref={resultRef}
          >
            <AnimatePresence mode="wait">
              {!result && !analyzing ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 glass rounded-2xl p-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Cpu size={24} className="text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-600 max-w-xs">
                    Paste a job description on the left and click{" "}
                    <span className="text-slate-400">Analyze Match</span> to see a
                    live skills alignment report.
                  </p>
                </motion.div>
              ) : analyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 glass rounded-2xl p-8"
                >
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-2 border-white/10 border-t-cyan-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-purple-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />
                  </div>
                  <div className="space-y-1 text-center font-mono text-xs text-slate-500">
                    {["tokenizing job description…", "extracting skill signals…", "computing match score…"].map((s, i) => (
                      <motion.p
                        key={s}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.28 }}
                      >
                        {s}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl p-6 space-y-5"
                >
                  {/* Score + recommendation */}
                  <div className="flex items-center gap-6">
                    <CircularScore score={result.score} />
                    <div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        Assessment
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white leading-snug">
                        {result.recommendation}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-500">
                        Strongest in{" "}
                        <span className="text-cyan-400">{result.topCategory}</span>
                      </p>
                    </div>
                  </div>

                  {/* Matched skills */}
                  {result.matched.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                        ✓ Matched ({result.matched.length} signals)
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {result.matched.slice(0, 8).map((kw) => (
                          <div key={kw.name} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="shrink-0 text-emerald-500" />
                            <span className="text-xs text-slate-300">{kw.name}</span>
                            <span className="ml-auto font-mono text-[10px] text-emerald-600">
                              {kw.confidence}%
                            </span>
                          </div>
                        ))}
                        {result.matched.length > 8 && (
                          <p className="text-xs text-slate-600">
                            +{result.matched.length - 8} more matched
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gap areas */}
                  {result.missing.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-mono text-slate-600 uppercase tracking-wider">
                        ○ Not in JD / growth areas
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.missing.map((kw) => (
                          <span
                            key={kw.name}
                            className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-slate-600"
                          >
                            <XCircle size={9} />
                            {kw.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-700 font-mono border-t border-white/6 pt-3">
                    Client-side keyword scoring · weighted by proficiency confidence
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
