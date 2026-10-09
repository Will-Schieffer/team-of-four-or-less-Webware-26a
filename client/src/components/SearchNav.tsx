import { useState } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUserInput = userInput.trim().toLowerCase();
    setUserInput(cleanUserInput);
    navigate(`/results/${encodeURIComponent(cleanUserInput)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center bg-white rounded-lg shadow-md w-100 max-h-[8vh]">
      <input
        className='placeholder-slate-950 text-slate-950 focus:outline-none p-4 w-full'
        type="text"
        placeholder="Enter your city, town, or ZIP Code..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        required
      />
      <button type="submit" className='group cursor-pointer text-slate-950 bg-teal-600 text-white transition hover:bg-teal-500 rounded-r-lg p-4 font-bold h-full max-h-[8vh]'>
        <span className='inline-block transition-transform duration-200 group-hover:scale-125'>Search</span>
      </button>
    </form>
  )
}