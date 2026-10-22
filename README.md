# Prioriza — Landing page

Landing page estática da Prioriza, preparada para publicação no GitHub Pages.

## Publicação

Em **Settings → Pages**, selecione **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.

## Ativar a captura de leads

O GitHub Pages não possui banco de dados ou processamento de formulários. Crie um formulário em um serviço compatível com envio HTTP (por exemplo, Formspree) e informe sua URL na constante `FORM_ENDPOINT`, no início de `script.js`.

Os campos enviados são:

- `name`
- `email`
- `phone`
- `challenge`
- `consent`
- `source`

Antes de publicar, revise a política de privacidade e o processo de tratamento dos dados conforme a LGPD.

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use qualquer servidor HTTP estático.
