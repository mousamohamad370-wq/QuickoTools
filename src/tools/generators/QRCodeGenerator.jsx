import { useCallback, useState } from 'react';
import QRCode from 'react-qr-code';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'QR Code Generator - QuickoTools',
    metaDescription:
      'Generate QR codes instantly from text or links using the free QR Code Generator tool from QuickoTools.',
    title: 'QR Code Generator',
    description:
      'Convert text or links into a QR code instantly with a clean and simple generator.',
    inputTitle: 'Input Text or URL',
    outputTitle: 'QR Preview',
    label: 'Text or URL',
    placeholder: 'Enter text or paste a URL here...',
    clear: 'Clear',
    loadExample: 'Load Example',
    copy: 'Copy Result',
    copied: 'Copied!',
    exampleValue: 'https://quickotools.web.app',
    emptyState: 'Enter text or a link to generate your QR code.',
    resultPlaceholder: 'Your QR code will appear here after you enter text or a link.',
    infoTitle: 'What is a QR Code Generator?',
    infoText:
      'A QR code generator turns text, links, and other content into a scannable QR code that can be used on websites, print materials, menus, forms, and more.'
  },
  ar: {
    metaTitle: 'مولد QR Code - QuickoTools',
    metaDescription:
      'أنشئ رموز QR فورًا من النصوص أو الروابط باستخدام أداة مولد QR Code المجانية من QuickoTools.',
    title: 'مولد QR Code',
    description:
      'حوّل النص أو الروابط إلى رمز QR فورًا باستخدام أداة بسيطة وسريعة.',
    inputTitle: 'النص أو الرابط',
    outputTitle: 'معاينة QR',
    label: 'النص أو الرابط',
    placeholder: 'أدخل النص أو ألصق الرابط هنا...',
    clear: 'مسح',
    loadExample: 'تجربة مثال',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    exampleValue: 'https://quicko-tools.web.app',
    emptyState: 'أدخل نصًا أو رابطًا لإنشاء رمز QR.',
    resultPlaceholder: 'سيظهر رمز QR هنا بعد إدخال نص أو رابط.',
    infoTitle: 'ما هو مولد QR Code؟',
    infoText:
      'يقوم مولد QR Code بتحويل النصوص والروابط وغيرها من المحتوى إلى رمز QR قابل للمسح، ويمكن استخدامه في المواقع والمطبوعات والقوائم والنماذج وغير ذلك.'
  }
};

function QRCodeGenerator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setCopied(false);
  }, [currentContent.exampleValue]);

  const handleCopy = useCallback(async () => {
    if (!inputText.trim()) return;

    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [inputText]);

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">QuickoTools</span>
          <h1 className="tool-shell-title">{currentContent.title}</h1>
          <p className="tool-shell-description">{currentContent.description}</p>
        </div>

        <section className="tool-two-column-grid">
          <section className="tool-panel">
            <div className="tool-panel-top">
              <div className="tool-panel-heading">
                <h2 className="tool-panel-title">{currentContent.inputTitle}</h2>
              </div>

              <div className="tool-panel-actions">
                <button
                  type="button"
                  className="tool-action-button tool-action-button-primary"
                  onClick={handleLoadExample}
                >
                  {currentContent.loadExample}
                </button>

                <button
                  type="button"
                  className="tool-action-button tool-action-button-secondary"
                  onClick={handleClear}
                  disabled={!inputText}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="qr-code-input">
                {currentContent.label}
              </label>

              <textarea
                id="qr-code-input"
                value={inputText}
                onChange={handleChange}
                placeholder={currentContent.placeholder}
                className="tool-textarea"
                aria-label={currentContent.label}
              />
            </div>

            {!inputText.trim() && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}
          </section>

          <section className="tool-panel">
            <div className="tool-panel-top">
              <div className="tool-panel-heading">
                <h2 className="tool-panel-title">{currentContent.outputTitle}</h2>
              </div>

              <div className="tool-panel-actions">
                <button
                  type="button"
                  className="tool-action-button tool-action-button-primary"
                  onClick={handleCopy}
                  disabled={!inputText.trim()}
                >
                  {currentContent.copy}
                </button>
              </div>
            </div>

            <div className="tool-result-box">
              <div
                style={{
                  minHeight: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {inputText.trim() ? (
                  <QRCode value={inputText} size={220} />
                ) : (
                  <p className="tool-result-text tool-result-placeholder">
                    {currentContent.resultPlaceholder}
                  </p>
                )}
              </div>
            </div>

            {copied && (
              <p className="tool-helper-text tool-helper-text-success">
                {currentContent.copied}
              </p>
            )}
          </section>
        </section>

        <section className="tool-panel">
          <div className="tool-panel-heading">
            <h2 className="tool-panel-title">{currentContent.infoTitle}</h2>
          </div>
          <p className="tool-helper-text">{currentContent.infoText}</p>
        </section>
      </section>
    </main>
  );
}

export default QRCodeGenerator;