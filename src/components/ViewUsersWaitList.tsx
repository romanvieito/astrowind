import { createSignal, createEffect } from 'solid-js';
import type { TUserWaitList } from '~/types';

interface ViewProps {
  email?: string;
}

const ViewUWL = ({email}:ViewProps) => {

  const [uwl, setUwl] = createSignal<TUserWaitList>();
  const [numbWaitList, setNumbWaitList] = createSignal<number>(0);

  createEffect(() => {
    const fetchData = async () => {

      const data = { email: email };
    
      try {
        const response = await fetch('/api/getuserswaitlistbyemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        
        });

        const result = await response.json() as TUserWaitList;

        const n = 200 + parseInt(result.id);
        setNumbWaitList(n);

        setUwl(result);   
  
      } catch (error) { /* empty */ }
    };
    fetchData();
  }, []);

  return (
    <div>
     {uwl() && 
        (<span className='font-bold leading-tighter tracking-tighter font-heading text-heading text-2xl'>
          You’re #{numbWaitList()} on the Waitlist
         </span>)} 
    </div>
  );
};

export default ViewUWL;