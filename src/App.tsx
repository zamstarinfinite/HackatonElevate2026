// @ts-ignore
import MiBolsillo from './mi-bolsillo/MiBolsillo';
import { useEffect, useState } from 'react';

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 2400);
    const doneTimer = window.setTimeout(onDone, 2920);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        background: '#05297A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity .5s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="dof-splash-content">
        <div className="dof-stack" aria-hidden="true">
          {[0, 1, 2, 3].map(index => (
            <span
              key={index}
              className="dof-stack-block"
              style={{ '--stack-index': index } as React.CSSProperties}
            />
          ))}
        </div>
        <span className="dof-splash-name">DoFinance</span>
      </div>
    </div>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(() => {
    return sessionStorage.getItem('splash-seen') === '1';
  });

  const handleSplashDone = () => {
    sessionStorage.setItem('splash-seen', '1');
    setSplashDone(true);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A1A4A',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 430,
        height: '100dvh',
        maxHeight: 900,
        overflow: 'hidden',
      }}>
        <MiBolsillo showStatusBar={true} trashMode="hover" />
        {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      </div>
    </div>
  );
}
