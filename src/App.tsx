import React from 'react'

function App() {
  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      textAlign: 'center', 
      padding: '50px 20px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🚀 Fokusroom Web</h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '500px' }}>
        Sistem Agenda & Push Notification Vercel Cron Job siap digunakan!
      </p>
      <div style={{
        marginTop: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155'
      }}>
        <p style={{ margin: 0, color: '#38bdf8' }}>Status: Online & Connected</p>
      </div>
    </div>
  )
}

export default App