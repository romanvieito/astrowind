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
  const [isOpenResult, setIsOpenResult] = createSignal<boolean>(false);
  const [typeIcon, setTypeIcon] = createSignal<string>('');
  const [typeMsge, setTypeMsge] = createSignal<string>('');

  const handleClick = () => {
    setIsOpenQuestion(true);    
  };

  let caseclass = "w-full sm:mb-0 btn-secondary ";
  if(incase === 1)
    caseclass += "bg-blue-500 hover:bg-blue-700 text-white font-bold";
  else if(incase === 2)
    caseclass += "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto";

  //---------------------------------------------------------------------------------------  

  const handleOkQuestionClick = async () => {

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
        setTypeIcon('error');
        setTypeMsge('Request error');
        setIsOpenResult(true);
        console.error('Request error');
      } else {
        const result = await response.json();
        console.log('Respuesta de la API:', result);
      }
    } catch (error) {
      setTypeIcon('error');
      setTypeMsge('Problems executing the API');
      setIsOpenResult(true);      
      console.error('Error al llamar a la API:', error);
    }
  }

  const handleCancelQuestionClick = () => {
    setIsOpenQuestion(false);
  }

  const handleOkResultClick = () => {
    setIsOpenResult(false);
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
          onCancelClick={handleCancelQuestionClick}
          onOkClick={handleOkQuestionClick}
        /> 
      }
      {isOpenProcess() && 
        <Modal
          isOpen={isOpenProcess()} 
          icon='process' 
          message='Processing...'
        /> 
      }
      {isOpenResult() && 
        <Modal
          isOpen={isOpenProcess()} 
          icon={typeIcon()} 
          message={typeMsge()}
          onOkClick={handleOkResultClick}
        /> 
      }            
      </div>
    </div>
  );
};

export default ButtonUWL;