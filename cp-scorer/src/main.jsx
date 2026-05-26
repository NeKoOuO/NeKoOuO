import { Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#08080d", color: "#f87171", padding: 24, fontFamily: "monospace", fontSize: 13 }}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Runtime Error</div>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
