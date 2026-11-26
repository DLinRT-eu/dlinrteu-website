// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { setCookieConsent, getCookie, clearAnalyticsCookies } from './cookieUtils';
import { isTrackingAllowed, clearTrackingIds } from '@/services/analytics/storageUtils';

describe('consent withdrawal', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = `${c.split('=')[0].trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    sessionStorage.clear();
  });

  it('removes the visitor cookie and session id when analytics is rejected', () => {
    setCookieConsent({ analytics: true });
    document.cookie = 'dlinrt-visitor-id=abc; path=/';
    sessionStorage.setItem('dlinrt-session-id', 's1');
    setCookieConsent({ analytics: false });
    expect(getCookie('dlinrt-visitor-id')).toBeNull();
    expect(sessionStorage.getItem('dlinrt-session-id')).toBeNull();
    expect(isTrackingAllowed()).toBe(false);
  });

  it('clearTrackingIds works even after consent is already withdrawn', () => {
    setCookieConsent({ analytics: false });
    document.cookie = 'dlinrt-visitor-id=abc; path=/';
    clearTrackingIds();
    expect(getCookie('dlinrt-visitor-id')).toBeNull();
  });

  it('clearAnalyticsCookies leaves the consent cookie in place', () => {
    setCookieConsent({ analytics: false });
    clearAnalyticsCookies();
    expect(getCookie('dlinrt-cookie-consent')).not.toBeNull();
  });
});
