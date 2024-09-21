import { createSignal } from 'solid-js';
import Modal from './Modal';
import { trackEvent } from '~/utils/mixpanel-config';

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
    try {
      // Track the event once using the trackEvent function
      await trackEvent("Join Waitlist Click Button", { fullname, email });
    } catch (error) {
      console.error("Error tracking event:", error);
      // Optionally, you can set an error message to display to the user
      // setTypeMsge("An error occurred while processing your request.");
    }

    setIsOpenQuestion(false);
    setIsOpenProcess(true);

    const data = {
      fullname: fullname,
      email: email
    };

    try {
      const response = await fetch('/api/adduserswaitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if(result.error!) {
        setIsOpenProcess(false);
        if(result.error === 'You are already on the waitlist') {
          setTypeIcon('info');
        } else {
          setTypeIcon('error');
        }
        setTypeMsge(result.error);
      } else {

        let message_email = '';
        try {
          
          const data_email = {
            name: fullname ?? '',
            email: email ?? '',
            subject: 'Subcription on the Waitlist',
            message: 'You’re on the 24up. Waitlist. Pretty soon, you’ll be supercharging your workout.',
          };

          const response_email = await fetch('/api/sendmail-mailtrap', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_email)
          });

          const result_email = await response_email.json();
          if (result_email.success)
            message_email = 'SUCCESSFUL attempt to send confirmation email.';

        } catch (error) {
          message_email = 'FAILED attempt to send confirmation email.';
          console.error('Error sending email:', error);          
        }

        setIsOpenProcess(false);

        setTypeIcon('success');
        setTypeMsge('You’ve made the list! 😎 Only a few select users will get early access—get ready for exclusive updates soon!');
      }      

    } catch (error) {
      setIsOpenProcess(false);
      setTypeIcon('error');
      setTypeMsge(error.message);
    }

    setIsOpenResult(true);
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
          isOpen={isOpenResult()} 
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