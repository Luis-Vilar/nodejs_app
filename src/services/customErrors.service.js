class CustomError extends Error {
  constructor(name, message, cause, status) {
    super(message);
    this.name = name;
    this.cause = cause;
    this.status = status;
    //poderia ter mais atributos caso fosse necessário
  }
}

class MyCustomErrorExample extends CustomError {
  // cosntructor da classe que extende a classe CustomError deve
  // receber os mesmos parametros do construtor da classe CustomError
  constructor(name, message, cause, status) {
    super(name, message, cause, status);
  }
}
class MyFixCustomErrorExample extends CustomError {
  // cosntructor da classe que extende a classe CustomError deve receber
  // os mesmos parametros do construtor da classe CustomError
  // porem colocamos eles fixos para não precisar passar na instanciação
  constructor() {
    super("name", "message", "cause", 400);
  }
}
// --------------------------Exemplo de uso
// ==>    res = response do express     <== 
// const error = new MyCustomErrorExample(
//   "MyCustomErrorExample",
//   "Mensagem de erro customizada",
//   "Causa do erro customizada",
//   400
// );
// launchError(error, res);

// Função que recebe o erro e a response e retorna um erro formatado importar no catch das controllers/services
async function errorLauncher(error, res) {
  if (!error.cause) {
    /*
        implementar logica para salvar
        o erro e notificar o dev 
        na versão 2.0
        */
    //console.log(error);
  }
  //Se o erro for de validação do sequelize ele retorna um erro 400 por se tratar de uma requisição mal formatada
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: error.message,
      cause:
        "Requisição mal formatada, verifique os campos obrigatórios e tente novamente",
      status: 400,
      error: "BadFormatRequest",
    });
  }
  // Caso o erro não foi tratado  nunca tera error.status, retornamos um erro 500 com mensagem genérica
  return res.status(error.status || 500).json({
    message:
      error.message ||
      "Ocorreu um erro, pode contatar nosso team de desenvolvimento no email bug_busters_team@dominio.com e enviar esta response nos ficaremos muito gratos em ajudar a resolver o problema, ou verificar a seguente informação para tentar resolver por si mesmo",
    status: error.status || 500,
    cause:
      error.cause ||
      "Desta vez quem falhou foi o dev :(, mas não se preocupe, ele já foi notificado e está trabalhando para resolver o problema o mais rápido possível",
    error: error.name,
  });
}

module.exports = {
  errorLauncher,
  MyCustomErrorExample,
  MyFixCustomErrorExample,
};
