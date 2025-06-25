document.getElementById('fileInput').addEventListener('change', handleFiles);

function handleFiles(event) {
  const files = event.target.files;
  const output = document.getElementById('output');
  output.innerHTML = '';

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const parsed = parseFlipperData(content);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <strong>File:</strong> ${file.name}<br />
        <strong>UID:</strong> ${parsed.UID || 'N/A'}<br />
        <strong>Type:</strong> ${parsed.Filetype || 'Unknown'}<br />
        <strong>ATQA:</strong> ${parsed.ATQA || 'N/A'}<br />
        <strong>SAK:</strong> ${parsed.SAK || 'N/A'}
      `;
      output.appendChild(card);
    };
    reader.readAsText(file);
  });
}

function parseFlipperData(text) {
  const lines = text.split('\n');
  const data = {};
  lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim();
    }
  });
  return data;
}
