const localhostUrl = 'http://localhost:5173';
export function downloadResumeLang(lang: string, mode: string) {
    const baseUrl = process.env.PUBLIC_BASE_URL || localhostUrl;
    if (baseUrl === localhostUrl) {
        callApi(lang, mode);

    } else {
        callStatic(lang);

    }
}

function callStatic(lang: string) {
    const url = `/${lang}_michele_scarpa_cv.pdf`;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Michele-Scarpa-CV.pdf'; // nome del file salvato
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function callApi(lang: string, mode: string) {
    fetch(`/printpdf?lang=${lang}&mode=${mode}`)
        .then(response => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Michele-Scarpa-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(blob);
        })
        .catch((err) => {
            console.log("err", err);
        });
}
