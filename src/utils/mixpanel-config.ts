import mixpanel from "mixpanel-browser";

// Initialize Mixpanel with your project token
mixpanel.init('YOUR_MIXPANEL_TOKEN', { debug: true });

// Helper function for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (mixpanel && typeof mixpanel.track === 'function') {
    mixpanel.track(eventName, properties);
  } else {
    console.error('Mixpanel not initialized properly');
  }
};

export default mixpanel;