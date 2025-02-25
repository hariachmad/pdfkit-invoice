"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = createInvoice;
const fs = require("fs");
const PDFDocument = require("pdfkit");
function formatCurrency(cents) {
    return "Rp." + cents;
}
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "/" + month + "/" + day;
}
function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}
function generateFooter(doc) {
    doc
        .fontSize(10)
        .text("Payment is due within 15 days. Thank you for your business.", 50, 780, { align: "center", width: 500 });
}
function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);
    doc.end();
    doc.pipe(fs.createWriteStream(path));
}
function generateHeader(doc) {
    doc
        .image("spinnin_records_logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Perhutani", 110, 57)
        .fontSize(10)
        .text("Perhutani.", 200, 50, { align: "right" })
        .text("Marathon 4, 1213 PJ Hilversum", 200, 65, { align: "right" })
        .moveDown();
}
function generateSubtotal(rows) {
    let subTotal = 0;
    rows.map((row) => {
        subTotal = subTotal + parseInt(row.total);
    });
    return subTotal;
}
function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("PENERIMAAN GETAH", 50, 160);
    generateHr(doc, 185);
    const customerInformationTop = 200;
    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(Math.floor(Math.random() * 100) + 1, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text(formatCurrency(parseInt(invoice[0].total)), 150, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text(invoice[0].fullname, 300, customerInformationTop)
        .moveDown();
    generateHr(doc, 252);
}
function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
    doc.font("Helvetica-Bold");
    generateTableRow(doc, invoiceTableTop, "id", "Tpg", "Penyadap", "Tgl", "Mutu", "Jumlah", "H.Dasar", "H.Tambahan", "Total");
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
    for (i = 0; i < invoice.length; i++) {
        const item = invoice[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(doc, position, item.id, item.namaTpg, item.namaPenyadap, item.created_at.slice(0, 10), item.mutu, item.jumlah, item.harga_dasar, item.harga_tambahan, formatCurrency(item.total));
        generateHr(doc, position + 20);
    }
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(doc, subtotalPosition, "", "", "", "", "", "", "Subtotal", "", formatCurrency(generateSubtotal(invoice)));
    // const paidToDatePosition = subtotalPosition + 20;
    // generateTableRow(
    //   doc,
    //   paidToDatePosition,
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "Paid To Date",
    //   "",
    //   formatCurrency(invoice[0].harga_dasar)
    // );
    const duePosition = subtotalPosition + 45;
    doc.font("Helvetica-Bold");
    generateTableRow(doc, duePosition, "", "", "", "", "", "", "Balance-Due", "", formatCurrency(generateSubtotal(invoice)));
    // function generateFooter(doc : any) {
    //   doc
    //     .fontSize(10)
    //     .text(
    //       "Payment is due within 15 days. Thank you for your business.",
    //       50,
    //       780,
    //       { align: "center", width: 500 }
    //     );
    // }
    function generateTableRow(doc, y, id, tpg, namaPenyadap, created_at, mutu, jumlah, harga_dasar, harga_tambahan, total) {
        doc
            .fontSize(10)
            .text(id, 50, y)
            .text(tpg, 100, y)
            .text(namaPenyadap, 150, y)
            .text(created_at, 210, y)
            // .text(quantity, 370, y, { width: 90, align: "right" })
            .text(mutu, 280, y)
            .text(jumlah, 320, y)
            .text(harga_dasar, 360, y)
            .text(harga_tambahan, 410, y)
            .text(total, 460, y, { width: 90, align: "right" });
    }
}
