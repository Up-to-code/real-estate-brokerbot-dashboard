export default function DevPage() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div style={{ padding: 32 }}>
      {api && <p>API URL: {api}</p>}
      <h1>Development Page</h1>
      <p>This is a developer-only page for testing and debugging features.</p>
    </div>
  );
} 