export function downloadTextFile(filename: string, content: string) {
  if (typeof window === "undefined") return;
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain;charset=utf-8" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function printFormattedDocument(title: string, htmlContent: string) {
  if (typeof window === "undefined") return;
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #18181B;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #18181B;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }
          .title { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 13px; color: #52525B; }
          .content { font-size: 14px; white-space: pre-wrap; font-family: monospace; background: #FAFAF7; padding: 20px; border: 1px solid #E4E4E7; border-radius: 8px; }
          .footer { margin-top: 30px; border-top: 1px solid #E4E4E7; padding-top: 15px; font-size: 11px; color: #71717A; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="subtitle">GOVERNMENT OF INDIA &bull; RIGHT TO INFORMATION ACT, 2005</div>
          <div class="title">${title}</div>
        </div>
        <div class="content">${htmlContent}</div>
        <div class="footer">
          <span>Generated via National Transparency Portal (RTI Online 2.0)</span>
          <span>Date: ${new Date().toLocaleDateString("en-IN")}</span>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
