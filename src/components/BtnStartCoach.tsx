import { trackEvent } from '~/utils/mixpanel-config';

interface ButtonProps {
  fullname: string | null | undefined;
  email: string | null | undefined
}

const ButtonSC = ({ fullname, email }: ButtonProps) => {

  const handleClick = () => {
    trackEvent("Start Coach Click Button", { fullname, email });
    window.location.href = '/aicoach';
  };

  return (
    <div>
      <button
        data-gtm-event="startCoachClickButton"
        className="w-full sm:mb-0 btn-primary"
        onClick={handleClick}>
        Start Coach
      </button>
    </div>
  );
};

export default ButtonSC;