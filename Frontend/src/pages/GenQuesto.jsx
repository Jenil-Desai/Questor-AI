import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/global/Navbar";
import { TypewriterEffectSmooth } from "../components/ui/TypeWritter";
import { BackgroundBeamsWithCollision } from "../components/ui/BackgroundBeam";
import Footer from "../components/global/Footer";

const Dashboard = () => {
  const [mcqCount, setMcqCount] = useState("");
  const [mcqMarks, setMcqMarks] = useState("");
  const [blanksCount, setBlanksCount] = useState("");
  const [blanksMarks, setBlanksMarks] = useState("");
  const [shortAnswerCount, setShortAnswerCount] = useState("");
  const [shortAnswerMarks, setShortAnswerMarks] = useState("");
  const [longAnswerCount, setLongAnswerCount] = useState("");
  const [longAnswerMarks, setLongAnswerMarks] = useState("");
  const [uploadedMaterial, setUploadedMaterial] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const words = [{ text: "Build Question Paper With Questor-Ai!", className: "text-red-500" }];

  // Fetch the JWT token from localStorage
  const getToken = () => localStorage.getItem("user"); // Adjust the key according to where you store the JWT

  // Fetch the history of generated question papers
  useEffect(() => {
    const fetchHistory = async () => {
      const token = getToken();

      if (!token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/v1/question-paper/history", {
          headers: {
            Authorization: token,
          },
        });
        console.log(res.data);
        setHistory(res.data);
      } catch (err) {
        console.log("Error fetching question paper history", err);
        setError("Failed to fetch history. Please try again.");
      }
    };
    fetchHistory();
  }, []);

  const handleMaterialUpload = (e) => {
    setUploadedMaterial(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedMaterial || !mcqCount || !mcqMarks || !blanksCount || !blanksMarks || !shortAnswerCount || !shortAnswerMarks || !longAnswerCount || !longAnswerMarks || !difficulty) {
      alert("Please upload material and fill in all fields.");
      return;
    }

    const requestBody = {
      id: uuidv4(),
      title: uploadedMaterial.name,
      difficulty,
      questionType: {
        MCQ: {
          numberOfQuestions: mcqCount,
          marksPerQuestion: mcqMarks,
        },
        FIB: {
          numberOfQuestions: blanksCount,
          marksPerQuestion: blanksMarks,
        },
        SAQ: {
          numberOfQuestions: shortAnswerCount,
          marksPerQuestion: shortAnswerMarks,
        },
        LAQ: {
          numberOfQuestions: longAnswerCount,
          marksPerQuestion: longAnswerMarks,
        },
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(requestBody));
    formData.append("document", uploadedMaterial);

    const token = getToken();

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/question-paper", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      setHistory([...history, res.data]);
      setSuccess("Question paper generated successfully!");

      // Reset fields
      setMcqCount("");
      setMcqMarks("");
      setBlanksCount("");
      setBlanksMarks("");
      setShortAnswerCount("");
      setShortAnswerMarks("");
      setLongAnswerCount("");
      setLongAnswerMarks("");
      setUploadedMaterial(null);
      setDifficulty("");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        setError("Unauthorized access. Please log in.");
      } else {
        setError("Error generating question paper. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Download the generated question paper as PDF
  const downloadQuestionPaper = async (paperId) => {
    const token = getToken();

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/question-paper/download-qp/${paperId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "question_paper.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading question paper", error);
      if (error.response?.status === 401) {
        setError("Unauthorized access. Please log in.");
      }
    }
  };

  const downloadAnswerPaper = async (paperId) => {
    const token = getToken();

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/question-paper/download-ap/${paperId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "answer_paper.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading question paper", error);
      if (error.response?.status === 401) {
        setError("Unauthorized access. Please log in.");
      }
    }
  };

  return (
    <div className="text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center py-10">
        <TypewriterEffectSmooth words={words} className="text-center mb-8 text-3xl font-bold" />
        <div className="bg-gray-900 w-full max-w-6xl p-8 rounded-lg shadow-lg h-full">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-400">Question Paper Generator</h2>

          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block mb-2 font-bold">Upload Study Material:</label>
              <input type="file" accept=".pdf" onChange={handleMaterialUpload} className="w-full p-3 bg-gray-700 border border-gray-600 rounded transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Difficulty Level</h3>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none">
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {[
              { label: "MCQ", count: mcqCount, setCount: setMcqCount, marks: mcqMarks, setMarks: setMcqMarks },
              { label: "Blank", count: blanksCount, setCount: setBlanksCount, marks: blanksMarks, setMarks: setBlanksMarks },
              { label: "Short Answer", count: shortAnswerCount, setCount: setShortAnswerCount, marks: shortAnswerMarks, setMarks: setShortAnswerMarks },
              { label: "Long Answer", count: longAnswerCount, setCount: setLongAnswerCount, marks: longAnswerMarks, setMarks: setLongAnswerMarks },
            ].map((section, index) => (
              <div className="mb-8" key={index}>
                <h3 className="text-lg font-semibold mb-4">{section.label} Section</h3>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Number of {section.label}s:</label>
                  <input type="number" value={section.count} onChange={(e) => section.setCount(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Marks per Question:</label>
                  <input type="number" value={section.marks} onChange={(e) => section.setMarks(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded transition duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>
              </div>
            ))}

            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200" disabled={loading}>
              {loading ? "Generating..." : "Generate Question Paper"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-6xl mt-8">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-400">History</h2>
          <div className="space-y-4">
            {history.map((paper) => (
              <div key={paper.id} className="bg-gray-900 p-6 rounded-lg shadow-md">
                <p>
                  <strong>Material:</strong> {paper.title}
                </p>
                <p>
                  <strong>Difficulty:</strong> {paper.difficulty}
                </p>
                <button onClick={() => downloadQuestionPaper(paper.id)} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200">
                  Download Question Paper
                </button>
                <button onClick={() => downloadAnswerPaper(paper.id)} className="mt-2 ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200">
                  Download Answer Paper
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
