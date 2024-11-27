import { trackEvent } from '~/utils/mixpanel-config';

interface ButtonProps {
  fullname: string | null | undefined;
  email: string | null | undefined;
  incase: number
}

const ButtonUWL = ({ fullname, email, incase }: ButtonProps) => {

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

  let caseclass = "w-full sm:mb-0 btn-secondary ";
  if (incase === 1)
    caseclass += "bg-blue-500 hover:bg-blue-700 text-white font-bold";
  else if (incase === 2)
    caseclass += "ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto";

  return (
    <div>
      <button
        className={caseclass}
        onClick={handleClick}>
        Start Coach
      </button>
    </div>
  );
};

export default ButtonUWL;