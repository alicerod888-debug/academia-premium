# Site premium para academia

Next.js 15 (App Router, TypeScript) + Tailwind CSS 3 + Framer Motion 12.
Preto `#080808` e dourado `#D4AF37`. Gerado como **site estático** (`output: "export"`), pronto para **GitHub + Cloudflare Pages**. Não usa Vercel.

> **Status honesto:** o código foi escrito e a sintaxe conferida, mas `npm install` e `npm run build` **ainda não foram executados** (o ambiente de criação não tem internet). O projeto **não está publicado**. Siga "Primeira verificação" abaixo antes de publicar.

## 1. Primeira verificação (no seu computador)

Requisitos: Node 20+ (recomendado 22) e Git.

```bash
npm install          # gera o package-lock.json (commite esse arquivo)
npm run typecheck    # confere os tipos
npm run dev          # http://localhost:3000
npm run build        # gera a pasta ./out (o que a Cloudflare publica)
```

Se aparecer qualquer erro no `typecheck` ou no `build`, corrija antes de enviar ao GitHub.

## 2. Editar o conteúdo

Tudo fica em **`lib/site.config.ts`**: nome, WhatsApp, endereço, horários, redes sociais, modalidades, planos (preços), números, depoimentos e imagens.

- **WhatsApp**: `whatsapp.number` com DDI+DDD, só dígitos (ex.: `5571999999999`). Enquanto estiver vazio, os botões levam ao formulário de contato.
- **Preços**: campo `price` de cada plano (ex.: `"129,90"`). Vazio mostra "Consulte".
- **Endereço e mapa**: preencha `address` e `address.mapQuery` (o mapa só aparece com esse campo preenchido).
- **Redes sociais**: só aparecem as que tiverem link.
- **Fotos e vídeo**: coloque os arquivos em `public/images/` e informe o caminho (ex.: `"/images/musculacao.jpg"`). Campo vazio = arte dourada gerada no código, então nada fica quebrado.
- **Números e depoimentos** vêm como demonstração (`demo: true`). Troque pelos dados reais e mude para `false`.
- Todos os textos são genéricos e provisórios. Revise tudo antes de publicar.

## 3. Enviar para o GitHub

```bash
git init
git add .
git commit -m "Site da academia"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

## 4. Conectar o GitHub à Cloudflare e fazer o primeiro deploy

1. Entre em <https://dash.cloudflare.com> e vá em **Workers & Pages**.
2. **Create application** > aba **Pages** > **Connect to Git**.
3. Autorize o GitHub e escolha o repositório.
4. Em **Set up builds and deployments**:
   - Production branch: `main`
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
5. Em **Environment variables**, adicione `NEXT_PUBLIC_SITE_URL` com a URL final (ex.: `https://seu-projeto.pages.dev`). O arquivo `.node-version` já fixa o Node 22.
6. Clique em **Save and Deploy**. Acompanhe o build; no fim, a Cloudflare mostra o endereço `*.pages.dev`.

**Atualização automática:** cada `git push` na branch `main` dispara novo build e publica. Outras branches e pull requests geram prévias.

**Domínio próprio:** projeto no Pages > **Custom domains** > **Set up a domain**.

> Observação: a Cloudflare tem recomendado Workers para projetos Next.js novos, mas o Pages com export estático continua documentado e funciona para este site, que não precisa de servidor. O adaptador `@cloudflare/next-on-pages` está descontinuado e **não** é usado aqui.

### Deploy direto pelo terminal (opcional)

```bash
npx wrangler login
npm run deploy
```

## 5. Compatibilidade com a Cloudflare

- Export estático: sem rotas de API, middleware, Server Actions ou ISR.
- Imagens com `images.unoptimized: true` (o otimizador do Next precisa de servidor).
- Fontes (Barlow Condensed e Manrope) são baixadas no build via `next/font`, sem requisição externa em tempo de execução.
- Formulário: não há servidor. Ele monta a mensagem e abre o **WhatsApp** (ou o e-mail, se não houver WhatsApp). Nenhum dado é guardado. Para receber envios em um painel, use um serviço de formulários ou Pages Functions.
- `public/_headers` define cabeçalhos de segurança e cache.
- `wrangler.toml` informa `pages_build_output_dir = "./out"`.

## 6. Acessibilidade e desempenho

- `prefers-reduced-motion` respeitado (Framer Motion via `MotionConfig` e CSS).
- Navegação por teclado, foco visível, link "Ir para o conteúdo", `aria-*` no menu, galeria e carrossel.
- Animações de scroll usam `transform` e `opacity`; imagens abaixo da dobra carregam sob demanda.

## 7. Estrutura

```
app/            layout, página, SEO (robots, sitemap), 404, ícone
components/     Hero, About, Modalities, Facilities, Plans, Results,
                Testimonials, Contact, Footer, WhatsAppFloat, etc.
lib/            site.config.ts (conteúdo) e utils.ts
public/         _headers e images/
wrangler.toml   configuração Cloudflare Pages
```

Imagem de compartilhamento (Open Graph): adicione `public/og.jpg` (1200x630) e referencie em `app/layout.tsx` se quiser prévia nas redes.
