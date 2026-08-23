# Dr Sorgenstein — GitHub Pages Website

A static, responsive artist website for **Dr Sorgenstein**, with latest-release cards, an embedded Spotify artist player, a mailing list, and a secure optional OpenAI-powered virtual host.

## Included

- `index.html` — website
- `assets/styles.css` — responsive design
- `assets/app.js` — chat UI and site behavior
- `assets/config.js` — public chat endpoint configuration
- `.github/workflows/deploy.yml` — GitHub Pages deployment
- `worker/worker.js` — secure Cloudflare Worker for OpenAI chat
- `worker/wrangler.toml.example` — Worker configuration starter
- `.nojekyll` — prevents unwanted Jekyll processing

## 1. Publish the website on GitHub Pages

1. Create a new GitHub repository, for example `dr-sorgenstein`.
2. Upload **the contents of this folder** to the repository root.
3. Commit/push to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select **GitHub Actions**.
6. The included workflow deploys the site.

A project Pages URL normally looks like:

`https://YOUR-USERNAME.github.io/dr-sorgenstein/`

If your repository is named `YOUR-USERNAME.github.io`, it can publish at the root user-site URL instead.

## 2. Important: the OpenAI key cannot live on GitHub Pages

GitHub Pages serves public static files. Never place an OpenAI API key in:

- `index.html`
- `assets/app.js`
- `assets/config.js`
- a public GitHub secret exposed to browser JavaScript

The included `worker/` folder is a small server-side proxy intended for Cloudflare Workers. You can substitute another secure serverless host if you prefer.

## 3. Deploy the AI host with Cloudflare Workers

Install Wrangler locally:

```bash
npm install -g wrangler
```

Then:

```bash
cd worker
cp wrangler.toml.example wrangler.toml
wrangler login
wrangler secret put OPENAI_API_KEY
wrangler deploy
```

When prompted for the secret, paste your OpenAI API key.

For tighter CORS security, add your GitHub Pages origin to `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGIN = "https://YOUR-USERNAME.github.io"
```

Then deploy again:

```bash
wrangler deploy
```

## 4. Connect the website to the Worker

Cloudflare will provide a URL similar to:

`https://dr-sorgenstein-ai.YOUR-SUBDOMAIN.workers.dev`

Open `assets/config.js` and set:

```js
window.DR_SORGENSTEIN_CHAT_API = "https://dr-sorgenstein-ai.YOUR-SUBDOMAIN.workers.dev";
```

Commit and push. GitHub Pages will redeploy automatically.

## 5. OpenAI model

The Worker uses `gpt-5.6-luna`, a cost-sensitive OpenAI model suitable for a lightweight promotional host. You can change the model in `worker/worker.js`.

The Worker uses the OpenAI **Responses API** and keeps the API key server-side.

## AI identity policy built into this package

The virtual host is deliberately instructed to say that it is an AI host rather than falsely claiming to be Christopher Sorge. It can still use an approved Dr Sorgenstein promotional voice, discuss public background information, promote streaming links, and interact naturally with listeners.

## Before launch

Recommended edits:

- Add album/single cover images when desired.
- Add a custom domain if desired.
- Review the AI system prompt in `worker/worker.js`.
- Add rate limiting / Turnstile if traffic becomes substantial.
- Add analytics only after choosing a privacy approach.
- Keep private contact details, credentials, API keys, and personal information out of the public repository.

## Official links used

- Spotify: https://open.spotify.com/artist/2SFsYUDGjCts1vVSDQ9dM8
- Apple Music: https://music.apple.com/ca/artist/dr-sorgenstein/6781882644
- YouTube: https://youtube.com/channel/UCXnVhS2m0jiWCmphUm29g2g
- LinkedIn: https://www.linkedin.com/in/christophersorge/


## Latest releases

The site includes dedicated release cards for:

- **Carve That Frown** — uses the verified saved cover bundled at `assets/carve-that-frown.png`.
- **Skin Diggers** — uses a clearly marked pre-release design treatment until the distributor publishes the official platform artwork and track URL.

The embedded Spotify artist player uses the official artist ID and therefore retrieves currently live Spotify catalog presentation directly from Spotify.

### Add individual Spotify track embeds later

Once a distributor provides a Spotify track URL such as:

`https://open.spotify.com/track/ABC123...`

use the track ID in:

```html
<iframe
  src="https://open.spotify.com/embed/track/TRACK_ID"
  width="100%"
  height="152"
  frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```

## Mailing list setup

The package stores subscribers in a **Cloudflare KV namespace** through the same secure Worker used by the AI host. This avoids exposing API credentials in GitHub Pages.

Create the namespace:

```bash
cd worker
wrangler kv namespace create SUBSCRIBERS
```

Wrangler returns a namespace ID. Add it to your local `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "SUBSCRIBERS"
id = "YOUR_KV_NAMESPACE_ID"
```

Then deploy:

```bash
wrangler deploy
```

The mailing form posts to:

`YOUR_WORKER_URL/subscribe`

Subscribers are stored with consent timestamp and signup source. Their email address is stored in the value; the KV key itself is a SHA-256 digest rather than the plain email address.

### Privacy note

Before actively marketing at scale, publish a privacy policy explaining what subscriber data is collected, why it is collected, how it is stored, how users can unsubscribe, and how users can request deletion. If you later use Mailchimp, ConvertKit, Buttondown, MailerLite, Brevo, or another provider, the form can be redirected to that provider instead.

## Configure the single public Worker URL

In `assets/config.js`:

```js
window.DR_SORGENSTEIN_API = "https://dr-sorgenstein-ai.YOUR-SUBDOMAIN.workers.dev";
```

That single endpoint enables both:

- AI fan chat at the Worker root
- newsletter signup at `/subscribe`
