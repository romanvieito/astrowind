import { createSignal } from 'solid-js';
import Modal from './Modal';

interface ButtonProps {
  fullname: string | null | undefined;
  email: string | null | undefined;
  incase: number
}

const ButtonUWL = ({fullname, email, incase}:ButtonProps) => {
  
  const [isOpenQuestion, setIsOpenQuestion] = createSignal<boolean>(false);
  const [isOpenProcess, setIsOpenProcess] = createSignal<boolean>(false);

  const handleClick = () => {
    setIsOpenQuestion(true);    
  };

  let caseclass = "w-full sm:mb-0 btn-secondary ";
  if(incase === 1)
    caseclass += "bg-blue-500 hover:bg-blue-700 text-white font-bold";
  else if(incase === 2)
    caseclass += "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto";

  //---------------------------------------------------------------------------------------
  

  const handleYesQuestionClick = async () => {

    setIsOpenQuestion(false);
    setIsOpenProcess(true);
    
    const data = {
      fullname: 'Juan',
      email: 'juan@example.com'
    };
  
    try {
      const response = await fetch('/api/adduserswaitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      setIsOpenProcess(false);

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const result = await response.json();
      console.log('Respuesta de la API:', result);
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  }

  const handleNoQuestionClick = () => {
    console.log("No clicked");
    setIsOpenQuestion(false);
  }

  //---------------------------------------------------------------------------------------

  return (
    <div>
      <button 
        className={caseclass} 
        onClick={handleClick}>
        Join Waitlist
      </button>
      <div>
      {isOpenQuestion() && 
        <Modal
          isOpen={isOpenQuestion()} 
          icon='question' 
          message='Are you sure you want to get on the waitlist?' 
          onCancelClick={handleNoQuestionClick}
          onConfirmClick={handleYesQuestionClick}
        /> 
      }
      {isOpenProcess() && 
        <Modal
          isOpen={isOpenProcess()} 
          icon='process' 
          message='Processing...'
        /> 
      }      
      </div>
    </div>
  );
};

export default ButtonUWL;