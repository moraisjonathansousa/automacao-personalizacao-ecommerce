
/*
 * PROJETO: Automação de Personalização para E-commerce
 * COMPONENTE: Integração com Google Planilhas
 *
 * Recebe os dados de personalização enviados pela loja
 * e registra as informações na aba "Pedidos".
 *
 * IMPORTANTE:
 * Código demonstrativo para portfólio.
 * Não utilizar em produção sem implementar autenticação
 * adequada e configurar as propriedades do ambiente.
 */

// Token fictício: não representa uma credencial de produção.
var TOKEN = 'TOKEN_DE_EXEMPLO_NAO_UTILIZAR_EM_PRODUCAO';


/* ==========================================
   1. TRATAMENTO E VALIDAÇÃO DOS DADOS
========================================== */

function limpar(valor) {
  var texto = String(valor == null ? '' : valor)
    .substring(0, 1500);

  // Mitiga a interpretação de conteúdo como fórmula
  // ao registrar dados fornecidos pelo usuário.
  if (/^[\s\u0000-\u001f]*[=+\-@]/.test(texto)) {
    texto = "'" + texto;
  }

  return texto;
}


/* ==========================================
   2. RESPOSTA DA INTEGRAÇÃO
========================================== */

function resposta(mensagem) {
  return ContentService
    .createTextOutput(mensagem)
    .setMimeType(ContentService.MimeType.TEXT);
}


/* ==========================================
   3. RECEBIMENTO E PROCESSAMENTO DOS DADOS
========================================== */

function doPost(e) {

  var lock = LockService.getScriptLock();
  var bloqueioAdquirido = false;

  try {

    // Verifica a existência do conteúdo recebido
    if (
      !e ||
      !e.postData ||
      !e.postData.contents
    ) {
      return resposta('requisicao_invalida');
    }

    // Interpreta os dados enviados em JSON
    var d;

    try {
      d = JSON.parse(e.postData.contents);
    } catch (erroJSON) {
      return resposta('json_invalido');
    }

    // Validação demonstrativa do token
    if (!d || d.token !== TOKEN) {
      return resposta('negado');
    }

    // Verifica os dados essenciais
    if (
      typeof d.produto !== 'string' ||
      typeof d.sku !== 'string'
    ) {
      return resposta('dados_invalidos');
    }

    // Evita conflitos entre gravações simultâneas
    lock.waitLock(10000);
    bloqueioAdquirido = true;

    // Acessa a planilha vinculada ao projeto
    var planilha = SpreadsheetApp.getActiveSpreadsheet();

    var aba = planilha.getSheetByName('Pedidos');

    if (!aba) {
      aba = planilha.insertSheet('Pedidos');
    }

    // Cria os cabeçalhos quando necessário
    if (aba.getLastRow() === 0) {

      aba.appendRow([
        'Data e hora',
        'Produto',
        'Código (SKU)',
        'Personalização',
        'Link da foto',
        'Nº do pedido',
        'Status'
      ]);

    }

    // Registra os dados da personalização
    aba.appendRow([

      new Date(),
      limpar(d.produto),
      limpar(d.sku),
      limpar(d.detalhes),
      limpar(d.foto),
      '',
      ''

    ]);

    return resposta('ok');

  } catch (erro) {

    // Registra detalhes técnicos no log do Apps Script
    console.error('Erro ao processar personalização:', erro);

    return resposta('erro_processamento');

  } finally {

    // Libera o bloqueio somente se ele foi adquirido
    if (bloqueioAdquirido) {
      lock.releaseLock();
    }

  }

}
