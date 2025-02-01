import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <Head>
        <title>Custom GPT Assistant</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Custom GPT Assistant</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Ask me anything..."
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
        {response && <p className="mt-4 p-2 border border-gray-200 rounded">{response}</p>}
      </main>
    </div>
  );
}