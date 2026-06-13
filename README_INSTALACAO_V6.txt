CROSS RC - CORREÇÃO v6

O que foi corrigido:
1. Celular: menu mais compacto, navegação horizontal, topo fixo e campos maiores para toque.
2. Sincronização: cadastro de aluno e pagamento agora tentam salvar imediatamente no Google Sheets.
3. Planilha: aba alunos atualizada com campos de responsável/cliente e vencimento completo.
4. Apps Script: Code.gs atualizado para não perder campos novos.

PASSO OBRIGATÓRIO PARA A PLANILHA VOLTAR A ATUALIZAR:
1. Abra sua planilha no Google Sheets.
2. Vá em Extensões > Apps Script.
3. Apague o código antigo.
4. Cole todo o novo Code.gs deste pacote.
5. Clique em Salvar.
6. Rode a função setup() uma vez.
7. Clique em Implantar > Gerenciar implantações.
8. Edite a implantação atual ou crie uma nova implantação como App da Web.
9. Executar como: Eu.
10. Quem tem acesso: Qualquer pessoa.
11. Copie a URL /exec e confira se ela está no index.html em APPS_SCRIPT_URL.

IMPORTANTE:
Se você só trocar o index.html e não trocar o Code.gs, os campos novos podem não aparecer na planilha.
Depois de subir no GitHub, limpe o cache ou abra com ?v=6.
