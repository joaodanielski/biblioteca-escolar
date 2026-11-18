const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'integer' },
  description: 'ID do usuário',
};

module.exports = {
  '/api/usuarios': {
    get: {
      tags: ['Usuários'],
      summary: 'Lista todos os usuários (admin)',
      responses: {
        200: {
          description: 'Lista de usuários',
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } },
            },
          },
        },
        401: { $ref: '#/components/responses/NaoAutenticado' },
        403: { $ref: '#/components/responses/SemPermissao' },
      },
    },
    post: {
      tags: ['Usuários'],
      summary: 'Cria um usuário (admin)',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioInput' } } },
      },
      responses: {
        201: {
          description: 'Usuário criado (header Location com a URL do recurso)',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } },
        },
        400: { $ref: '#/components/responses/DadosInvalidos' },
        401: { $ref: '#/components/responses/NaoAutenticado' },
        403: { $ref: '#/components/responses/SemPermissao' },
        409: { $ref: '#/components/responses/Conflito' },
      },
    },
  },
  '/api/usuarios/{id}': {
    get: {
      tags: ['Usuários'],
      summary: 'Busca um usuário por ID (admin)',
      parameters: [idParam],
      responses: {
        200: {
          description: 'Usuário encontrado',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } },
        },
        401: { $ref: '#/components/responses/NaoAutenticado' },
        403: { $ref: '#/components/responses/SemPermissao' },
        404: { $ref: '#/components/responses/NaoEncontrado' },
      },
    },
    put: {
      tags: ['Usuários'],
      summary: 'Atualiza um usuário (admin)',
      parameters: [idParam],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioUpdate' } } },
      },
      responses: {
        200: {
          description: 'Usuário atualizado',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } },
        },
        400: { $ref: '#/components/responses/DadosInvalidos' },
        401: { $ref: '#/components/responses/NaoAutenticado' },
        403: { $ref: '#/components/responses/SemPermissao' },
        404: { $ref: '#/components/responses/NaoEncontrado' },
        409: { $ref: '#/components/responses/Conflito' },
      },
    },
    delete: {
      tags: ['Usuários'],
      summary: 'Exclui um usuário (admin). Não é possível excluir a si mesmo.',
      parameters: [idParam],
      responses: {
        204: { description: 'Usuário excluído (sem corpo)' },
        400: { $ref: '#/components/responses/DadosInvalidos' },
        401: { $ref: '#/components/responses/NaoAutenticado' },
        403: { $ref: '#/components/responses/SemPermissao' },
        404: { $ref: '#/components/responses/NaoEncontrado' },
      },
    },
  },
};