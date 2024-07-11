import { createSignal, createEffect } from 'solid-js';
import type { TUserWaitList } from '~/types';

interface ViewProps {
  email?: string;
}

const ViewUWL = ({email}:ViewProps) => {

  const [uwl, setUwl] = createSignal<TUserWaitList[]>([]);

  createEffect(() => {
    const fetchData = async () => {

      const data = {
        email: 'ooo'
      };
    
      try {
        const response = await fetch('/api/getuserswaitlistbyemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
        console.log('result:', result);

        /*
        if(result.error!) {
          if(result.error === 'The user already exists') {
            setTypeIcon('info');
          } else {
            setTypeIcon('error');
          }
          setTypeMsge(result.error);
        } else {
          setTypeIcon('success');
          setTypeMsge('You have been successfully added to the waitlist');        
        }
        */      
  
      } catch (error) {
        /*
        setTypeIcon('error');
        setTypeMsge(error.message);
        */
      }





      /*
      try {
        const response = await fetch('/api/getuserswaitlist');
        const data = await response.json();
        const userwl: TUserWaitList[] = [];

        console.log('data from client:', data);
        
        if (data) {
          data.forEach(item => {
            userwl.push({
              id: item.id,
              email: item.email,
              fullname: item.fullname
            });
          });        
        }
        setUwl(userwl);
      } catch (error) {
        console.error('Error fetching data:', error);
      }*/
    };
    fetchData();
  }, []);

  return (
    <div>
      <span className='font-bold leading-tighter tracking-tighter font-heading text-heading text-2xl'>
        You’re ? on the Waitlist
      </span>
    </div>
  );
};

export default ViewUWL;