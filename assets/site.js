(function () {
  const site = window.SANMEN_SITE;
  const pageId = document.body.dataset.page;
  const page = site.pages.find((item) => item.id === pageId);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    nav.innerHTML = site.pages.map((item) => `
      <a class="${item.id === pageId ? "nav-link active" : "nav-link"}" href="${item.file}">
        ${escapeHtml(item.navLabel || item.version)}
      </a>
    `).join("");
  }

  function pageTheme(item) {
    return item.id.startsWith("race") ? "race-theme" : "camp-theme";
  }

  function renderIndex() {
    const root = document.querySelector("[data-root]");
    const camp = site.pages.filter((item) => item.id.startsWith("camp"));
    const race = site.pages.filter((item) => item.id.startsWith("race"));
    root.innerHTML = `
      <section class="index-hero">
        <div class="index-hero-media" aria-hidden="true"></div>
        <div class="index-hero-copy">
          <span class="kicker">三门山顶营地 x 嗨誓三门赛事品牌</span>
          <h1>6 篇公众号成稿，分别让企业想来，让跑者想跑。</h1>
          <p>露营节写给企业团队，越野赛写给跑者和商学院队伍。点开就是完整图文，不需要再把内容补成文章。</p>
        </div>
      </section>
      <section class="index-section">
        <div class="index-heading">
          <h2>6 篇公众号成稿入口</h2>
          <p>每一篇都按公众号阅读节奏完成：标题、首屏、信息卡、正文、流程、图片、FAQ 和行动引导已经放好。</p>
        </div>
        <div class="version-board">
          ${[...camp, ...race].map((item) => `
            <a class="version-card ${pageTheme(item)}" href="${item.file}">
              <span>${escapeHtml(item.group)}</span>
              <strong>${escapeHtml(item.version)}</strong>
              <em>${escapeHtml(item.title)}</em>
              <small>${escapeHtml(item.subtitle)}</small>
            </a>
          `).join("")}
        </div>
      </section>
      <section class="index-section two-col">
        <article>
          <h2>露营节怎么读</h2>
          <p>先看传播版判断员工和朋友圈是否愿意转发，再看企业主/HR 版判断采购理由，最后看沉浸版感受现场体验。</p>
        </article>
        <article>
          <h2>越野赛怎么读</h2>
          <p>先看报名传播版判断组别，再看商学院/合作方版判断团队与合作价值，最后看跑者沉浸版判断两天背靠背训练感。</p>
        </article>
      </section>
      <section class="index-section reference-panel">
        <h2>阅读顺序</h2>
        <p>企业团建先看露营节传播版，判断团队愿不愿意来；赛事报名先看越野赛报名版，判断自己适合哪一组。</p>
      </section>
    `;
  }

  function renderCards(cards) {
    return `
      <section class="article-info-grid" aria-label="文章信息卡">
        ${cards.map((card) => `
          <article class="info-card">
            <span>${escapeHtml(card.label)}</span>
            <strong>${escapeHtml(card.value)}</strong>
            <p>${escapeHtml(card.text)}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderRaceEssentials(item) {
    if (!item.id.startsWith("race")) return "";
    return `
      <section class="race-essentials" aria-label="2026 嗨誓三门越野赛基础信息">
        <h2>2026 嗨誓三门越野赛基础信息</h2>
        <div class="race-essentials-grid">
          <article><span>时间地点</span><strong>2026 年 12 月 5-6 日，浙江省台州市三门县</strong></article>
          <article><span>大众组别</span><strong>10 公里入门组、21 公里初级组、41 公里大众挑战组</strong></article>
          <article><span>商学院团队组</span><strong>D1 21 公里到枧星空，D2 33 公里从枧星空回亭旁古城门</strong></article>
          <article><span>团队规则</span><strong>10 人一组，至少 2 名女生，女生减时，取每天第六名成绩两天相加</strong></article>
        </div>
      </section>
    `;
  }

  function renderBlock(block) {
    if (block.type === "section") {
      return `
        <section class="article-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.lead ? `<p class="lead">${escapeHtml(block.lead)}</p>` : ""}
          ${block.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </section>
      `;
    }

    if (block.type === "image") {
      return `
        <figure class="article-figure">
          <img src="${escapeHtml(block.image)}" alt="${escapeHtml(block.alt || block.title)}">
          <figcaption><strong>${escapeHtml(block.title)}</strong>${block.caption ? `<span>${escapeHtml(block.caption)}</span>` : ""}</figcaption>
        </figure>
      `;
    }

    if (block.type === "video") {
      return `
        <section class="video-section">
          <h2>${escapeHtml(block.title)}</h2>
          <video controls preload="metadata" src="${escapeHtml(block.src)}"></video>
          ${block.caption ? `<p>${escapeHtml(block.caption)}</p>` : ""}
        </section>
      `;
    }

    if (block.type === "timeline") {
      return `
        <section class="article-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.lead ? `<p class="lead">${escapeHtml(block.lead)}</p>` : ""}
          <div class="timeline">
            ${block.items.map((item) => `
              <article class="timeline-item">
                <span>${escapeHtml(item.time)}</span>
                <div>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.text)}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (block.type === "table") {
      return `
        <section class="article-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.lead ? `<p class="lead">${escapeHtml(block.lead)}</p>` : ""}
          <div class="table-wrap">
            <table>
              <thead>
                <tr>${block.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${block.rows.map((row) => `
                  <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
      `;
    }

    if (block.type === "stations") {
      return `
        <section class="article-block station-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.lead ? `<p class="lead">${escapeHtml(block.lead)}</p>` : ""}
          <div class="station-grid">
            ${block.items.map((item, index) => `
              <article class="station-card">
                <span>${escapeHtml(item.label || `第 ${index + 1} 站`)}</span>
                <h3>${escapeHtml(item.name)}</h3>
                <p>${escapeHtml(item.reason)}</p>
                <ul>
                  ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (block.type === "checklist") {
      return `
        <section class="article-block punch-list">
          <h2>${escapeHtml(block.title)}</h2>
          <ul>
            ${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `;
    }

    if (block.type === "quote") {
      return `
        <blockquote class="article-quote">
          <p>${escapeHtml(block.text)}</p>
          ${block.by ? `<cite>${escapeHtml(block.by)}</cite>` : ""}
        </blockquote>
      `;
    }

    if (block.type === "faq") {
      return `
        <section class="article-block faq-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.items.map((item) => `
            <details>
              <summary>${escapeHtml(item.q)}</summary>
              <p>${escapeHtml(item.a)}</p>
            </details>
          `).join("")}
        </section>
      `;
    }

    return "";
  }

  function renderPage() {
    const root = document.querySelector("[data-root]");
    document.body.classList.add(pageTheme(page));
    const heroImage = page.heroImage;
    root.innerHTML = `
      <article class="wechat-article">
        <header class="article-hero" style="--hero-image: url('${escapeHtml(heroImage)}')">
          <div class="article-hero-copy">
            <span class="kicker">${escapeHtml(page.group)} | ${escapeHtml(page.version)}</span>
            <h1>${escapeHtml(page.title)}</h1>
            <p>${escapeHtml(page.subtitle)}</p>
            <a class="primary-action" href="#cta">${escapeHtml(page.cta)}</a>
          </div>
        </header>

        <section class="article-proof" aria-label="核心亮点">
          ${page.proof.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </section>

        ${renderCards(page.cards)}
        ${renderRaceEssentials(page)}

        <div class="article-body">
          ${page.blocks.map(renderBlock).join("")}
          <section id="cta" class="final-cta">
            <h2>${escapeHtml(page.cta)}</h2>
            <p>${escapeHtml(page.closing || "把这篇发给同伴，先把想参加的人聚起来。")}</p>
            <a class="secondary-action" href="index.html">返回 6 篇入口</a>
          </section>
        </div>
      </article>
    `;
  }

  renderNav();
  if (pageId === "index") renderIndex();
  if (page) renderPage();
})();
