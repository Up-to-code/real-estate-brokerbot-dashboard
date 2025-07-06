"use client";
import { useState } from "react";

export default function DevPage() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setResult(null);
    setError(null);
    try {
      const res = await fetch(api || "");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setError(err.message || "Unknown error");
      // Also log to console for devs
      console.error("API Test Error:", err);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      {api && <p>API URL: {api}</p>}
      <h1>Development Page</h1>
      <p>This is a developer-only page for testing and debugging features.</p>
      <button onClick={testApi} style={{ margin: "16px 0", padding: "8px 16px" }}>
        Test API
      </button>
      {result && (
        <div>
          <h3>API Response:</h3>
          <pre style={{ background: "#eee", padding: 16 }}>{result}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
} 