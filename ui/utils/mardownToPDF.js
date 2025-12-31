import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import { PDFDocument } from "pdf-lib";
import MarkdownIt from "markdown-it";


const md = new MarkdownIt({ html: false, linkify: true, breaks: true });
const mm = v => (v * 72) / 25.4;


async function addPdfMargins(inUri, { top=18, bottom=18, left=16, right=16 } = {}) {
	const bytes = new Uint8Array(await (await fetch(inUri)).arrayBuffer());
	const inDoc = await PDFDocument.load(bytes);
	const outDoc = await PDFDocument.create();
	const T = mm(top), B = mm(bottom), L = mm(left), R = mm(right);
	
	for(let i = 0; i < inDoc.getPageCount(); i++) {
		const [p] = await outDoc.embedPages([inDoc.getPage(i)]);
		const { width, height } = p.size();
		const page = outDoc.addPage([width, height]);
		page.drawPage(p, { x: L, y: B, width: width - L - R, height: height - T - B });
	}
	
	const b64 = await outDoc.saveAsBase64({ dataUri: false });
	const outUri = `${FileSystem.cacheDirectory}report_${Date.now()}.pdf`;
	await FileSystem.writeAsStringAsync(outUri, b64, { encoding: "base64" });
	return outUri;
}


export async function markdownToPdf(markdown) {
	const html = `<!doctype html><html><head><meta charset="utf-8"/><style>
		body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;font-size:18px}
		h1{font-size:48px}h2{font-size:32px}h3{font-size:28px}
		p,li{line-height:1.45}
		pre{background:#f5f5f5;padding:12px;border-radius:8px;overflow:auto}
		code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
		img{max-width:100%}
	</style></head><body>${md.render(markdown)}</body></html>`;
	const { uri } = await Print.printToFileAsync({ html });
	return addPdfMargins(uri);
}


export async function viewPdf(uri) {
	return Print.printAsync({ uri });
}


export async function sharePdf(uri) {
	if (await Sharing.isAvailableAsync()) {
		await Sharing.shareAsync(uri, { UTI: "com.adobe.pdf", mimeType: "application/pdf" });
	}
}
