
import React, { createContext, useContext, useMemo } from "react";
import { useLocation, useInRouterContext } from "react-router-dom";
// Analytics services removed - provider preserved for cookie consent compatibility

type AnalyticsContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, unknown>) => void;
};

const noopTracker: AnalyticsContextType["trackEvent"] = (eventName, eventData) => {
  console.log(`Analytics Event: ${eventName}`, eventData);
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: noopTracker,
});

export const useAnalytics = () => useContext(AnalyticsContext);

const RouterAnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const value = useMemo<AnalyticsContextType>(() => ({
    trackEvent: (eventName: string, eventData?: Record<string, unknown>) => {
      console.log(`Analytics Event: ${eventName}`, {
        ...eventData,
        path: location.pathname,
      });
      // In a real implementation, you would send this to a backend service
    },
  }), [location.pathname]);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isRouterReady = useInRouterContext();

  if (!isRouterReady) {
    console.warn('AnalyticsProvider rendered outside Router context; falling back to no-op tracking.');
    return (
      <AnalyticsContext.Provider value={{ trackEvent: noopTracker }}>
        {children}
      </AnalyticsContext.Provider>
    );
  }

  return <RouterAnalyticsProvider>{children}</RouterAnalyticsProvider>;
};
