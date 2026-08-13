# Guia de Publicação — UniSENAI Store

Passo a passo real usado para publicar o projeto no GitHub e na Vercel. Este documento é gravado conforme os passos são executados, para servir de roteiro aos alunos.

## Dados usados nesta publicação

- **Conta GitHub:** `profjandersonsenai` (e-mail `janderson.s@edu.sc.senai.br`)
- **Nome do repositório:** [`unisenai-store`](https://github.com/profjandersonsenai/unisenai-store)
- **Conta Vercel:** "Janderson's projects" (Hobby), login via "Continue with GitHub", mesmo e-mail
- **URL publicada:** ✅ [unisenai-store.vercel.app](https://unisenai-store.vercel.app/)

### ⚠️ Problema comum: erro 403 "Permission denied" no `git push`

Se o Windows já tiver uma **credencial salva de outra conta GitHub**, o `git push` falha com `403` mesmo a URL do repositório estando certa. Como resolver (Windows):

1. Abra o **Gerenciador de Credenciais do Windows** (pesquisar no menu Iniciar).
2. Vá em **Credenciais do Windows** e procure uma entrada `git:https://github.com`.
3. Remova essa entrada (ou, via terminal: `cmdkey /delete:LegacyGeneric:target=git:https://github.com`).
4. Rode `git push` de novo — vai abrir uma janela do navegador pedindo login no GitHub. Entre com a conta correta.

---

## Passo 1 — Iniciar o Git localmente

Dentro da pasta do projeto (`ecomerce`), no terminal:

```bash
git init
git add .
git commit -m "feat: cria estrutura inicial da UniSENAI Store"
```

## Passo 2 — Criar o repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login com a conta correta.
2. Clique no ícone **"+"** no canto superior direito → **New repository**.
3. Dê um nome ao repositório (ex: `unisenai-store`).
4. **Não marque** "Add a README" nem "Add .gitignore" — o repositório precisa ficar vazio.
5. Clique em **Create repository**.
6. Copie a URL gerada (algo como `https://github.com/SEU_USUARIO/unisenai-store.git`).

## Passo 3 — Conectar e enviar o código (push)

```bash
git remote add origin https://github.com/SEU_USUARIO/unisenai-store.git
git branch -M main
git push -u origin main
```

## Passo 4 — Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login clicando em **Continue with GitHub**.
2. No painel, clique em **Add New... → Project**.
3. Em *Import Git Repository*, localize o repositório criado no Passo 2 e clique em **Import**.
4. Não é necessário alterar nenhuma configuração de build (o projeto é HTML/CSS/JS puro).
5. Clique em **Deploy** e aguarde o processo terminar.
6. A URL pública gerada (ex: `unisenai-store.vercel.app`) fica disponível no painel.

## Passo 5 — Atualizações futuras (fluxo contínuo)

Qualquer alteração enviada (push) e mesclada na branch `main` atualiza automaticamente o link publicado na Vercel — não é preciso repetir o deploy manualmente.

```bash
git add .
git commit -m "descreva a alteração feita"
git push origin main
```

---

> Cada grupo de alunos deve repetir os Passos 1 a 4 com **sua própria conta GitHub** e **seu próprio projeto na Vercel**, gerando uma URL pública individual por grupo.
