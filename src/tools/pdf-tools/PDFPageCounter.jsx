import { useCallback, useMemo, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

GlobalWorkerOptions.workerSrc = pdfWorker;

const content = {
  en: {
    metaTitle: 'PDF Page Counter - QuickoTools',
    metaDescription:
      'Upload a PDF file and instantly count how many pages it contains with the free PDF Page Counter tool from QuickoTools.',
    title: 'PDF Page Counter',
    description:
      'Upload a PDF file and instantly see how many pages it contains.',
    inputTitle: 'Upload PDF',
    outputTitle: 'PDF Details',
    inputLabel: 'Choose PDF File',
    upload: 'Choose PDF File',
    clear: 'Clear',
    countPages: 'Count Pages',
    emptyState: 'Upload a PDF file to count its pages.',
    previewPlaceholder: 'PDF information will appear here.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool reads your PDF file and shows the total number of pages it contains.',
    fileNameLabel: 'Selected File',
    noFile: 'No file selected',
    invalidFile: 'Please upload a valid PDF file.',
    pagesLabel: 'Total Pages',
    fileSizeLabel: 'File Size',
    readyLabel: 'Status',
    readyValue: 'Ready to analyze'
  },
  ar: {
    metaTitle: 'عداد صفحات PDF - QuickoTools',
    metaDescription:
      'ارفع ملف PDF واعرف فورًا عدد الصفحات التي يحتويها باستخدام أداة عداد صفحات PDF المجانية من QuickoTools.',
    title: 'عداد صفحات PDF',
    description:
      'ارفع ملف PDF واعرف فورًا عدد الصفحات التي يحتويها.',
    inputTitle: 'رفع ملف PDF',
    outputTitle: 'تفاصيل الملف',
    inputLabel: 'اختر ملف PDF',
    upload: 'اختر ملف PDF',
    clear: 'مسح',
    countPages: 'عدّ الصفحات',
    emptyState: 'ارفع ملف PDF لمعرفة عدد صفحاته.',
    previewPlaceholder: 'ستظهر معلومات ملف PDF هنا.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بقراءة ملف PDF وإظهار العدد الإجمالي للصفحات التي يحتويها.',
    fileNameLabel: 'الملف المحدد',
    noFile: 'لا يوجد ملف محدد',
    invalidFile: 'يرجى رفع ملف PDF صالح.',
    pagesLabel: 'إجمالي الصفحات',
    fileSizeLabel: 'حجم الملف',
    readyLabel: 'الحالة',
    readyValue: 'جاهز للتحليل'
  }
};

function formatFileSize(bytes, language) {
  if (!bytes && bytes !== 0) return '';

  const units = language === 'ar'
    ? ['بايت', 'ك.ب', 'م.ب', 'ج.ب']
    : ['B', 'KB', 'MB', 'GB'];

  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function PDFPageCounter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [pageCount, setPageCount] = useState('');
  const [error, setError] = useState('');
  const [isCounting, setIsCounting] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const selectedFileName = useMemo(() => {
    return selectedFile ? selectedFile.name : currentContent.noFile;
  }, [selectedFile, currentContent.noFile]);

  const fileSizeText = useMemo(() => {
    return selectedFile
      ? formatFileSize(selectedFile.size, language)
      : currentContent.previewPlaceholder;
  }, [selectedFile, language, currentContent.previewPlaceholder]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (file.type !== 'application/pdf') {
        setSelectedFile(null);
        setPageCount('');
        setError(currentContent.invalidFile);
        return;
      }

      setSelectedFile(file);
      setPageCount('');
      setError('');
    },
    [currentContent.invalidFile]
  );

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setPageCount('');
    setError('');
  }, []);

  const handleCountPages = useCallback(async () => {
    if (!selectedFile) return;

    setIsCounting(true);
    setError('');
    setPageCount('');

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      setPageCount(String(pdf.numPages));
    } catch {
      setError(currentContent.invalidFile);
    } finally {
      setIsCounting(false);
    }
  }, [selectedFile, currentContent.invalidFile]);

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
                  disabled={!selectedFile && !pageCount}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="pdf-page-counter-input">
                {currentContent.inputLabel}
              </label>

              <div className="tool-file-upload">
                <input
                  id="pdf-page-counter-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="tool-file-input"
                />

                <label
                  htmlFor="pdf-page-counter-input"
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

            <div className="tool-panel-actions tool-actions-row">
              <button
                type="button"
                className="tool-action-button tool-action-button-primary"
                onClick={handleCountPages}
                disabled={!selectedFile || isCounting}
              >
                {currentContent.countPages}
              </button>
            </div>

            {!selectedFile && !error && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}

            {error && (
              <p className="tool-helper-text tool-helper-text-error">{error}</p>
            )}
          </section>

          <section className="tool-panel">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.outputTitle}</h2>
            </div>

            <div className="tool-info-grid">
              <div className="tool-info-card">
                <h3 className="tool-info-title">{currentContent.pagesLabel}</h3>
                <p className="tool-info-text">
                  {pageCount || currentContent.previewPlaceholder}
                </p>
              </div>

              <div className="tool-info-card">
                <h3 className="tool-info-title">{currentContent.fileSizeLabel}</h3>
                <p className="tool-info-text">{fileSizeText}</p>
              </div>

              <div className="tool-info-card">
                <h3 className="tool-info-title">{currentContent.readyLabel}</h3>
                <p className="tool-info-text">
                  {isCounting ? '...' : currentContent.readyValue}
                </p>
              </div>
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

export default PDFPageCounter;