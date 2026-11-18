module.exports = {
  '/api/login': {
    post: {
      tags: ['Autenticação'],
      summary: 'Autentica o usuário e devolve um token JWT',
      security: [], // rota pública
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } },
      },
      responses: {
        200: {
          description: 'Login realizado',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Token' } } },
        },
        401: {
          description: 'E-mail ou senha inválidos',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
        },
      },
    },
  },
};