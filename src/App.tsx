import React, { useState, useEffect } from 'react';

function App() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestNotification = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        alert('Notifikasi berhasil diaktifkan!');
      }
    } else {
      alert('Browser kamu tidak mendukung notifikasi.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '30px',
        borderRadius: '16px',
        border: '1px solid #334155',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#38bdf8' }}>
          🎯 Fokusroom App
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
          Sistem Notifikasi & Agenda Terintegrasi
        </p>

        <div style={{
          backgroundColor: '#0f172a',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '20px',
          border: '1px solid #334155'
        }}>
          Status Notifikasi: <strong style={{ color: permission === 'granted' ? '#4ade80' : '#f87171' }}>
            {permission === 'granted' ? 'Aktif 🔔' : 'Belum Aktif 🔕'}
          </strong>
        </div>

        {permission !== 'granted' && (
          <button
            onClick={requestNotification}
            style={{
              backgroundColor: '#0284c7',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Aktifkan Notifikasi Push
          </button>
        )}
      </div>
    </div>
  );
}

export default App;