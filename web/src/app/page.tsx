const steps = [
  {
    title: "1. Register Your Bot",
    summary:
      "Talk to @BotFather in Telegram to generate a token that will authenticate your bot with the Bot API.",
    details: [
      "Open Telegram, search for @BotFather, and start a chat.",
      "Send the command /newbot and follow the prompts to choose a name and username.",
      "Copy the HTTP API token BotFather returns; you need it in every request.",
    ],
  },
  {
    title: "2. Choose a Runtime",
    summary:
      "Pick any HTTP-capable environment (Node.js, Deno, Python, Go, etc.). Below is a minimal Express server in Node.js.",
    details: [
      "Install dependencies: yarn add express node-telegram-bot-api",
      "Expose a webhook endpoint or use long polling while prototyping.",
    ],
    code: {
      language: "ts",
      title: "app.ts (Long Polling)",
      content: `import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text?.trim() ?? "";

  if (/^\\/start/.test(text)) {
    bot.sendMessage(msg.chat.id, "Welcome to the bot! Try /help");
    return;
  }

  if (/^\\/help/.test(text)) {
    bot.sendMessage(
      msg.chat.id,
      "Commands:\\n/start - Welcome\\n/help - Docs link\\n/echo - Repeat"
    );
    return;
  }

  if (/^\\/echo/.test(text)) {
    bot.sendMessage(msg.chat.id, text.replace("/echo", "").trim());
    return;
  }

  bot.sendMessage(msg.chat.id, "Send /help to see what I can do.");
});`,
    },
  },
  {
    title: "3. Secure Configuration",
    summary:
      "Keep secrets out of source control and configure secure infrastructure before exposing the bot.",
    details: [
      "Store BOT_TOKEN and other secrets in environment variables or a secrets manager.",
      "Rotate tokens if you suspect exposure; BotFather can revoke and refresh instantly.",
      "Validate incoming updates when using webhooks to block spoofed requests.",
    ],
  },
  {
    title: "4. Pick Delivery Strategy",
    summary:
      "Long polling is easy but limited. Webhooks are resilient and required at scale.",
    details: [
      "Long polling: your server requests updates every ~30 seconds. Great for prototypes and local development.",
      "Webhooks: Telegram pushes updates to your HTTPS endpoint. Requires a publicly reachable URL and TLS cert.",
      "Serverless platforms (Vercel/Cloudflare Workers) work well with webhooks using lightweight frameworks.",
    ],
  },
  {
    title: "5. Design Conversational Flows",
    summary:
      "Define user goals, split them into states, and keep responses short, clear, and actionable.",
    details: [
      "Write sample conversations; treat each message as a state transition.",
      "Persist user state (Redis, Upstash, Firestore, Supabase, etc.) for multi-step journeys.",
      "Use reply keyboards and inline buttons to guide users and avoid free-form text when possible.",
    ],
  },
  {
    title: "6. Test & Deploy",
    summary:
      "Automate validation, monitor uptime, and ship confidently to production.",
    details: [
      "Add unit tests around command handlers and integrations.",
      "Use staging bots to trial new flows before promoting them.",
      "Monitor errors (Sentry, Logtail) and metrics (Prometheus, Grafana, or hosted services).",
    ],
  },
];

const architectureTips = [
  {
    title: "Handling High Throughput",
    bullets: [
      "Scale horizontally by sharding updates per bot or chat id.",
      "Offload heavy work to background queues (BullMQ, RabbitMQ).",
      "Cache expensive API responses (weather, pricing) to stay responsive.",
    ],
  },
  {
    title: "User Experience",
    bullets: [
      "Answer within 2 seconds to avoid Telegram’s typing indicator fallback.",
      "Use sendChatAction to show typing/uploading when tasks take longer.",
      "Always include a fallback /help path and human handoff instructions.",
    ],
  },
  {
    title: "Safety & Compliance",
    bullets: [
      "Rate-limit outbound messages to comply with Telegram’s limits.",
      "Log user consent when collecting personal data; respect GDPR/local laws.",
      "Sanitize user input before forwarding to external APIs or storage.",
    ],
  },
];

