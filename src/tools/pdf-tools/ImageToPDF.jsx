import { useCallback, useEffect, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Image to PDF - QuickoTools',
    metaDescription:
      'Convert an image into a PDF file instantly with the free Image to PDF tool from QuickoTools.',
    title: 'Image to PDF',
    description:
      'Upload an image and convert it into a downloadable PDF file instantly.',
    inputTitle: 'Upload Image',
    outputTitle: 'Preview & Download',
    inputLabel: 'Choose Image',
    upload: 'Choose Image',
    clear: 'Clear',
    download: 'Download PDF',
    emptyState: 'Upload an image file to generate a PDF.',
    previewPlaceholder: 'Your image preview will appear here.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool converts a single image such as JPG or PNG into a PDF document that you can download and share easily.',
    fileNameLabel: 'Selected File',
    noFile: 'No file selected',
    invalidFile: 'Please upload a valid image file.',
    generating: 'Generating PDF...',
    downloadHelp:
      'If the PDF does not download, please open this page in Chrome or Safari and try again.',
    inAppWarning:
      'You are using an in-app browser (Facebook / Instagram). File downloads may not work properly here.'
  },
  ar: {
    metaTitle: 'تحويل صورة إلى PDF - QuickoTools',
    metaDescription:
      'حوّل الصورة إلى ملف PDF فورًا باستخدام أداة تحويل صورة إلى PDF المجانية من QuickoTools.',
    title: 'تحويل صورة إلى PDF',
    description: 'ارفع صورة وحولها إلى ملف PDF قابل للتنزيل فورًا.',
    inputTitle: 'رفع الصورة',
    outputTitle: 'المعاينة والتنزيل',
    inputLabel: 'اختر صورة',
    upload: 'اختر صورة',
    clear: 'مسح',
    download: 'تنزيل PDF',
    emptyState: 'ارفع ملف صورة لإنشاء PDF.',
    previewPlaceholder: 'ستظهر معاينة الصورة هنا.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بتحويل صورة واحدة مثل JPG أو PNG إلى مستند PDF يمكنك تنزيله ومشاركته بسهولة.',
    fileNameLabel: 'الملف المحدد',
    noFile: 'لا يوجد ملف محدد',
    invalidFile: 'يرجى رفع ملف صورة صالح.',
    generating: 'جارٍ إنشاء ملف PDF...',
    downloadHelp:
      'إذا لم يتم تنزيل الملف، يرجى فتح الموقع في متصفح مثل Chrome أو Safari ثم إعادة المحاولة.',
    inAppWarning:
      'أنت تستخدم متصفح داخل تطبيق (فيسبوك أو إنستغرام)، وقد لا يعمل تنزيل الملفات هنا بشكل صحيح.'
  }
};

function ImageToPDF({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const isInAppBrowser = useMemo(() => {
    const ua = navigator.userAgent || '';
    return /FBAN|FBAV|Instagram/i.test(ua);
  }, []);

  const isMobileDevice = useMemo(() => {
    const ua = navigator.userAgent || '';
    return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  }, []);

  const shouldShowBrowserWarning = isInAppBrowser && isMobileDevice;

  const selectedFileName = useMemo(() => {
    return selectedFile ? selectedFile.name : currentContent.noFile;
  }, [selectedFile, currentContent.noFile]);

  const cleanupPreview = useCallback(() => {
    setPreviewUrl((currentUrl) => {
      if (currentUrl && currentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl);
      }
      return '';
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith('image/')) {
        cleanupPreview();
        setSelectedFile(null);
        setError(currentContent.invalidFile);
        return;
      }

      cleanupPreview();

      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
      setError('');
    },
    [cleanupPreview, currentContent.invalidFile]
  );

  const handleClear = useCallback(() => {
    cleanupPreview();
    setSelectedFile(null);
    setError('');
  }, [cleanupPreview]);

  const handleDownload = useCallback(async () => {
    if (shouldShowBrowserWarning) {
      alert(currentContent.downloadHelp);
    }

    if (!selectedFile || !previewUrl) return;

    setIsGenerating(true);
    setError('');

    try {
      const image = new Image();
      image.src = previewUrl;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const pdf = new jsPDF({
        orientation: image.width > image.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [image.width, image.height]
      });

      const imageType = selectedFile.type === 'image/png' ? 'PNG' : 'JPEG';
      pdf.addImage(image, imageType, 0, 0, image.width, image.height);

      const baseName = selectedFile.name.replace(/\.[^.]+$/, '') || 'image';
      const fileName = `${baseName}.pdf`;

      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 4000);
    } catch {
      setError(currentContent.invalidFile);
    } finally {
      setIsGenerating(false);
    }
  }, [
    selectedFile,
    previewUrl,
    shouldShowBrowserWarning,
    currentContent.downloadHelp,
    currentContent.invalidFile
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
                  disabled={!selectedFile && !previewUrl}
                >
                  {currentContent.clear}
                </button>
              </div>
            </div>

            <div className="tool-field">
              <label className="tool-label" htmlFor="image-to-pdf-input">
                {currentContent.inputLabel}
              </label>

              <div className="tool-file-upload">
                <input
                  id="image-to-pdf-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  className="tool-file-input"
                />

                <label
                  htmlFor="image-to-pdf-input"
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

            {!selectedFile && !error && (
              <p className="tool-helper-text">{currentContent.emptyState}</p>
            )}

            {isGenerating && (
              <p className="tool-helper-text">{currentContent.generating}</p>
            )}

            {shouldShowBrowserWarning && (
              <>
                <p className="tool-helper-text tool-helper-text-error">
                  {currentContent.inAppWarning}
                </p>
                <p className="tool-helper-text">
                  {currentContent.downloadHelp}
                </p>
              </>
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
                  onClick={handleDownload}
                  disabled={!selectedFile || isGenerating}
                >
                  {currentContent.download}
                </button>
              </div>
            </div>

            <div className="tool-result-box">
              <div className="tool-preview-box">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={currentContent.title}
                    className="tool-image-preview"
                  />
                ) : (
                  <p className="tool-result-text tool-result-placeholder">
                    {currentContent.previewPlaceholder}
                  </p>
                )}
              </div>
            </div>

            {shouldShowBrowserWarning && (
              <p className="tool-helper-text">
                {currentContent.downloadHelp}
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

export default ImageToPDF;