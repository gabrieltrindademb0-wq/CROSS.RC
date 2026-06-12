Adicionar no <head>:
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#b7ff00">

Adicionar antes de </body>:
<script>
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('./sw.js');
}
</script>
