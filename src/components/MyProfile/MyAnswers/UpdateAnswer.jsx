import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';

const config = {
  readonly: false,
  buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

export default function UpdateAnswer() {
  const params = useParams();
  const editor = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [value, setValue] = useState("");
  const [state, setState] = useState(false);

  const fetchAnswer = async (id) => {
    const response = await fetch(`http://localhost:5000/api/answer/userAnstoUpdate/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then((data) => {
      setAnswer(data);
      setValue(data.answer || "");
    });
  }

  const updateAns = async (e, id) => {
    e.preventDefault();

    let response = await fetch(`http://localhost:5000/api/answer/updateans/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answer: value })
    });

    let json = await response.json();
    if (json.status === "updated") {
      setState(true);
      window.scrollTo(0, 0);
    }
  }

  const getValue = (newVal) => {
    setValue(newVal);
  };

  useEffect(() => {
    fetchAnswer(params.type);
  }, [params.type]);

  return (
    <div className="min-h-screen bg-background text-textMain py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-8">
        
        {state && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-between shadow-lg">
            <span>Your response has been updated <strong>successfully</strong>!</span>
            <button onClick={() => setState(false)} className="text-emerald-400 hover:text-white font-bold">&times;</button>
          </div>
        )}

        {/* Guide Panel */}
        <div className="glass rounded-2xl p-6 border border-surfaceBorder relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">REPLY SYSTEM</span>
          <h2 className="text-2xl font-black text-textMain mt-1">Update Your Response</h2>
          <p className="text-textMuted text-xs mt-2 max-w-xl leading-relaxed">
            Provide a clean, well-formatted, and accurate answer to solve the user's query effectively.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => updateAns(e, answer.id)} className="flex flex-col gap-6">
          <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 shadow-sm flex flex-col gap-2">
            <label className="text-sm font-bold text-textMain mb-2">Response Editor</label>
            <div className="border border-surfaceBorder rounded-xl overflow-hidden text-black">
              <JoditEditor
                ref={editor}
                value={answer.answer || ""}
                config={config}
                tabIndex={1}
                onChange={getValue}
              />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button 
              type="submit" 
              className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primaryHover hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Update Response
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
