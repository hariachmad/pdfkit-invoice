"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createInvoice } = require("./createInvoice");
const invoice = [
    {
        id: "2086932",
        mb_idtrans: "QChy55x1ny",
        namaTpg: "CIBADAK",
        fullname: "ARIEF MAOLANA",
        mutu: "6",
        jumlah: "100",
        harga_dasar: "4500",
        harga_tambahan: "240",
        total: "474000",
        namaPenyadap: "Cecep",
        created_at: "2025-02-25 10:00:00",
    },
    {
        id: "2086933",
        mb_idtrans: "QChy55x1nz",
        namaTpg: "CIBADAK",
        fullname: "ARIEF MAOLANA",
        mutu: "4",
        jumlah: "50",
        harga_dasar: "4000",
        harga_tambahan: "200",
        total: "786000",
        namaPenyadap: "Cecep",
        created_at: "2025-02-25 09:00:00",
    },
];
createInvoice(invoice, "invoice.pdf");
