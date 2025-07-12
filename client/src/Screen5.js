import React,{useState} from "react";

function Screen5(){
    const SkillSwapForm = () => {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { offeredSkill, wantedSkill, message });
  };
    return(
        <div>
            <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded-2xl shadow-lg space-y-4 bg-white"
    >
      <div>
        <label className="block mb-1 font-medium">Choose one of your offered skills</label>
        <select
          value={offeredSkill}
          onChange={(e) => setOfferedSkill(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="">-- Select --</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Dependable Scorpion">Dependable Scorpion</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Choose one of their wanted skills</label>
        <select
          value={wantedSkill}
          onChange={(e) => setWantedSkill(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="">-- Select --</option>
          <option value="Marketing">Marketing</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Dependable Scorpion">Dependable Scorpion</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 border rounded-md p-2 resize-none"
          placeholder="Write a message..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-200 text-black font-medium py-2 rounded-md hover:bg-blue-300"
      >
        Submit
      </button>
    </form>
        </div>
    )
}}

export default Screen5