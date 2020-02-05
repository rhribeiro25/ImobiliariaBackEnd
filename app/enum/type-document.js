const typeDocument = {
    CPF: "CPF",
    IDENTITY: "Identidade",
    CNPJ: "CNPJ",
    PASSPORT: "Passaporte"
};

module.exports = mongoose.model("TypeDocument", typeDocument);