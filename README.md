# ImobiliariaBackEnd
Real estate system back-end, developed in Node.js;

**Functional resources**
- Create, Read, Update and Delete to Users, People, Properties and Contracts.
- Authenticate User using token;
- Forgot password using token by email;

**Non-functional resources**
- Use Amazon SES ($ 1 - 10,000);
- Use typescript;
- Using MongoDB;
- Use Express;
- Use Jest;

**Business rules**
- On save person, if the person does not exist, it must be created;
- On save person, if the person already exists, we will serve you with the attributes, identifying you through cpf / cnpj;