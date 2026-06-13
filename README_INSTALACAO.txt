CROSS RC - APP COM GOOGLE SHEETS COMO BANCO DE DADOS

ARQUIVOS DO ZIP
1. index.html
   App atualizado. Ele salva localmente e sincroniza com Google Sheets.

2. Code.gs
   Código do Google Apps Script. Cole esse código na planilha.

3. crossrc_banco_de_dados.xlsx
   Planilha modelo com as abas: alunos, pagamentos, avaliacoes, vendas e turmas. A aba alunos agora inclui responsável e vencimento em data completa (AAAA-MM-DD).

COMO CONFIGURAR
1. Abra o arquivo crossrc_banco_de_dados.xlsx no Google Sheets.
2. No Google Sheets, clique em Extensões > Apps Script.
3. Apague qualquer código que aparecer e cole todo o conteúdo do arquivo Code.gs.
4. Clique em Salvar.
5. Rode a função setup uma vez para criar/organizar as abas.
6. Clique em Implantar > Nova implantação.
7. Tipo: App da Web.
8. Executar como: Eu.
9. Quem tem acesso: Qualquer pessoa.
10. Clique em Implantar e copie a URL do App da Web.
11. Abra o arquivo index.html em um editor.
12. Procure esta linha:
   const APPS_SCRIPT_URL="COLE_AQUI_A_URL_DO_APPS_SCRIPT";
13. Troque pelo link copiado do Apps Script.
14. Salve o HTML e envie para o GitHub Pages.

OBSERVAÇÃO
O app também mantém um backup local no navegador. Se a internet falhar, ele continua funcionando localmente e tenta sincronizar depois.


ATUALIZAÇÃO V5
- Perfil completo do aluno com histórico, financeiro, vendas e avaliações.
- Cadastro com aba/área de responsável ou cliente.
- Vencimento agora usa data completa no formato AAAA-MM-DD.
- Layout atualizado com visual profissional/premium.
- IMPORTANTE: substitua o Code.gs no Apps Script e rode setup uma vez para atualizar a aba alunos.
