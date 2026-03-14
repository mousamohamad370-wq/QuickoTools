import { useCallback, useMemo, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'PDF Merger - QuickoTools',
    metaDescription:
      'Merge multiple PDF files into one document instantly with the free PDF Merger tool from QuickoTools.',
    title: 'PDF Merger',
    description:
      'Upload multiple PDF files, arrange them in order, and merge them into one downloadable PDF document.',
    inputTitle: 'Upload PDF Files',
    outputTitle: 'Merge & Download',
    inputLabel: 'Choose PDF Files',
    upload: 'Choose PDF Files',
    clear: 'Clear',
    merge: 'Merge PDFs',
    emptyState: 'Upload two or more PDF files to merge them.',
    previewPlaceholder:
      'Your selected PDF files will appear here in the merge order.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool combines multiple PDF files into a single PDF document directly in your browser.',
    fileNameLabel: 'Selected Files',
    noFiles: 'No files selected',
    invalidFile: 'Please upload valid PDF files only.',
    mergeSuccess: 'Your merged PDF is ready and will download automatically.',
    mergeError: 'Something went wrong while merging the PDF files.',
    filesCount: 'Files selected',
    totalPages: 'Total pages',
    moveUp: 'Move Up',
    moveDown: 'Move Down',
    remove: 'Remove',
    fileLabel: 'File',
    pagesLabel: 'Pages',
    minFilesError: 'Please upload at least 2 PDF files.'
  },
  ar: {
    metaTitle: 'دمج ملفات PDF - QuickoTools',
    metaDescription:
      'ادمج عدة ملفات PDF في ملف واحد فورًا باستخدام أداة دمج ملفات PDF المجانية من QuickoTools.',
    title: 'دمج ملفات PDF',
    description:
      'ارفع عدة ملفات PDF، رتبها كما تريد، ثم ادمجها في ملف PDF واحد قابل للتنزيل.',
    inputTitle: 'رفع ملفات PDF',
    outputTitle: 'الدمج والتنزيل',
    inputLabel: 'اختر ملفات PDF',
    upload: 'اختر ملفات PDF',
    clear: 'مسح',
    merge: 'دمج ملفات PDF',
    emptyState: 'ارفع ملفي PDF أو أكثر لدمجهما.',
    previewPlaceholder: 'ستظهر ملفات PDF المحددة هنا حسب ترتيب الدمج.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بدمج عدة ملفات PDF في مستند PDF واحد مباشرة داخل المتصفح.',
    fileNameLabel: 'الملفات المحددة',
    noFiles: 'لا توجد ملفات محددة',
    invalidFile: 'يرجى رفع ملفات PDF صالحة فقط.',
    mergeSuccess: 'ملف PDF المدمج أصبح جاهزًا وسيتم تنزيله تلقائيًا.',
    mergeError: 'حدث خطأ أثناء دمج ملفات PDF.',
    filesCount: 'عدد الملفات',
    totalPages: 'إجمالي الصفحات',
    moveUp: 'تحريك للأعلى',
    moveDown: 'تحريك للأسفل',
    remove: 'إزالة',
    fileLabel: 'الملف',
    pagesLabel: 'الصفحات',
    minFilesError: 'يرجى رفع ملفي PDF على الأقل.'
  }
};

