import mixpanel from "mixpanel-browser";

const API_TOKEN = import.meta.env.MIXPANEL_API_KEY ?? '';

mixpanel.init(API_TOKEN, {
  debug: true,
  track_pageview: false,
  persistence: "localStorage",
});

export default mixpanel;