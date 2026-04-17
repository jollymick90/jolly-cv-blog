export const CV_MAIN = '/cv_michele_scarpa-2026.pdf';
export const CV_ATS  = '/cv_michele_scarpa_2026_ats.pdf';

function triggerDownload(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadCV() {
    triggerDownload(CV_MAIN, 'Michele-Scarpa-CV-2026.pdf');
}

export function downloadCVAts() {
    triggerDownload(CV_ATS, 'Michele-Scarpa-CV-2026-ATS.pdf');
}

/** @deprecated use downloadCV() */
export function downloadResumeLang(_lang: string, _mode: string) {
    downloadCV();
}
