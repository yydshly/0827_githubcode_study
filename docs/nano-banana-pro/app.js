(function () {
  "use strict";

  var cases = [
    {
      id: "quote-card",
      number: "01",
      title: "中英文参数化引言卡",
      summary: "把人物肖像、双语文字和版式比例组合成可重复使用的内容模板。",
      image: "../assets/nano-banana-pro/quote-card.jpg",
      alt: "棕色宽幅人物引言卡案例",
      author: "Nicolechan",
      language: "ZH",
      badge: "文字 × 模板",
      categories: ["text", "template", "production"],
      tags: ["文字排版", "变量", "社交内容"],
      proof: "模型不仅生成画面，还能在指定布局中处理标题、作者、双语文字与人物比例；提示词变量使一次性案例具备模板价值。",
      pattern: "先固定版式骨架，再把引言、作者和肖像替换为变量。文字区域、人物区域和渐变过渡应分别描述。",
      prompt: "宽幅引言卡｜肖像占三分之一｜文字占三分之二｜变量：引言、作者｜指定字体气质与背景色。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=151",
      source: "https://x.com/stark_nico99/status/1991718646570426763"
    },
    {
      id: "infographic",
      number: "02",
      title: "液态玻璃产品信息图",
      summary: "在一张 16:9 图片中组织产品、八个信息模块、图标、数据和视觉层级。",
      image: "../assets/nano-banana-pro/liquid-glass-infographic.jpg",
      alt: "液态玻璃风格多模块产品信息图案例",
      author: "Mansi Sanghani",
      language: "EN",
      badge: "信息图 × 布局",
      categories: ["text", "production", "template", "control"],
      tags: ["Bento 布局", "数据", "产品"],
      proof: "它展示了复杂版式、图中文字、产品视觉和多模块信息密度可以在一次任务中协同，是从“艺术图片”走向“功能资产”的代表。",
      pattern: "把信息图拆成数据分析、色板、视觉规则、模块内容和输出规格；为每个模块规定信息类型，不只描述整体风格。",
      prompt: "输入产品与语言｜分析主色｜建立八模块 Bento 网格｜分别规定优势、用法、数据、适用人群和提示｜16:9 输出。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=6847",
      source: "https://x.com/MansiSanghani1/status/2013550795224961492"
    },
    {
      id: "handdrawn-header",
      number: "03",
      title: "参考照片转手绘文章头图",
      summary: "保留上传人物的核心识别特征，同时改变媒介、构图与文章语境。",
      image: "../assets/nano-banana-pro/handdrawn-header.jpg",
      alt: "由人物照片转化的蓝绿色手绘文章头图案例",
      author: "工藤 晶",
      language: "JA",
      badge: "参考图 × 风格化",
      categories: ["reference", "production", "control"],
      tags: ["人物参考", "风格迁移", "封面"],
      proof: "参考图不只用于复刻，也可以承担身份来源；模型可以在保留人物识别度的同时切换到手绘媒介和内容封面场景。",
      pattern: "明确参考图负责“人物身份”，风格词只负责媒介与色彩；再独立规定标题、用途和画幅，避免身份与风格指令互相覆盖。",
      prompt: "参考图锁定人物｜用途：文章头图｜16:9｜简洁手绘｜蓝绿渐变｜指定标题文字。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=498",
      source: "https://x.com/akirakudo_ai/status/1992096860765561190"
    },
    {
      id: "watercolor-map",
      number: "04",
      title: "带州名的德国水彩地图",
      summary: "以极短提示词组合现实知识、地图轮廓、艺术媒介和文字标注。",
      image: "../assets/nano-banana-pro/watercolor-map.jpg",
      alt: "水彩德国地图与州名标注案例",
      author: "Florian Gallwitz",
      language: "DE",
      badge: "知识 × 文字",
      categories: ["text", "production"],
      tags: ["地图", "标注", "教育"],
      proof: "它证明简短提示也可能触发模型的世界知识与文字渲染能力，但同时揭示了事实型视觉最需要人工复核的风险。",
      pattern: "任务、媒介、地理对象和标注方式四项即可形成最小指令；生产使用前必须独立核对边界、名称和位置。",
      prompt: "生成指定国家地图｜水彩媒介｜标注全部行政区名称｜规定标注笔触。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=380",
      source: "https://x.com/FlorianGallwitz/status/1991796624646091091"
    },
    {
      id: "new-year-grid",
      number: "05",
      title: "同一人物的四格新年拼图",
      summary: "同一身份跨四个场景、服装和动作保持一致，同时完成中心拼图与中文文案。",
      image: "../assets/nano-banana-pro/new-year-grid.jpg",
      alt: "同一女性在四色四格中拼出新年祝福的案例",
      author: "松果先森",
      language: "ZH",
      badge: "一致性 × 多面板",
      categories: ["reference", "consistency", "text", "production", "control"],
      tags: ["身份一致性", "四格", "中文"],
      proof: "多面板不是简单拼贴：每格都有独立服装、背景、动作和文字，同时共享同一人物身份和中心叙事关系。",
      pattern: "先写全局身份锁定与网格规则，再逐格描述颜色、服装、动作和文字；最后补充四格之间的连接关系与摄影参数。",
      prompt: "全局锁定人物身份｜2×2 网格｜逐格规定服装、背景、动作和文字｜四块拼图在中心形成完整祝福。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=4031",
      source: "https://x.com/songguoxiansen/status/2005822648027091031"
    },
    {
      id: "identity-portrait",
      number: "06",
      title: "保持身份的薄纱礼服肖像",
      summary: "把身份锁定、服装变量、姿势、光线和镜头拆成独立控制段。",
      image: "../assets/nano-banana-pro/identity-portrait.jpg",
      alt: "冰蓝薄纱礼服人物肖像案例",
      author: "Talia",
      language: "EN",
      badge: "身份 × 商业摄影",
      categories: ["reference", "consistency", "control", "production", "template"],
      tags: ["身份保真", "人像", "镜头"],
      proof: "它展示了高保真人像需要明确列出不可改变的几何身份特征，同时把服装、姿势、背景、光线和镜头作为可替换的表现层。",
      pattern: "身份来源与创意表现分离：先列出必须保留的脸部特征，再参数化礼服颜色、花束和背景，最后设置光学与材质。",
      prompt: "参考图作为唯一身份来源｜禁止美化和重塑｜变量：礼服、花束、背景｜规定姿势、窗光、85mm 与浅景深。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=32193",
      source: "https://x.com/TaliaAariz/status/2090574438043386336"
    },
    {
      id: "glass-turbine",
      number: "07",
      title: "未来感玻璃涡轮发动机",
      summary: "用材质、折射、灯光、镜头和负向约束定义可用于游戏或产品概念的 3D 资产。",
      image: "../assets/nano-banana-pro/glass-turbine.jpg",
      alt: "透明玻璃涡轮与薄荷色光轨的 3D 概念案例",
      author: "Gargeya / Edudojo.ai",
      language: "EN",
      badge: "材质 × 游戏资产",
      categories: ["control", "production", "template"],
      tags: ["3D 材质", "负向约束", "概念设计"],
      proof: "它把抽象的“未来感”拆成磨砂玻璃、阳极氧化金属、焦散、色散、体积光和背景色，使风格变成可执行的材质系统。",
      pattern: "主体结构、材质栈、光效、背景、摄影和禁用项分段描述；负向约束负责清除文字、人物和杂乱环境。",
      prompt: "主体：玻璃涡轮｜材质：折射玻璃与金属｜光效：薄荷色全息轨迹｜镜头：微距与浅景深｜禁用文字、人物和暖色。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=31475",
      source: "https://x.com/GargeyaS/status/2088233557097627959"
    },
    {
      id: "mechanical-whale",
      number: "08",
      title: "地下大教堂与机械鲸鱼",
      summary: "通过主体关系、材质冲突、体积光和电影镜头构造高概念世界观画面。",
      image: "../assets/nano-banana-pro/mechanical-whale.jpg",
      alt: "地下冰晶大教堂中的角色概念场景案例",
      author: "mini singh",
      language: "EN",
      badge: "世界观 × 电影场景",
      categories: ["control", "production"],
      tags: ["概念场景", "体积光", "叙事"],
      proof: "它说明复杂概念画面的关键不只是堆叠形容词，而是建立角色、空间、材质、光源和叙事物件之间的关系。",
      pattern: "先定义高概念场景与核心冲突，再写角色/生物、关键物件、材质、光源、镜头和色彩分级，形成视觉叙事。",
      prompt: "高概念空间｜角色或机械生物｜关键叙事物件｜冲突材质｜体积光｜电影调色｜广角或浅景深。",
      library: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=31355",
      source: "https://x.com/KaminiKamini222/status/2088132331458695315"
    }
  ];

  var anatomy = {
    goal: {
      index: "01 / Goal",
      title: "先说清楚要解决的视觉任务",
      body: "模型需要知道这是一张广告图、文章封面、信息图、角色设定还是概念素材。用途决定信息密度、构图和文字优先级。",
      example: "目标：为移动端文章生成一张 16:9 头图，第一眼识别人物与主题。"
    },
    input: {
      index: "02 / Input",
      title: "给每张参考图分配唯一职责",
      body: "说明哪张图负责人物身份、产品结构、服装、姿势或风格。参考图职责混乱，往往比描述不够长更容易导致错误融合。",
      example: "参考图 A 仅锁定人物身份；参考图 B 仅参考服装；不要复制 B 的人物面部。"
    },
    subject: {
      index: "03 / Subject",
      title: "定义主体、动作与空间关系",
      body: "主体是谁、在哪里、正在做什么，以及不同对象之间如何联系，是场景可读性的基础。",
      example: "主体站在装置右侧，身体微微前倾，视线指向中央产品；背景保持留白。"
    },
    visual: {
      index: "04 / Visual",
      title: "把审美词拆成可执行的视觉参数",
      body: "高级、电影感或未来感都过于抽象。镜头、景别、光源方向、材质、色板和焦点位置更容易被模型执行。",
      example: "85mm 人像镜头，右侧冷色窗光，浅景深，深炭灰背景，薄荷色轮廓光。"
    },
    type: {
      index: "05 / Typography",
      title: "文字内容和版式必须分别约束",
      body: "不仅写出准确文案，还要描述层级、位置、占比、字体气质与留白。长文案和事实数据仍需人工检查。",
      example: "准确显示标题“能力地图”；标题占右侧三分之二，正文置于下方并左对齐。"
    },
    constraint: {
      index: "06 / Constraints",
      title: "显式列出必须保留和禁止改变的内容",
      body: "身份、Logo、产品几何结构或品牌色需要被锁定；负向约束用于排除文字、水印、人物或不需要的环境元素。",
      example: "保持真实脸部比例与肤色；不要美化、年轻化或改变五官；禁止水印与额外文字。"
    },
    output: {
      index: "07 / Output",
      title: "让结果从画面变成可交付资产",
      body: "规定比例、分辨率、数量、背景和平台用途。输出规格是生产提示词与灵感提示词的重要分界。",
      example: "输出 1 张横向 16:9 图片，适用于网页首屏；主体安全区保留在中央 70%。"
    },
    iterate: {
      index: "08 / Iterate",
      title: "每一轮只改变一个高影响变量",
      body: "多轮编辑时明确只修改哪一项，并锁定其他内容。这样才能判断光线、构图或文字变化是否真正改善结果。",
      example: "仅将光线改为夜景霓虹；人物、姿势、镜头、服装与构图保持完全不变。"
    }
  };

  var grid = document.getElementById("case-grid");
  var count = document.getElementById("result-count");
  var empty = document.getElementById("empty-state");
  var search = document.getElementById("case-search");
  var reset = document.getElementById("reset-filter");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var capabilityButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-target]"));
  var activeFilter = "all";
  var lastDialogTrigger = null;

  function caseMatches(item) {
    var query = search.value.trim().toLowerCase();
    var matchesFilter = activeFilter === "all" || item.categories.indexOf(activeFilter) !== -1;
    var haystack = [item.title, item.summary, item.author, item.badge].concat(item.tags).join(" ").toLowerCase();
    return matchesFilter && (!query || haystack.indexOf(query) !== -1);
  }

  function createTag(label) {
    return '<span class="tag">' + label + "</span>";
  }

  function renderCases() {
    var visible = cases.filter(caseMatches);
    grid.innerHTML = visible.map(function (item) {
      return [
        '<article class="case-card">',
        '<button class="case-card__open" type="button" data-case-id="' + item.id + '" aria-label="查看案例：' + item.title + '">',
        '<span class="case-card__media">',
        '<img src="' + item.image + '" alt="' + item.alt + '" loading="lazy">',
        '<span class="case-card__badge">' + item.badge + "</span>",
        "</span>",
        '<span class="case-card__body">',
        '<span class="case-card__meta"><span>CASE ' + item.number + "</span><span>" + item.language + "</span></span>",
        "<h3>" + item.title + "</h3>",
        "<p>" + item.summary + "</p>",
        '<span class="case-card__footer">',
        '<span class="case-card__tags">' + item.tags.slice(0, 2).map(createTag).join("") + "</span>",
        '<span class="case-card__arrow" aria-hidden="true">↗</span>',
        "</span>",
        "</span>",
        "</button>",
        "</article>"
      ].join("");
    }).join("");

    count.textContent = "SHOWING " + visible.length + " / " + cases.length + " CURATED CASES";
    empty.hidden = visible.length !== 0;
    grid.hidden = visible.length === 0;

    Array.prototype.slice.call(grid.querySelectorAll("[data-case-id]")).forEach(function (button) {
      button.addEventListener("click", function () {
        openDialog(button.dataset.caseId, button);
      });
    });

    Array.prototype.slice.call(grid.querySelectorAll("img")).forEach(function (image) {
      image.addEventListener("error", function () {
        image.hidden = true;
        image.parentElement.classList.add("is-missing");
        image.parentElement.setAttribute("data-fallback", "案例图片暂时不可用");
      });
    });
  }

  function setFilter(filter, shouldScroll) {
    activeFilter = filter;
    filterButtons.forEach(function (button) {
      var active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCases();
    if (shouldScroll) {
      document.getElementById("cases").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setFilter(button.dataset.filter, false);
    });
  });

  capabilityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setFilter(button.dataset.filterTarget, true);
    });
  });

  search.addEventListener("input", renderCases);
  reset.addEventListener("click", function () {
    search.value = "";
    setFilter("all", false);
    search.focus();
  });

  var dialog = document.getElementById("case-dialog");
  var dialogClose = document.getElementById("dialog-close");

  function openDialog(id, trigger) {
    var item = cases.find(function (entry) { return entry.id === id; });
    if (!item) {
      return;
    }
    lastDialogTrigger = trigger;
    document.getElementById("dialog-image").src = item.image;
    document.getElementById("dialog-image").alt = item.alt;
    document.getElementById("dialog-caption").textContent = "案例图片 · 作者：" + item.author;
    document.getElementById("dialog-kicker").textContent = "CASE " + item.number + " / " + item.badge;
    document.getElementById("dialog-title").textContent = item.title;
    document.getElementById("dialog-summary").textContent = item.summary;
    document.getElementById("dialog-proof").textContent = item.proof;
    document.getElementById("dialog-pattern").textContent = item.pattern;
    document.getElementById("dialog-prompt").textContent = item.prompt;
    document.getElementById("dialog-tags").innerHTML = item.tags.map(createTag).join("");
    document.getElementById("dialog-library").href = item.library;
    document.getElementById("dialog-source").href = item.source;
    dialog.showModal();
    dialogClose.focus();
  }

  dialogClose.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    var rect = dialog.getBoundingClientRect();
    var inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    if (lastDialogTrigger) {
      lastDialogTrigger.focus();
    }
  });

  var anatomyButtons = Array.prototype.slice.call(document.querySelectorAll("[data-anatomy]"));
  var anatomyDetail = document.getElementById("anatomy-detail");

  function renderAnatomy(key) {
    var item = anatomy[key];
    anatomyButtons.forEach(function (button) {
      var active = button.dataset.anatomy === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    anatomyDetail.innerHTML = [
      '<span class="anatomy__detail-index">' + item.index + "</span>",
      "<div>",
      "<h3>" + item.title + "</h3>",
      "<p>" + item.body + "</p>",
      '<div class="anatomy-example">' + item.example + "</div>",
      "</div>"
    ].join("");
  }

  anatomyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      renderAnatomy(button.dataset.anatomy);
    });
  });

  var themeToggle = document.getElementById("theme-toggle");

  function updateThemeControl() {
    var isLight = document.documentElement.dataset.theme === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "切换为深色主题" : "切换为浅色主题");
  }

  themeToggle.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("nbp-theme", next);
    updateThemeControl();
  });

  renderCases();
  renderAnatomy("goal");
  updateThemeControl();
}());
