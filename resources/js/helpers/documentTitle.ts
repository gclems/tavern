const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default function getDocumentTitle(title: string) {
    let val = appName;

    if (title) {
        val += ' - ' + title;
    }

    return val;
}
