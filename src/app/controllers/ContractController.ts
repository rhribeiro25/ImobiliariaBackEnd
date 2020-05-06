import ContractService from '@services/ContractService';
import { routerAuth } from '@configs/router/routes';

const contractService = ContractService.getInstance();

routerAuth.post('/create', async (req, res) => {
  try {
    const contract = await contractService.create(req.body, process.env.USER_ID);
    return res.status(201).send({ contract });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao criar novo contrato!',
      },
    });
  }
});

routerAuth.get('/list', async (req, res) => {
  try {
    const contracts = await contractService.findAllPopulateRelations(['crBy', 'people', 'property']);
    if (!contracts) return res.status(400).send(new Error('Contratos não encontrada!'));
    return res.status(200).send(contracts);
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao listar contrato!',
      },
    });
  }
});

routerAuth.get('/show/:id', async (req, res) => {
  try {
    const contract = await contractService.findByIdPopulateRelations(req.params.id, ['crBy', 'people', 'property']);
    if (!contract) return res.status(400).send(new Error('Contrato não encontrado!'));
    res.status(200).send({ contract });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao localizar contrato!',
      },
    });
  }
});

routerAuth.delete('/delete/:id', async (req, res) => {
  try {
    const contract = await contractService.findByIdAndRemove(req.params.id);
    if (!contract) return res.status(400).send(new Error('Contrato não encontrado!'));
    res.status(200).send('Sucesso ao deletar contrato!');
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha ao deletar contrato!',
      },
    });
  }
});

routerAuth.patch('/update/:id', async (req, res) => {
  try {
    const { status, contract } = await contractService.findByIdAndUpdate(req.params.id, req.body, process.env.USER_ID, {
      new: true,
      runValidators: true,
    });
    if (!contract) res.status(status).send(new Error('Contrato não encontrada!'));
    else res.status(status).send({ contract });
  } catch (error) {
    return res.status(400).send({
      error: {
        name: error.name,
        description: error.message,
        message: 'Falha na atualização de contrato!',
      },
    });
  }
});

export default routerAuth;
