import { createSignal, createEffect } from 'solid-js';
import type { TUserWaitList } from '~/types';

const ViewUWL = () => {
  const [uwl, setUwl] = createSignal<TUserWaitList[]>([]);

  createEffect(() => {
    const fetchData = async () => {
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
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Waitlist</p>
      <ul>
        {uwl().map((item, index) => (
          <li key={index}>{item.email} - {item.fullname}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUWL;