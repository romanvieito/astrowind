import mixpanel from "mixpanel-browser";

const API_TOKEN = import.meta.env.MIXPANEL_API_KEY ?? '';

mixpanel.init(API_TOKEN, {
  debug: import.meta.env.DEV, // Only enable debug in development
  track_pageview: true, // Enable automatic pageview tracking
  persistence: "localStorage",
});

// Helper function for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  mixpanel.track(eventName, properties, (err) => {
    if (err) {
      console.error('Error sending event to Mixpanel:', err);
    } else {
      console.log('Event sent to Mixpanel:', eventName);
    }
  });
};

export default mixpanel;