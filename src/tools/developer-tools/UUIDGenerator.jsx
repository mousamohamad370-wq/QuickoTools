import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'UUID Generator - QuickoTools',
    metaDescription:
      'Generate random UUIDs instantly for development and databases with the free UUID Generator tool from QuickoTools.',
    title: 'UUID Generator',
    description:
      'Generate a random UUID instantly for development, APIs, and databases.',
    inputTitle: 'Generator Controls',
    outputTitle: 'Generated UUID',
    placeholder: 'Your generated UUID will appear here.',
    generate: 'Generate UUID',
    copy: 'Copy Result',
    clear: 'Clear',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleValue: '550e8400-e29b-41d4-a716-446655440000',
    emptyState: 'Generate a UUID to see the result here.',
    infoTitle: 'What is a UUID?',
    infoText:
      'A UUID is a universally unique identifier used in software systems, databases, APIs, and distributed applications to create unique values.'
  },
  ar: {
    metaTitle: 'مولد UUID - QuickoTools',
    metaDescription:
      'أنشئ UUID عشوائيًا فورًا للاستخدام في البرمجة وقواعد البيانات باستخدام أداة مولد UUID المجانية من QuickoTools.',
    title: 'مولد UUID',
    description:
      'أنشئ UUID عشوائيًا فورًا للاستخدام في البرمجة وواجهات البرمجة وقواعد البيانات.',
    inputTitle: 'أدوات التوليد',
    outputTitle: 'UUID الناتج',
    placeholder: 'ستظهر قيمة UUID هنا.',
    generate: 'إنشاء UUID',
    copy: 'نسخ النتيجة',
    clear: 'مسح',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleValue: '550e8400-e29b-41d4-a716-446655440000',
    emptyState: 'أنشئ UUID لعرض النتيجة هنا.',
    infoTitle: 'ما هو UUID؟',
    infoText:
      'UUID هو معرّف فريد عالميًا يُستخدم في الأنظمة البرمجية وقواعد البيانات وواجهات البرمجة والتطبيقات الموزعة لإنشاء قيم فريدة.'
  }
};

function UUIDGenerator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [uuid, setUuid] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleGenerate = useCallback(() => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!uuid) return;

    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [uuid]);

  const handleClear = useCallback(() => {
    setUuid('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setUuid(currentContent.exampleValue);
    setCopied(false);
  }, [currentContent.exampleValue]);

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">QuickoTools</span>
          <h1 className="tool-shell-title">{currentContent.title}</h1>
          <p className="tool-shell-description">{currentContent.description}</p>
        </div>

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
                disabled={!uuid}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleGenerate}
            >
              {currentContent.generate}
            </button>
          </div>

          {!uuid && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {copied && (
            <p className="tool-helper-text tool-helper-text-success">
              {currentContent.copied}
            </p>
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
                disabled={!uuid}
              >
                {currentContent.copy}
              </button>
            </div>
          </div>

          <div className="tool-result-box">
            <p
              className={`tool-result-text ${
                !uuid ? 'tool-result-placeholder' : ''
              }`}
              style={{ wordBreak: 'break-all' }}
            >
              {uuid || currentContent.placeholder}
            </p>
          </div>
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

export default UUIDGenerator;