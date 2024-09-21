import { createEffect } from 'solid-js';
import { trackEvent } from '~/utils/mixpanel-config';

interface SendMsgProps {
  message: string;
  properties?: Record<string, any>;
}

const SendMsgToMixPanel = ({ message, properties = {} }: SendMsgProps) => {
  createEffect(() => {
    trackEvent(message, properties);
  });

  return null;
};

export default SendMsgToMixPanel;