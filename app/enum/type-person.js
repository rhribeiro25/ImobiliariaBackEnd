const typePerson = {
    LOCATOR: "Locador",
    TENANT: "Locatário",
    WITNESS: "Testemunha"
};

module.exports = mongoose.model("TypePerson", typePerson);