import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock3,
  GitBranch,
  GitCommitHorizontal,
  Play,
  Plus,
  Settings2,
  Zap,
} from "lucide-react";

const runs = [
  {
    name: "Deploy production",
    branch: "main",
    time: "2 min ago",
    duration: "1m 42s",
    status: "Success",
    color: "green",
  },
  {
    name: "Test pull request #18",
    branch: "feature/metrics",
    time: "18 min ago",
    duration: "48s",
    status: "Success",
    color: "green",
  },
  {
    name: "Lint codebase",
    branch: "main",
    time: "42 min ago",
    duration: "21s",
    status: "Success",
    color: "green",
  },
  {
    name: "Deploy staging",
    branch: "release/v2.4",
    time: "1 hr ago",
    duration: "2m 08s",
    status: "Failed",
    color: "red",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [running, setRunning] = useState(false);
  const tabs = ["Overview", "Activity", "Environments"];

  const runWorkflow = () => {
    setRunning(true);
    window.setTimeout(() => setRunning(false), 1800);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Zap size={17} fill="currentColor" />
          </span>
          <span>flowstate</span>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace">
          <span className="workspace-avatar">G</span>
          <span>Ganga's projects</span>
          <span className="chevron">⌄</span>
        </div>
        <nav>
          <a className="nav-item active" href="#overview">
            <Activity size={17} /> Overview
          </a>
          <a className="nav-item" href="#workflows">
            <Play size={17} /> Workflows <span className="nav-count">4</span>
          </a>
          <a className="nav-item" href="#branches">
            <GitBranch size={17} /> Branches
          </a>
          <a className="nav-item" href="#settings">
            <Settings2 size={17} /> Settings
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="status-dot"></div>
          <span>All systems operational</span>
          <button aria-label="GitHub profile">
            <GitBranch size={18} />
          </button>
        </div>
      </aside>
      <section className="content">
        <header className="topbar">
          <div className="crumb">
            <span>Repositories</span>
            <span>/</span>
            <strong>github-actions</strong>
          </div>
          <button className="icon-button" aria-label="Open GitHub">
            <GitBranch size={19} />
          </button>
        </header>
        <div className="page-heading">
          <div>
            <p className="eyebrow">REPOSITORY</p>
            <h1>
              github-actions <span className="visibility">Public</span>
            </h1>
            <p className="subheading">
              A calm view of your continuous delivery pipeline.
            </p>
          </div>
          <button className="primary-button" onClick={runWorkflow}>
            <Play size={15} fill="currentColor" />{" "}
            {running ? "Running..." : "Run workflow"}
          </button>
        </div>
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active-tab" : "tab"}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Success rate</span>
              <CheckCircle2 size={17} />
            </div>
            <strong>96.4%</strong>
            <div className="trend up">
              ↑ 4.2% <span>this month</span>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-top">
              <span>Deployments</span>
              <ArrowUpRight size={17} />
            </div>
            <strong>28</strong>
            <div className="trend">
              Last deployed <span>2 min ago</span>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-top">
              <span>Avg. duration</span>
              <Clock3 size={17} />
            </div>
            <strong>1m 18s</strong>
            <div className="trend up">
              ↓ 12s <span>vs last month</span>
            </div>
          </article>
        </div>
        <section className="run-section">
          <div className="section-heading">
            <div>
              <h2>Recent runs</h2>
              <p>Every change, tracked from commit to production.</p>
            </div>
            <button className="quiet-button">
              <Plus size={16} /> New workflow
            </button>
          </div>
          <div className="run-list">
            {runs.map((run) => (
              <div className="run-row" key={run.name}>
                <div className={`run-icon ${run.color}`}>
                  {run.color === "green" ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <Circle size={19} />
                  )}
                </div>
                <div className="run-main">
                  <strong>{run.name}</strong>
                  <span>
                    <GitBranch size={13} /> {run.branch}{" "}
                    <span className="separator">·</span>{" "}
                    <GitCommitHorizontal size={13} /> {run.time}
                  </span>
                </div>
                <span className={`run-status ${run.color}`}>{run.status}</span>
                <span className="duration">{run.duration}</span>
                <button className="row-arrow" aria-label={`Open ${run.name}`}>
                  <ArrowUpRight size={17} />
                </button>
              </div>
            ))}
          </div>
        </section>
        <footer>
          <span>Updated just now</span>
          <span>Powered by GitHub Actions</span>
        </footer>
      </section>
    </main>
  );
}