const launchChecklist = [
  "Load test using Telegram's getUpdates replay or custom mocks.",
  "Set up downtime alerts for your webhook endpoint.",
  "Schedule token rotation and secrets review.",
  "Plan customer support workflows for escalations.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(15,23,42,0))]" />
        <header className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-24 pt-20 sm:px-10">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-300">
            Telegram Bot Playbook
          </p>
          <h1 className="text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Build, launch, and scale a Telegram bot with confidence.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
            Follow this battle-tested roadmap—from BotFather registration to
            production monitoring—and ship an engaging Telegram automation in
            hours instead of weeks.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-md bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/50 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              href="#playbook"
            >
              Explore the Playbook
            </a>
            <a
              className="rounded-md border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-300 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              href="#resources"
            >
              Jump to Resources
            </a>
          </div>
        </header>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-24 sm:px-10">
        <section
          id="playbook"
          className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur"
        >
          <div>
            <h2 className="text-2xl font-semibold text-sky-200 sm:text-3xl">
              Six-Step Playbook
            </h2>
            <p className="mt-2 text-base text-slate-300">
              Each phase highlights best practices and pitfalls so you can move
              fast without sacrificing reliability.
            </p>
          </div>

          <div className="grid gap-6">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-slate-800 bg-slate-950/40 px-6 py-6 shadow-lg shadow-slate-950/40 transition hover:border-sky-400/60"
              >
                <h3 className="text-lg font-semibold text-sky-200">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-200">{step.summary}</p>
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-slate-300">
                  {step.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {step.code ? (
                  <div className="mt-5 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/90">
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                      <span>{step.code.title}</span>
                      <span>{step.code.language}</span>
                    </div>
                    <pre className="overflow-x-auto bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
                      <code>{step.code.content}</code>
                    </pre>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur">
          <h2 className="text-2xl font-semibold text-sky-200 sm:text-3xl">
            Architecture Cheat Sheet
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {architectureTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-slate-800 bg-slate-950/40 px-5 py-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                  {tip.title}
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
                  {tip.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-sky-200 sm:text-3xl">
                Launch Checklist
              </h2>
              <p className="mt-2 text-base text-slate-300">
                Run through these safeguards before inviting real users.
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {launchChecklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-4 text-sm text-slate-200"
              >
                <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-400/20 text-sky-300">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="resources"
          className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur"
        >
          <div>
            <h2 className="text-2xl font-semibold text-sky-200 sm:text-3xl">
              Further Resources
            </h2>
            <p className="mt-2 text-base text-slate-300">
              Deepen your expertise with official documentation, SDKs, and
              production-ready tooling.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-sky-400/60 hover:text-sky-200"
              href="https://core.telegram.org/bots"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                Core Bot API
              </span>
              <p className="text-sm text-slate-300">
                Official documentation for every method, update type, and best
                practice recommendation from Telegram.
              </p>
            </a>
            <a
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-sky-400/60 hover:text-sky-200"
              href="https://python-telegram-bot.org/"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                python-telegram-bot
              </span>
              <p className="text-sm text-slate-300">
                Mature Python SDK featuring async support, webhook helpers, and
                conversation handlers.
              </p>
            </a>
            <a
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-sky-400/60 hover:text-sky-200"
              href="https://grammY.dev/"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                grammY (TypeScript)
              </span>
              <p className="text-sm text-slate-300">
                Lightweight, middleware-driven framework ideal for modern
                TypeScript codebases and serverless deployments.
              </p>
            </a>
            <a
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-sky-400/60 hover:text-sky-200"
              href="https://core.telegram.org/bots/webapps"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                Telegram Web Apps
              </span>
              <p className="text-sm text-slate-300">
                Extend bots with interactive web UIs embedded directly inside
                chats and launched with a single tap.
              </p>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            Ready to ship? Redeploy whenever you iterate on your bot—Telegram
            users love fast iteration cycles.
          </p>
          <a
            className="text-sky-300 underline-offset-4 transition hover:text-sky-200 hover:underline"
            href="#playbook"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
