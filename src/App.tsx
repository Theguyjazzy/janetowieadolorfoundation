import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryReaderPage } from './pages/StoryReaderPage';
import { FoundersPage } from './pages/FoundersPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { DonatePage } from './pages/DonatePage';
import { AdminPage } from './pages/AdminPage';
import { getLenis, initLenisSync, triggerWovenVeilTransition } from './lib/motion';

function normalizePath(rawPathname: string, rawSearch: string): { path: string; search: string } {
  const path = rawPathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(rawSearch);

  if (path === '/index.html') return { path: '/', search: rawSearch };
  if (path === '/stories.html') return { path: '/stories', search: '' };
  if (path === '/founders.html') return { path: '/founders', search: '' };
  if (path === '/get-involved.html') return { path: '/get-involved', search: '' };
  if (path === '/donate.html') return { path: '/donate', search: rawSearch };
  if (path === '/admin.html') return { path: '/admin', search: '' };
  if (path === '/post.html' && params.get('slug')) {
    return { path: `/stories/${encodeURIComponent(params.get('slug')!)}`, search: '' };
  }
  if (path === '/story-adaeze.html') return { path: '/stories', search: '' };
  if (path === '/story-ngozi.html') return { path: '/stories', search: '' };
  if (path === '/story-chiamaka.html') return { path: '/stories', search: '' };
  if (path === '/story-blessing.html') return { path: '/stories', search: '' };

  return { path, search: rawSearch };
}

export const App: React.FC = () => {
  const veilRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [locationState, setLocationState] = useState(() =>
    normalizePath(window.location.pathname, window.location.search),
  );
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 4400);
  }, []);

  useEffect(() => {
    const cleanupLenis = initLenisSync();
    return cleanupLenis;
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setLocationState(normalizePath(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const scrollToHash = useCallback((hash?: string) => {
    if (!hash) return;
    window.setTimeout(() => {
      const target = document.querySelector(hash);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -76 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  }, []);

  const handleNavigate = useCallback(
    (targetWithQuery: string, hash?: string) => {
      const [rawPath, rawQuery] = targetWithQuery.split('?');
      const nextSearch = rawQuery ? `?${rawQuery}` : '';
      const nextPath = rawPath || '/';

      // Same-page anchor scroll
      if (nextPath === locationState.path && hash) {
        scrollToHash(hash);
        return;
      }

      // Cross-route Woven Veil Transition (MOT-02)
      triggerWovenVeilTransition(veilRef.current, () => {
        window.history.pushState({}, '', `${nextPath}${nextSearch}${hash || ''}`);
        setLocationState({ path: nextPath, search: nextSearch });
        if (hash) {
          scrollToHash(hash);
        }
      });
    },
    [locationState.path, scrollToHash],
  );

  useEffect(() => {
    const isAdmin = locationState.path === '/admin';
    document.title = isAdmin
      ? 'Admin | JOF'
      : 'JOF | Janet Owieadolor Foundation — Restoring Hope & Dignity';
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (isAdmin) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, nofollow';
    } else if (robotsMeta) {
      robotsMeta.remove();
    }
  }, [locationState.path]);

  const searchParams = new URLSearchParams(locationState.search);
  const amountParam = Number(searchParams.get('amount') || 0);

  let pageView: React.ReactNode;
  if (locationState.path === '/stories') {
    pageView = <StoriesPage onNavigate={handleNavigate} />;
  } else if (locationState.path.startsWith('/stories/')) {
    const slug = locationState.path.replace('/stories/', '');
    pageView = <StoryReaderPage slug={slug} onNavigate={handleNavigate} />;
  } else if (locationState.path === '/founders') {
    pageView = <FoundersPage onNavigate={handleNavigate} />;
  } else if (locationState.path === '/get-involved') {
    pageView = <GetInvolvedPage onNavigate={handleNavigate} showToast={showToast} />;
  } else if (locationState.path === '/donate') {
    pageView = <DonatePage initialAmount={amountParam || undefined} showToast={showToast} />;
  } else if (locationState.path === '/admin') {
    pageView = <AdminPage onNavigate={handleNavigate} showToast={showToast} />;
  } else {
    pageView = <HomePage onNavigate={handleNavigate} showToast={showToast} />;
  }

  return (
    <Layout
      currentPath={locationState.path}
      onNavigate={handleNavigate}
      toast={toast}
      showToast={showToast}
      veilRef={veilRef}
    >
      {pageView}
    </Layout>
  );
};

export default App;
