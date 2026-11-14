
var TOKEN = 'SEU_TOKEN_DE_EXEMPLO';

function limpar(v) {
  v = String(v == null ? '' : v).substring(0, 1500);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) {
      return ContentService.createTextOutput('negado');
    }

    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName('Pedidos') ||
              planilha.insertSheet('Pedidos');

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

    aba.appendRow([
      new Date(),
      limpar(d.produto),
      limpar(d.sku),
      limpar(d.detalhes),
      limpar(d.foto),
      '',
      ''
    ]);

    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