function PDFMerger({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [pdfFiles, setPdfFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMerging, setIsMerging] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const totalPages = useMemo(() => {
    return pdfFiles.reduce((sum, file) => sum + file.pageCount, 0);
  }, [pdfFiles]);

  const handleFileChange = useCallback(
    async (event) => {
      const files = Array.from(event.target.files || []);

      if (!files.length) return;

      setError('');
      setSuccess('');

      const invalidFile = files.find(
        (file) => file.type !== 'application/pdf'
      );

      if (invalidFile) {
        setError(currentContent.invalidFile);
        return;
      }

      try {
        const preparedFiles = await Promise.all(
          files.map(async (file, index) => {
            const bytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(bytes);

            return {
              id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
              name: file.name,
              size: file.size,
              pageCount: pdfDoc.getPageCount(),
              file
            };
          })
        );

        setPdfFiles(preparedFiles);
      } catch {
        setPdfFiles([]);
        setError(currentContent.invalidFile);
      }
    },
    [currentContent.invalidFile]
  );

  const handleClear = useCallback(() => {
    setPdfFiles([]);
    setError('');
    setSuccess('');
  }, []);

  const handleRemoveFile = useCallback((id) => {
    setPdfFiles((currentFiles) => currentFiles.filter((file) => file.id !== id));
    setError('');
    setSuccess('');
  }, []);

  const handleMoveUp = useCallback((index) => {
    if (index === 0) return;

    setPdfFiles((currentFiles) => {
      const updatedFiles = [...currentFiles];
      [updatedFiles[index - 1], updatedFiles[index]] = [
        updatedFiles[index],
        updatedFiles[index - 1]
      ];
      return updatedFiles;
    });

    setError('');
    setSuccess('');
  }, []);

  const handleMoveDown = useCallback((index) => {
    setPdfFiles((currentFiles) => {
      if (index === currentFiles.length - 1) return currentFiles;

      const updatedFiles = [...currentFiles];
      [updatedFiles[index], updatedFiles[index + 1]] = [
        updatedFiles[index + 1],
        updatedFiles[index]
      ];
      return updatedFiles;
    });

    setError('');
    setSuccess('');
  }, []);

  const handleMerge = useCallback(async () => {
    if (pdfFiles.length < 2) {
      setError(currentContent.minFilesError);
      setSuccess('');
      return;
    }

    setIsMerging(true);
    setError('');
    setSuccess('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of pdfFiles) {
        const fileBytes = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setSuccess(currentContent.mergeSuccess);
    } catch {
      setError(currentContent.mergeError);
      setSuccess('');
    } finally {
      setIsMerging(false);
    }
  }, [
    pdfFiles,
    currentContent.minFilesError,
    currentContent.mergeSuccess,
    currentContent.mergeError
  ]);

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
                  disabled={!pdfFiles.length && !error && !success}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="pdf-merger-input">
                {currentContent.inputLabel}
              </label>

              <div className="tool-file-upload">
                <input
                  id="pdf-merger-input"
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="tool-file-input"
                />

                <label htmlFor="pdf-merger-input" className="tool-file-button">
                  {currentContent.upload}
                </label>
              </div>
            </div>

            <div className="tool-info-grid">
              <div className="tool-info-card">
                <span className="tool-helper-text">{currentContent.filesCount}</span>
                <p className="tool-result-text">{pdfFiles.length}</p>
              </div>

              <div className="tool-info-card">
                <span className="tool-helper-text">{currentContent.totalPages}</span>
                <p className="tool-result-text">{totalPages}</p>
              </div>
            </div>

            {!pdfFiles.length && !error && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}

            {error && (
              <p className="tool-helper-text tool-helper-text-error">{error}</p>
            )}

            {success && (
              <p className="tool-helper-text tool-helper-text-success">
                {success}
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
                  onClick={handleMerge}
                  disabled={pdfFiles.length < 2 || isMerging}
                >
                  {currentContent.merge}
                </button>
              </div>
            </div>

            <div className="tool-result-box">
              {pdfFiles.length ? (
                <div className="tool-preview-box">
                  {pdfFiles.map((item, index) => (
                    <div key={item.id} className="tool-info-card">
                      <p className="tool-result-text tool-result-text-break-all">
                        {index + 1}. {item.name}
                      </p>
                      <p className="tool-helper-text">
                        {currentContent.pagesLabel}: {item.pageCount}
                      </p>

                      <div className="tool-panel-actions">
                        <button
                          type="button"
                          className="tool-action-button tool-action-button-secondary"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          {currentContent.moveUp}
                        </button>

                        <button
                          type="button"
                          className="tool-action-button tool-action-button-secondary"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === pdfFiles.length - 1}
                        >
                          {currentContent.moveDown}
                        </button>

                        <button
                          type="button"
                          className="tool-action-button tool-action-button-secondary"
                          onClick={() => handleRemoveFile(item.id)}
                        >
                          {currentContent.remove}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="tool-result-text tool-result-placeholder">
                  {currentContent.previewPlaceholder}
                </p>
              )}
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

export default PDFMerger;