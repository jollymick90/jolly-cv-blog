export function downloadResumeLang(lang: string, mode: string) {
    fetch(`/printpdf?lang=${lang}&mode=${mode}`)
        .then(response => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Michele-Scarpa-CV.pdf'
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(blob)
        })
        .catch((err) => {
            console.log("err", err);
        });
}