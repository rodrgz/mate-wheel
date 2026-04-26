# Mate Wheel V1

Uma ferramenta técnica interativa para análise sensorial de erva-mate, combinando referencial teórico e visualização de dados via Sunburst chart.

## Pipeline de Conteúdo Estrito

A V1 assegura consistência garantindo que toda visualização da página vem de apenas uma fonte de verdade, o conteúdo processado no build time via Content Collections do Astro. Toda validação de esquemas de dados acontece de modo estrito antes do site ser publicado.

## Como validar e executar localmente

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Validar conteúdo e rodar o build**:
   ```bash
   npm run build
   ```
   *Nota*: O comando `build` executa internamente o `astro check` e o `tsc --noEmit`. Este passo falhará explicitamente caso algum `id` repetido ou estrutura malformada de campo seja introduzida na taxonomia (`src/content/wheel/mate-wheel.yaml`).

3. **Rodar em ambiente de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Executar os testes de conteúdo**:
   ```bash
   npm test
   ```
   Isso valida a normalização da roda, a unicidade dos IDs e a presença dos arquivos de conteúdo por locale.

5. **Publicação (GitHub Pages)**:
   A publicação no ar ocorre de modo automático via GitHub Actions sempre que código que passa pelo build é ingressado na `main`. O JSON exportador com os dados sensoriais canônicos normalizados ficará disponível em `/data/mate-wheel.json`.

## Governança de Conteúdo

A regra operacional do projeto está documentada em [docs/content-governance.md](docs/content-governance.md). Em resumo:

- Markdown governa a narrativa.
- YAML governa a taxonomia.
- a UI consome apenas derivados normalizados.

## Licença e Direitos de Uso

Para incentivar a evolução tecnológica e a colaboração, os direitos deste projeto são distribuídos da seguinte forma:

1. **Código e Estrutura (Software)**: Licenciado sob a [MIT License](file:///home/erik/sources/mate-wheel/LICENSE). Isso inclui o framework Astro, componentes de interface, lógica TypeScript e integração com gráficos.
2. **Conteúdo, Taxonomia e Roda Sensorial**: Licenciados sob a [CC BY-NC 4.0 (Creative Commons Atribuição-NãoComercial)](file:///home/erik/sources/mate-wheel/LICENSE-CONTENT).
   - **O que isso significa**: Você pode compartilhar e adaptar o léxico sensorial para fins não comerciais, desde que atribua o crédito ao projeto original. 
   - **Uso Comercial**: O uso da taxonomia ou da imagem da Roda Sensorial para fins comerciais (ex: marketing de marcas de erva-mate, embalagens ou produtos pagos) requer autorização prévia e licenciamento específico com o autor.

## Aviso Legal e Colaboração

Este projeto trata-se de explorações sensoriais pessoais e não se trata de nenhum estudo formal. Ele foi criado para ser uma roda de mate colaborativa. Sugestões de notas sensoriais são bem-vindas via **GitHub Issues** ou e-mail.
