import { useCallback, useMemo, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

GlobalWorkerOptions.workerSrc = pdfWorker;

const content = {
  en: {
    metaTitle: 'PDF Metadata Viewer - QuickoTools',
    metaDescription:
      'Upload a PDF file and view its metadata such as title, author, creator, producer, and creation date with the free PDF Metadata Viewer from QuickoTools.',
    title: 'PDF Metadata Viewer',
    description:
      'Upload a PDF file and view its metadata such as title, author, creator, producer, and creation date.',
    inputTitle: 'Upload PDF',
    outputTitle: 'PDF Metadata',
    inputLabel: 'Choose PDF File',
    upload: 'Choose PDF File',
    clear: 'Clear',
    readMetadata: 'Read Metadata',
    emptyState: 'Upload a PDF file to view its metadata.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool reads the embedded metadata inside a PDF file and shows common document properties such as title, author, creator, producer, and page count.',
    fileNameLabel: 'Selected File',
    noFile: 'No file selected',
    invalidFile: 'Please upload a valid PDF file.',
    titleLabel: 'Title',
    authorLabel: 'Author',
    subjectLabel: 'Subject',
    keywordsLabel: 'Keywords',
    creatorLabel: 'Creator',
    producerLabel: 'Producer',
    creationDateLabel: 'Creation Date',
    modificationDateLabel: 'Modification Date',
    pagesLabel: 'Total Pages',
    notAvailable: 'Not available',
    loadingStatus: 'Reading file...'
  },
  ar: {
    metaTitle: 'عرض معلومات PDF - QuickoTools',
    metaDescription:
      'ارفع ملف PDF واعرض معلوماته مثل العنوان والمؤلف والمنشئ والمنتج وتاريخ الإنشاء باستخدام أداة عرض معلومات PDF المجانية من QuickoTools.',
    title: 'عرض معلومات PDF',
    description:
      'ارفع ملف PDF واعرض معلوماته مثل العنوان والمؤلف والمنشئ والمنتج وتاريخ الإنشاء.',
    inputTitle: 'رفع ملف PDF',
    outputTitle: 'معلومات ملف PDF',
    inputLabel: 'اختر ملف PDF',
    upload: 'اختر ملف PDF',
    clear: 'مسح',
    readMetadata: 'قراءة المعلومات',
    emptyState: 'ارفع ملف PDF لعرض معلوماته.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بقراءة المعلومات المضمنة داخل ملف PDF وعرض خصائص المستند الشائعة مثل العنوان والمؤلف والمنشئ والمنتج وعدد الصفحات.',
    fileNameLabel: 'الملف المحدد',
    noFile: 'لا يوجد ملف محدد',
    invalidFile: 'يرجى رفع ملف PDF صالح.',
    titleLabel: 'العنوان',
    authorLabel: 'المؤلف',
    subjectLabel: 'الموضوع',
    keywordsLabel: 'الكلمات المفتاحية',
    creatorLabel: 'المنشئ',
    producerLabel: 'المنتج',
    creationDateLabel: 'تاريخ الإنشاء',
    modificationDateLabel: 'تاريخ التعديل',
    pagesLabel: 'إجمالي الصفحات',
    notAvailable: 'غير متوفر',
    loadingStatus: 'جارٍ قراءة الملف...'
  }
};

function formatPdfDate(rawValue, fallbackText) {
  if (!rawValue || typeof rawValue !== 'string') return fallbackText;

  const cleaned = rawValue.startsWith('D:') ? rawValue.slice(2) : rawValue;
  const match = cleaned.match(
    /^(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?/
  );

  if (!match) return rawValue;

  const year = match[1];
  const month = match[2] || '01';
  const day = match[3] || '01';
  const hour = match[4] || '00';
  const minute = match[5] || '00';
  const second = match[6] || '00';

  const date = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}`
  );

  if (Number.isNaN(date.getTime())) return rawValue;

  return date.toLocaleString();
}

function PDFMetadataViewer({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState('');
  const [isReading, setIsReading] = useState(false);

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
        setMetadata(null);
        setError(currentContent.invalidFile);
        return;
      }

      setSelectedFile(file);
      setMetadata(null);
      setError('');
    },
    [currentContent.invalidFile]
  );

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setMetadata(null);
    setError('');
  }, []);

  const handleReadMetadata = useCallback(async () => {
    if (!selectedFile) return;

    setIsReading(true);
    setError('');
    setMetadata(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      const meta = await pdf.getMetadata();

      const info = meta?.info || {};
      const metadataData = meta?.metadata;

      const getMetaValue = (key) => {
        if (metadataData && typeof metadataData.get === 'function') {
          return metadataData.get(key);
        }
        return null;
      };

      setMetadata({
        title: info.Title || getMetaValue('dc:title') || '',
        author: info.Author || getMetaValue('dc:creator') || '',
        subject: info.Subject || getMetaValue('dc:description') || '',
        keywords: info.Keywords || '',
        creator: info.Creator || '',
        producer: info.Producer || '',
        creationDate: formatPdfDate(
          info.CreationDate,
          currentContent.notAvailable
        ),
        modificationDate: formatPdfDate(
          info.ModDate,
          currentContent.notAvailable
        ),
        pages: pdf.numPages
      });
    } catch {
      setError(currentContent.invalidFile);
    } finally {
      setIsReading(false);
    }
  }, [selectedFile, currentContent.invalidFile, currentContent.notAvailable]);

  const infoCards = useMemo(() => {
    if (!metadata) return [];

    return [
      {
        key: 'title',
        label: currentContent.titleLabel,
        value: metadata.title || currentContent.notAvailable
      },
      {
        key: 'author',
        label: currentContent.authorLabel,
        value: metadata.author || currentContent.notAvailable
      },
      {
        key: 'subject',
        label: currentContent.subjectLabel,
        value: metadata.subject || currentContent.notAvailable
      },
      {
        key: 'keywords',
        label: currentContent.keywordsLabel,
        value: metadata.keywords || currentContent.notAvailable
      },
      {
        key: 'creator',
        label: currentContent.creatorLabel,
        value: metadata.creator || currentContent.notAvailable
      },
      {
        key: 'producer',
        label: currentContent.producerLabel,
        value: metadata.producer || currentContent.notAvailable
      },
      {
        key: 'creationDate',
        label: currentContent.creationDateLabel,
        value: metadata.creationDate || currentContent.notAvailable
      },
      {
        key: 'modificationDate',
        label: currentContent.modificationDateLabel,
        value: metadata.modificationDate || currentContent.notAvailable
      },
      {
        key: 'pages',
        label: currentContent.pagesLabel,
        value: String(metadata.pages ?? currentContent.notAvailable)
      }
    ];
  }, [metadata, currentContent]);

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
                  disabled={!selectedFile && !metadata}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="pdf-metadata-viewer-input">
                {currentContent.inputLabel}
              </label>

              <div className="tool-file-upload">
                <input
                  id="pdf-metadata-viewer-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="tool-file-input"
                />

                <label
                  htmlFor="pdf-metadata-viewer-input"
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
                onClick={handleReadMetadata}
                disabled={!selectedFile || isReading}
              >
                {currentContent.readMetadata}
              </button>
            </div>

            {!selectedFile && !error && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}

            {isReading && (
              <p className="tool-helper-text">{currentContent.loadingStatus}</p>
            )}

            {error && (
              <p className="tool-helper-text tool-helper-text-error">{error}</p>
            )}
          </section>

          <section className="tool-panel">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.outputTitle}</h2>
            </div>

            {metadata ? (
              <div className="tool-info-grid">
                {infoCards.map((item) => (
                  <div key={item.key} className="tool-info-card">
                    <h3 className="tool-info-title">{item.label}</h3>
                    <p className="tool-info-text">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tool-result-box">
                <p className="tool-result-text tool-result-placeholder">
                  {currentContent.emptyState}
                </p>
              </div>
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

export default PDFMetadataViewer;