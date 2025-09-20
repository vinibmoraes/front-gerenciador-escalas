# Gerenciador de Escalas

Aplicação para gerenciamento de escalas e turnos de trabalho.

## Configuração do Ambiente

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração. Copie o arquivo `.env.example` para `.env.development` (desenvolvimento local) e preencha os valores necessários:

```bash
cp .env.example .env.development
```

#### Variáveis disponíveis

- `REACT_APP_API_URL`: URL base da API
- `REACT_APP_ENV`: Ambiente atual (development, staging, production)

### Ambientes

- **Desenvolvimento**: `.env.development`
- **Staging**: `.env.staging`
- **Produção**: `.env.production`

## Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
├── services/         # Serviços de API e lógica de negócios
├── utils/            # Utilitários e helpers
├── components/       # Componentes reutilizáveis
├── pages/            # Páginas da aplicação
└── App.tsx          # Componente raiz
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.\
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia o executor de testes no modo de observação interativo.\
Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para obter mais informações.

### `npm run build`

Constrói o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é reduzida e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para obter mais informações.

### `npm run eject`

**Nota: esta é uma operação unidirecional. Depois de `ejetar`, você não pode voltar!**

Se você não estiver satisfeito com a ferramenta de compilação e as opções de configuração, você pode `ejetar` a qualquer momento. Este comando removerá a dependência de compilação única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitórias (webpack, Babel, ESLint, etc) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você não precisa usar `eject`. O conjunto de recursos selecionados é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar esse recurso. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para isso.

## Padrões de Código

- **Tipagem Forte**: Use TypeScript para tipagem estática
- **Componentes Funcionais**: Prefira componentes funcionais com Hooks
- **Separação de Responsabilidades**: Separe lógica de negócios, apresentação e gerenciamento de estado
- **Testes**: Escreva testes unitários para componentes e funções importantes

## Deploy

O deploy para diferentes ambientes é gerenciado através das configurações de ambiente correspondentes (.env.staging, .env.production).

## Aprenda Mais

Você pode aprender mais em [Criar Documentação do React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a [Documentação do React](https://reactjs.org/).
