import { createSignal } from 'solid-js';

interface ButtonProps {
  fullname: string | null | undefined;
  email: string | null | undefined;
  incase: number
}

const ButtonUWL = ({fullname, email, incase}:ButtonProps) => {
  const [message, setMessage] = createSignal('');

  const handleClick = () => {
    const data = fullname + " " + email;
    setMessage(data);
  };

  let caseclass = "w-full sm:mb-0 btn-secondary ";
  if(incase === 1)
    caseclass += "bg-blue-500 hover:bg-blue-700 text-white font-bold";
  else if(incase === 2)
    caseclass += "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto";

  return (
    <div>
      <button 
        className={caseclass} 
        onClick={handleClick}>
        Join Waitlist
      </button>
      {message && <p>{message()}</p>}
    </div>
  );
};

export default ButtonUWL;