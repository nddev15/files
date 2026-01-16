const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'js');
if (!fs.existsSync(dir)) {
  console.error('Directory not found:', dir);
  process.exit(2);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
let ok = true;
files.forEach(f => {
  const p = path.join(dir, f);
  const src = fs.readFileSync(p, 'utf8');
  try {
    new Function(src);
    console.log(f + ': OK');
  } catch (e) {
    ok = false;
    console.error(f + ': SYNTAX ERROR');
    console.error(e && e.stack ? e.stack : e.message);
  }
});

process.exit(ok ? 0 : 1);
