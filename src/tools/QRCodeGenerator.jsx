import { useState } from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator() {
  const [text, setText] = useState('');

  return (
    <main style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          QR Code Generator
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          Convert text or links into a QR code instantly.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
            }}
          >
            <label
              style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '12px'
              }}
            >
              Text or URL
            </label>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter text or paste a URL here..."
              style={{
                width: '100%',
                minHeight: '180px',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                resize: 'vertical',
                outline: 'none',
                fontSize: '16px',
                lineHeight: '1.6'
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
              textAlign: 'center'
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
              QR Preview
            </h2>

            <div
              style={{
                minHeight: '256px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                padding: '20px'
              }}
            >
              {text.trim() ? (
                <QRCode value={text} size={220} />
              ) : (
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Your QR code will appear here after you enter text or a link.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default QRCodeGenerator;