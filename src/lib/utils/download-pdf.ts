// const localhostUrl = 'http://localhost:5173';
export function downloadResumeLang(lang: string, mode: string) {
    // callApi(lang, mode);
    callStatic(lang, mode)
}

function callStatic(lang: string, mode: string) {
    const url = `/cv-${lang}-${mode}-michele-scarpa.pdf`;
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
