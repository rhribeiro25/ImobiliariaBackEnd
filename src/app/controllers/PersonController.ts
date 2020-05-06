import PersonService from '@services/PersonService';
import { routerAuth } from '@configs/router/routes';

const personService = PersonService.getInstance();

routerAuth.post('/create', async (req, res) => {
  try {
    const { status, person } = await personService.create(req.body, process.env.USER_ID);
    res.status(status).send({ person });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao criar nova pessoa!',
      },
    });
  }
});

routerAuth.get('/list', async (req, res) => {
  try {
    const people = await personService.findAllPopulateRelations(['crBy']);
    if (!people) return res.status(400).send(new Error('Pessoas não encontradas!'));
    return res.status(200).send(people);
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao listar pessoas!',
      },
    });
  }
});

routerAuth.get('/show/:id', async (req, res) => {
  try {
    const person = await personService.findByIdPopulateRelations(req.params.id, ['crBy']);
    if (!person) return res.status(400).send(new Error('Pessoa não encontrada!'));
    res.status(200).send({ person });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao localizar pessoa!',
      },
    });
  }
});

routerAuth.delete('/delete/:id', async (req, res) => {
  try {
    const person = await personService.findByIdAndRemove(req.params.id);
    if (!person) return res.status(400).send(new Error('Pessoa não encontrada!'));
    res.status(200).send('Sucesso ao deletar pessoa!');
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao deletar pessoa!',
      },
    });
  }
});

routerAuth.patch('/update/:id', async (req, res) => {
  try {
    const { status, person } = await personService.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!person) res.status(status).send(new Error('Impossível alterar os documentos CPF ou CNPJ!'));
    else res.status(status).send({ person });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha na atualização de pessoa!',
      },
    });
  }
});

export default routerAuth;
