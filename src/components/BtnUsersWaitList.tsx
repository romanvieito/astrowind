import { createSignal } from 'solid-js';
import { sendMail } from '~/utils/mail-mailtrap';
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
        if(result.error === 'The user already exists') {
          setTypeIcon('info');
        } else {
          setTypeIcon('error');
        }
        setTypeMsge(result.error);
      } else {
        /*
        const data_email = {
          service_id: '*',
          template_id: '*',
          user_id: '*',
          template_params: {
            to_name: fullname,
            from_name: 'AbsIn5 Team',
            message: 'You’re on the AbsIn5 Waitlist. Pretty soon, you’ll be supercharging your workout.',
            reply_to: email
          }
        };
      
        let message_email = '';
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_email)
        })
        .then(response => response.text())
        .then(result => {
          message_email = 'SUCCESSFUL attempt to send confirmation email.';
          console.log('Email sent successfully:', result);
        })
        .catch(error => {
          message_email = 'FAILED attempt to send confirmation email.';
          console.error('Error sending email:', error);
        });
        */

        let message_email = '';
        try {
          const result = await sendMail(
            fullname ?? '', 
            email ?? '', 
            'Subcription on the Waitlist',
            'You’re on the AbsIn5 Waitlist. Pretty soon, you’ll be supercharging your workout.');
          console.log('result', result);
        } catch (error) {
          message_email = 'FAILED attempt to send confirmation email.';
          console.error('Error sending email:', error);          
        }

        setIsOpenProcess(false);

        setTypeIcon('success');
        setTypeMsge('You have been successfully added to the waitlist.|'+message_email);
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