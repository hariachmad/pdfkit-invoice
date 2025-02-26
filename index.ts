import { getDataDto } from "./dto/getData.dto";

const { fetchData } = require("./fetchData");
const { createInvoice } = require("./createInvoice");

fetchData().then((response : getDataDto[]) => {
  console.log(response);
  createInvoice(response, "invoice.pdf");
});
