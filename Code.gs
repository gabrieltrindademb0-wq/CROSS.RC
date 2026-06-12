const SHEETS = {
  alunos: ["id","foto","nome","telefone","nascimento","turma","status","valor","vencimento","matricula","obs"],
  pagamentos: ["id","alunoId","mes","valor","forma","data"],
  avaliacoes: ["id","alunoId","data","peso","altura","gordura","muscular","cintura","quadril","braco","coxa","metaPeso","metaGordura","obs","calc","fotos"],
  vendas: ["id","alunoId","produto","qtd","valor","desconto","total","forma","data","obs"],
  turmas: ["id","nome","horario","dias","prof"]
};

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(name => {
    let sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.clear();
    sh.getRange(1, 1, 1, SHEETS[name].length).setValues([SHEETS[name]]);
    sh.getRange(1, 1, 1, SHEETS[name].length)
      .setFontWeight("bold")
      .setBackground("#111111")
      .setFontColor("#b7ff00");
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1, SHEETS[name].length);
  });
}

function doGet() {
  ensureSheets_();
  const data = readDatabase_();
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    ensureSheets_();
    const payload = JSON.parse(e.postData.contents || "{}");
    writeDatabase_(payload);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function ensureSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(name => {
    let sh = ss.getSheetByName(name) || ss.insertSheet(name);
    const headers = sh.getRange(1, 1, 1, SHEETS[name].length).getValues()[0];
    if (headers.join("|") !== SHEETS[name].join("|")) {
      sh.getRange(1, 1, 1, SHEETS[name].length).setValues([SHEETS[name]]);
      sh.setFrozenRows(1);
    }
  });
}

function readDatabase_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const db = {};
  Object.keys(SHEETS).forEach(name => {
    const sh = ss.getSheetByName(name);
    const headers = SHEETS[name];
    const last = sh.getLastRow();
    if (last < 2) { db[name] = []; return; }
    const values = sh.getRange(2, 1, last - 1, headers.length).getValues();
    db[name] = values
      .filter(row => row.some(v => v !== "" && v !== null))
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = normalizeValue_(h, row[i]));
        return obj;
      });
  });
  return db;
}

function writeDatabase_(db) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(name => {
    const sh = ss.getSheetByName(name);
    const headers = SHEETS[name];
    const list = Array.isArray(db[name]) ? db[name] : [];
    sh.clearContents();
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (list.length) {
      const rows = list.map(item => headers.map(h => cellValue_(item[h])));
      sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
    }
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#111111")
      .setFontColor("#b7ff00");
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1, headers.length);
  });
}

function cellValue_(v) {
  if (v === undefined || v === null) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return v;
}

function normalizeValue_(field, v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  if (["calc", "fotos"].includes(field) && typeof v === "string" && v.trim().startsWith("{")) {
    try { return JSON.parse(v); } catch (e) { return v; }
  }
  return v;
}
