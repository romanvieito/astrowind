import { createEffect } from 'solid-js';
import mixpanel from "mixpanel-browser";

interface SendMsgProps {
  apitoken: string;
  message: string;
}

const SendMsgToMixPanel = ({apitoken, message}:SendMsgProps) => {

  createEffect(() => {
    mixpanel.init(apitoken, {
      debug: true,
      track_pageview: false,
      persistence: "localStorage",
    });

    mixpanel.track(message, {
    }, function(err) {
      if (err) {
        console.error('Error al enviar evento a mixpanel:', err);
      } else {
        console.log('Evento enviado a mixpanel');
      }
    });    
  }, []);
  return (
    <></>
  );
};

export default SendMsgToMixPanel;