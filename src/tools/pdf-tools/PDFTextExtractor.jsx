import { useCallback, useMemo, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

GlobalWorkerOptions.workerSrc = pdfWorker;

const content = {
  en: {
    metaTitle: 'PDF Text Extractor - QuickoTools',
    metaDescription:
      'Upload a PDF file and extract its text instantly with the free PDF Text Extractor tool from QuickoTools.',
    title: 'PDF Text Extractor',
    description:
      'Upload a PDF file and extract its readable text instantly.',
    inputTitle: 'Upload PDF',
    outputTitle: 'Extracted Text',
    inputLabel: 'Choose PDF File',
    upload: 'Choose PDF File',
    clear: 'Clear',
    extractText: 'Extract Text',
    copy: 'Copy Result',
    copied: 'Copied!',
    download: 'Download TXT',
    emptyState: 'Upload a PDF file to extract its text.',
    outputPlaceholder: 'The extracted text will appear here.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool reads a PDF file and extracts the text content that can be selected and copied from the document.',
    fileNameLabel: 'Selected File',
    noFile: 'No file selected',
    invalidFile: 'Please upload a valid PDF file.',
    loadingStatus: 'Extracting text...',
    noTextFound: 'No readable text was found in this PDF.',
    pagesLabel: 'Pages Processed'
  },
  ar: {
    metaTitle: 'استخراج النص من PDF - QuickoTools',
    metaDescription:
      'ارفع ملف PDF واستخرج النص منه فورًا باستخدام أداة استخراج النص من PDF المجانية من QuickoTools.',
    title: 'استخراج النص من PDF',
    description:
      'ارفع ملف PDF واستخرج النص القابل للقراءة منه فورًا.',
    inputTitle: 'رفع ملف PDF',
    outputTitle: 'النص المستخرج',
    inputLabel: 'اختر ملف PDF',
    upload: 'اختر ملف PDF',
    clear: 'مسح',
    extractText: 'استخراج النص',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    download: 'تنزيل TXT',
    emptyState: 'ارفع ملف PDF لاستخراج النص منه.',
    outputPlaceholder: 'سيظهر النص المستخرج هنا.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بقراءة ملف PDF واستخراج النص الذي يمكن تحديده ونسخه من المستند.',
    fileNameLabel: 'الملف المحدد',
    noFile: 'لا يوجد ملف محدد',
    invalidFile: 'يرجى رفع ملف PDF صالح.',
    loadingStatus: 'جارٍ استخراج النص...',
    noTextFound: 'لم يتم العثور على نص قابل للقراءة داخل هذا الملف.',
    pagesLabel: 'الصفحات المعالجة'
  }
};

function PDFTextExtractor({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [processedPages, setProcessedPages] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const selectedFileName = useMemo(() => {
    return selectedFile ? selectedFile.name : currentContent.noFile;
  }, [selectedFile, currentContent.noFile]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (file.type !== 'application/pdf') {
        setSelectedFile(null);
        setExtractedText('');
        setProcessedPages('');
        setError(currentContent.invalidFile);
        setCopied(false);
        return;
      }

      setSelectedFile(file);
      setExtractedText('');
      setProcessedPages('');
      setError('');
      setCopied(false);
    },
    [currentContent.invalidFile]
  );

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setExtractedText('');
    setProcessedPages('');
    setError('');
    setCopied(false);
  }, []);

  const handleExtractText = useCallback(async () => {
    if (!selectedFile) return;

    setIsExtracting(true);
    setExtractedText('');
    setProcessedPages('');
    setError('');
    setCopied(false);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      const pageTexts = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (pageText) {
          pageTexts.push(pageText);
        }
      }

      const finalText = pageTexts.join('\n\n');

      setProcessedPages(String(pdf.numPages));

      if (!finalText.trim()) {
        setExtractedText('');
        setError(currentContent.noTextFound);
        return;
      }

      setExtractedText(finalText);
      setError('');
    } catch {
      setExtractedText('');
      setProcessedPages('');
      setError(currentContent.invalidFile);
    } finally {
      setIsExtracting(false);
    }
  }, [
    selectedFile,
    currentContent.invalidFile,
    currentContent.noTextFound
  ]);

  const handleCopy = useCallback(async () => {
    if (!extractedText || error) return;

    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [extractedText, error]);

  const handleDownload = useCallback(() => {
    if (!extractedText || error || !selectedFile) return;

    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^.]+$/, '') || 'document';

    link.href = url;
    link.download = `${baseName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [extractedText, error, selectedFile]);

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
                  className="tool-action-button tool-action-button-secondary"
                  onClick={handleClear}
                  disabled={!selectedFile && !extractedText}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="pdf-text-extractor-input">
                {currentContent.inputLabel}
              </label>

              <div className="tool-file-upload">
                <input
                  id="pdf-text-extractor-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="tool-file-input"
                />

                <label
                  htmlFor="pdf-text-extractor-input"
                  className="tool-file-button"
                >
                  {currentContent.upload}
                </label>
              </div>
            </div>

            <div className="tool-field">
              <p className="tool-label">{currentContent.fileNameLabel}</p>
              <div className="tool-result-box">
                <p
                  className={`tool-result-text ${
                    !selectedFile ? 'tool-result-placeholder' : ''
                  }`}
                >
                  {selectedFileName}
                </p>
              </div>
            </div>

            {processedPages && (
              <div className="tool-field">
                <p className="tool-label">{currentContent.pagesLabel}</p>
                <div className="tool-result-box">
                  <p className="tool-result-text">{processedPages}</p>
                </div>
              </div>
            )}

            <div className="tool-panel-actions tool-actions-row">
              <button
                type="button"
                className="tool-action-button tool-action-button-primary"
                onClick={handleExtractText}
                disabled={!selectedFile || isExtracting}
              >
                {currentContent.extractText}
              </button>
            </div>

            {!selectedFile && !error && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}

            {isExtracting && (
              <p className="tool-helper-text">{currentContent.loadingStatus}</p>
            )}

            {copied && (
              <p className="tool-helper-text tool-helper-text-success">
                {currentContent.copied}
              </p>
            )}

            {error && (
              <p className="tool-helper-text tool-helper-text-error">{error}</p>
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
                  disabled={!extractedText || Boolean(error)}
                >
                  {currentContent.copy}
                </button>

                <button
                  type="button"
                  className="tool-action-button tool-action-button-secondary"
                  onClick={handleDownload}
                  disabled={!extractedText || Boolean(error)}
                >
                  {currentContent.download}
                </button>
              </div>
            </div>

            <div className="tool-result-box">
              <pre
                className={`tool-result-text tool-code-result ${
                  !extractedText && !error ? 'tool-result-placeholder' : ''
                } ${error ? 'tool-helper-text-error' : ''}`}
              >
                {error || extractedText || currentContent.outputPlaceholder}
              </pre>
            </div>
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

export default PDFTextExtractor;