import { trackEvent } from '~/utils/mixpanel-config';

interface ButtonProps {
  fullname: string | null | undefined;
  email: string | null | undefined
}

const ButtonUWL = ({ fullname, email }: ButtonProps) => {

  const handleClick = () => {
    trackEvent("Start Coach Click Button", { fullname, email });
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16510475658/GlFUCOH8hMEZEIq758A9t',
        'value': 1.0,
        'currency': 'USD'
      });
    }
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

export default ButtonUWL;