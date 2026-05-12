import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [style, setStyle] = useState("");

  const [captions, setCaptions] = useState("");

  const [loading, setLoading] = useState(false);

  const generateCaptions = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/generate-caption",
        {
          topic,
          mood,
          style
        }
      );

      setCaptions(res.data.captions);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1>AI Caption Generator</h1>

        <p className="subtitle">
          Generate smart social media captions using AI
        </p>

        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />

        <button
          onClick={generateCaptions}
          disabled={loading}
        >
          {
            loading
              ? "Generating..."
              : "Generate Captions"
          }
        </button>

        {
          captions && (

            <div className="result">

              <h2>Generated Captions</h2>

              <pre>
                {captions}
              </pre>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;