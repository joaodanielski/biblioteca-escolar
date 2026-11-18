module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API Biblioteca Escolar',
    version: '1.0.0',
    description:
      'API REST da Biblioteca Escolar. Faça login em POST /api/login, copie o token e clique em "Authorize" para testar as rotas protegidas.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local' }],
  tags: [
    { name: 'Autenticação' },
    { name: 'Usuários', description: 'Somente perfil admin' },
    // Yada/Felipetto: adicionem aqui as tags de vocês (Livros, Autores, Categorias, Empréstimos)
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      Erro: {
        type: 'object',
        properties: { erro: { type: 'string', example: 'Mensagem de erro' } },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
          email: { type: 'string', example: 'admin@biblioteca.com' },
          senha: { type: 'string', example: '123456' },
        },
      },
      Token: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
          tipo: { type: 'string', example: 'Bearer' },
          expiraEm: { type: 'string', example: '2h' },
        },
      },
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Admin' },
          email: { type: 'string', example: 'admin@biblioteca.com' },
          perfil: { type: 'string', enum: ['admin', 'bibliotecario', 'aluno'] },
        },
      },
      UsuarioInput: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'perfil'],
        properties: {
          nome: { type: 'string', example: 'Maria' },
          email: { type: 'string', example: 'maria@biblioteca.com' },
          senha: { type: 'string', example: '123456' },
          perfil: { type: 'string', enum: ['admin', 'bibliotecario', 'aluno'] },
        },
      },
      UsuarioUpdate: {
        type: 'object',
        description: 'Todos os campos são opcionais.',
        properties: {
          nome: { type: 'string' },
          email: { type: 'string' },
          senha: { type: 'string' },
          perfil: { type: 'string', enum: ['admin', 'bibliotecario', 'aluno'] },
        },
      },
    },
    // Respostas reutilizáveis: usem com { $ref: '#/components/responses/NaoAutenticado' }
    responses: {
      NaoAutenticado: {
        description: 'Token ausente, inválido ou expirado',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
      SemPermissao: {
        description: 'Perfil sem permissão para esta operação',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
      NaoEncontrado: {
        description: 'Recurso não encontrado',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
      DadosInvalidos: {
        description: 'Dados inválidos ou campos obrigatórios ausentes',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
      Conflito: {
        description: 'Conflito (ex.: valor único já cadastrado)',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
    },
  },
  security: [{ bearerAuth: [] }], // todas as rotas exigem token, exceto onde houver security: []
  paths: {
    ...require('./paths/auth'),
    ...require('./paths/usuarios'),
    // Yada:      ...require('./paths/livros'), ...require('./paths/autores'), ...require('./paths/categorias'),
    // Felipetto: ...require('./paths/emprestimos'),
  },
};