(function () {
  "use strict";

  var experiments = [
    {
      id: "E01",
      route: "content",
      routeLabel: "A · 内容与文字",
      title: "中文引语卡",
      hypothesis: "明确逐字文案、层级、对齐与禁用项，可以得到准确且可用的中文排版。",
      input: "无需参考图",
      success: "文案与标点准确；没有额外文字；4:5 缩略图仍可读。",
      source: "上游案例 #151",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=151",
      image: "../assets/nano-banana-pro/e01-baseline.png",
      status: "gemini",
      prompt: `请生成一张竖版 4:5 中文引语海报。

必须逐字呈现以下文字，不得改写、增删或生成其他文字：

主文案：
“把复杂的问题，拆成可以验证的小问题。”

署名：
研究笔记 01

版式要求：
- 暖象牙白背景
- 黑色中文粗体作为主视觉
- 少量芥末黄色用于强调“验证”两个字
- 主文案左对齐，位于画面中上部
- 署名使用较小字号，放在主文案下方
- 保留充足留白，现代编辑设计风格

禁止：人物、插画、英文、Logo、水印或装饰性乱码。
验收：中文和标点完全准确，缩略图状态下仍能清楚阅读。`
    },
    {
      id: "E02",
      route: "content",
      routeLabel: "A · 内容与文字",
      title: "虚构产品信息图",
      hypothesis: "先固定信息内容和模块职责，再描述视觉风格，能够降低高密度信息图的遗漏。",
      input: "无需参考图；产品为虚构测试对象",
      success: "6 个模块完整；所有数字逐字准确；没有模型自行补充的数据。",
      source: "上游案例 #6847",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=6847",
      image: "../assets/nano-banana-pro/e02-first-result.png",
      status: "gemini",
      prompt: `为虚构产品“VoiceNote Mini”制作一张横向 16:9 中文产品信息图。

必须准确显示：
- 标题：VoiceNote Mini
- 副标题：把每次讨论变成可检索的笔记
- 48 小时续航
- 32 GB 本地存储
- 支持 120 种语言
- 三步流程：录音 → 转写 → 摘要
- CTA：开始记录

布局：使用 6 个清楚分隔的 Bento 信息模块，产品位于中央偏左，信息从左上向右下阅读。
视觉：半透明液态玻璃卡片、冷灰背景、薄荷绿色强调、简洁线性图标。
禁止：添加未提供的数据、英文说明、价格、评价星级或装饰性乱码。
验收：所有中文、数字、单位和箭头顺序必须准确。`
    },
    {
      id: "E03",
      route: "content",
      routeLabel: "A · 内容与文字",
      title: "德国州名水彩地图",
      hypothesis: "把必须准确的事实清单与允许自由发挥的艺术媒介分开，可以暴露知识可视化的真实风险。",
      input: "无需参考图；生成后必须独立核验地图",
      success: "16 个州名完整可读；位置大体合理；不出现额外州名。",
      source: "上游案例 #380",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=380",
      image: "../assets/nano-banana-pro/e03-codex-demo.jpg",
      status: "codex",
      prompt: `生成一张竖版德国水彩地图，用细墨线表示州界，并标注全部 16 个联邦州。

必须使用以下德文名称，不得翻译或改写：
Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein, Thüringen。

视觉：柔和水彩晕染、象牙白纸张、深灰手写体标注；每个州使用不同但协调的低饱和颜色。
禁止：国旗、城市名、邻国名称、额外说明文字。
验收：州名数量为 16，拼写准确；地图边界和标签位置需要人工复核。`
    },
    {
      id: "E04",
      route: "reference",
      routeLabel: "B · 参考与一致性",
      title: "照片转手绘文章头图",
      hypothesis: "把参考图只用于人物身份，并单独规定媒介和用途，可以减少风格迁移时的语义漂移。",
      input: "需要上传 1 张清晰人物照片",
      success: "人物可识别；姿态关系保留；风格改变但没有替换身份。",
      source: "上游案例 #498",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=498",
      image: "../assets/nano-banana-pro/e04-codex-demo.jpg",
      status: "codex",
      prompt: `请使用我上传的照片制作一张横向 16:9 文章头图。

参考图职责：只锁定人物身份、发型主体特征、脸部比例和视线方向。
允许改变：绘画媒介、背景、服装细节和整体配色。

标题必须准确显示：把复杂的知识，画成看得懂的图
构图：人物位于右侧三分之一，标题位于左侧，保留网页裁切安全区。
视觉：蓝绿色水彩与铅笔线稿，纸张纹理，清爽编辑插画风格。
禁止：改变年龄、替换人物、增加其他人物、英文、Logo 或水印。`
    },
    {
      id: "E05",
      route: "reference",
      routeLabel: "B · 参考与一致性",
      title: "身份保持商业肖像",
      hypothesis: "把不可变身份特征、允许修改项和禁止项分开声明，有助于控制商业肖像重绘。",
      input: "需要上传 1 张正面人物照片",
      success: "身份稳定；只改变服装与灯光；没有年轻化或五官重塑。",
      source: "上游案例 #32193",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=32193",
      image: "../assets/nano-banana-pro/e05-codex-demo.jpg",
      status: "codex",
      prompt: `使用我上传的人物照片生成一张竖版 4:5 商业肖像。

必须保留：人物身份、脸部骨骼、五官比例、真实年龄、肤色和发型主体特征。
唯一创意变化：换成冰蓝色薄纱礼服，并加入同色小型花束。

摄影：85mm 人像镜头，胸像，右侧柔和窗光，深炭灰背景，浅景深，真实皮肤纹理。
禁止：美化或重塑五官、年轻化、改变体型、增加首饰、文字、Logo、水印或其他人物。
验收：即使遮住服装，仍能确认是参考图中的同一人物。`
    },
    {
      id: "E06",
      route: "reference",
      routeLabel: "B · 参考与一致性",
      title: "同一人物四格叙事",
      hypothesis: "全局身份锁定加逐格镜头职责，可以测试同人同物跨画面的连续性。",
      input: "需要上传 1 张人物照片",
      success: "四格为同一人物；服装与道具连续；每格动作不同且顺序可读。",
      source: "上游案例 #4031",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=4031",
      image: "../assets/nano-banana-pro/new-year-grid.jpg",
      status: "upstream",
      prompt: `使用我上传的人物照片生成一张 2×2 四格叙事海报。

全局锁定：四格必须是同一人物；保持脸部、发型、白色外套和黄色笔记本完全一致。
四格内容：
1. 全景：人物进入安静的图书馆。
2. 中景：人物坐下打开黄色笔记本。
3. 近景：人物在笔记本上画出一个流程图。
4. 中景：人物举起笔记本面向镜头微笑。

视觉：暖色自然光、低饱和电影色调、统一时间与空间方向。
禁止：更换人物、服装或道具颜色；禁止额外人物、文字、多余肢体和重复画面。`
    },
    {
      id: "E07",
      route: "control",
      routeLabel: "C · 视觉与资产",
      title: "透明玻璃涡轮",
      hypothesis: "结构、材质层、光学参数和负向约束分段描述，可以提升透明资产的可读性。",
      input: "无需参考图",
      success: "透明但轮廓清楚；内部结构可读；没有塑料感或错误文字。",
      source: "上游案例 #31475",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=31475",
      image: "../assets/nano-banana-pro/e07-codex-demo.jpg",
      status: "codex",
      prompt: `生成一个未来感透明涡轮发动机的 3D 产品概念图。

结构：完整圆形外壳、清楚的叶片层级、中央轴心和可见内部连接件。
材质：低雾度折射玻璃、磨砂边缘、少量阳极氧化深灰金属；透明不等于轮廓消失。
灯光：冷白主光、薄荷绿色轮廓光和细微焦散；深炭灰无缝背景。
相机：三分之四视角、微距产品摄影、浅景深，主体完整置于安全区。
禁止：暖色、人物、文字、品牌标记、塑料质感、断裂叶片或多余部件。`
    },
    {
      id: "E08",
      route: "control",
      routeLabel: "C · 视觉与资产",
      title: "机械鲸地下教堂",
      hypothesis: "主体、空间、尺度参照、材质冲突和镜头分层，可以让复杂奇观场景仍保持叙事可读性。",
      input: "无需参考图",
      success: "机械鲸为第一主体；人物提供尺度；建筑、鲸和雾不粘连。",
      source: "上游案例 #31355",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=31355",
      image: "../assets/nano-banana-pro/e08-codex-demo.jpg",
      status: "codex",
      prompt: `生成一张横向 16:9 电影概念场景：巨大的机械鲸悬浮在地下冰晶教堂中。

主体关系：机械鲸占画面中央上方；一名穿深色长外套的人站在下方石桥上，作为明确尺度参照。
空间：高耸拱顶、冰晶柱、远处深渊，前中后景分明。
材质：鲸体由老化黄铜、深色钢铁和少量发光蓝色管线组成；建筑为湿润岩石与半透明冰晶。
灯光：顶部冷色体积光穿过薄雾，人物保持清楚轮廓。
镜头：24mm 广角、低机位、电影级蓝灰调色。
禁止：文字、Logo、第二条鲸、拥挤人物或主体与建筑粘连。`
    },
    {
      id: "E09",
      route: "control",
      routeLabel: "C · 视觉与资产",
      title: "品牌色 LED 产品肖像",
      hypothesis: "把品牌色限制为光源和局部反射，而不是全画面滤镜，可以兼顾品牌感与产品识别。",
      input: "无需参考图；使用虚构产品",
      success: "人物肤色自然；产品轮廓清楚；品牌色只影响指定区域。",
      source: "上游案例 #32103",
      sourceUrl: "https://youmind.com/zh-CN/nano-banana-pro-prompts?id=32103",
      image: "../assets/nano-banana-pro/e09-codex-demo.jpg",
      status: "codex",
      prompt: `为虚构无线耳机“ORBIT ONE”生成一张竖版 4:5 商业广告肖像。

人物：短发年轻成年人，胸像，佩戴黑色头戴式耳机，神情自然。
产品：耳罩和头梁轮廓必须清楚，不能被头发或阴影遮挡。
灯光：左侧中性白主光保持自然肤色；右后方使用电光蓝 LED 轮廓光；蓝色只出现在背景、轮廓光和耳机局部反射中。
背景：深灰摄影棚，轻微雾感。
禁止：整张图覆盖蓝色滤镜、改变肤色、文字、Logo、水印或多余配件。`
    },
    {
      id: "E10",
      route: "workflow",
      routeLabel: "D · 模板与迭代",
      title: "短提示词与结构化提示词对照",
      hypothesis: "结构化表达更容易复现、诊断和进行单变量修改，而不只是生成得更复杂。",
      input: "无需参考图；需要分别运行 A、B 两段",
      success: "记录两轮首次命中率、错误类型和后续修改成本。",
      source: "跨案例研究对照",
      sourceUrl: "https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts",
      image: "../assets/nano-banana-pro/e10-codex-demo.jpg",
      status: "codex",
      prompt: `请把下面两段作为两个独立任务分别运行，不要合并。

RUN A｜短提示词：
生成一张未来感玻璃涡轮产品图，深色背景，薄荷绿灯光。

RUN B｜结构化提示词：
生成一个未来感透明涡轮发动机的 3D 产品概念图。结构包含完整圆形外壳、清楚叶片和中央轴心；材质为低雾度折射玻璃、磨砂边缘与深灰金属；使用冷白主光、薄荷绿轮廓光和细微焦散；三分之四微距视角，深炭灰无缝背景；禁止文字、人物、暖色、塑料质感和多余部件。

比较：结构完整度、材质可信度、额外元素和第二轮修改难度。`
    },
    {
      id: "E11",
      route: "workflow",
      routeLabel: "D · 模板与迭代",
      title: "海报本地化与画幅适配",
      hypothesis: "冻结视觉锚点，再单独声明文案与画幅变化，可以测试母版的渠道复用能力。",
      input: "需要上传 1 张包含文字的海报",
      success: "只改变语言和画幅；主体、配色和信息层级保持稳定。",
      source: "基于仓库能力的研究推演",
      sourceUrl: "https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts",
      image: "../assets/nano-banana-pro/e11-codex-demo.jpg",
      status: "codex",
      prompt: `请基于我上传的海报制作一个英文横版 16:9 版本。

只允许两项变化：
1. 将原中文标题替换为：MAKE COMPLEX IDEAS TESTABLE
2. 将画幅扩展为横向 16:9

必须保留：主体身份与姿态、原有色板、字体气质、强调色逻辑、背景材质和信息层级。
扩展画布时优先补充背景留白，不裁掉主体，不重新设计画面。
禁止：新增副标题、Logo、装饰图形或改变未授权区域。`
    },
    {
      id: "E12",
      route: "workflow",
      routeLabel: "D · 模板与迭代",
      title: "单变量局部编辑",
      hypothesis: "用保留清单和唯一修改目标约束编辑，可以直接观察模型是否真的只改一项。",
      input: "需要上传 1 张基线图",
      success: "目标变化生效；非目标区域保持；没有整图重绘造成的漂移。",
      source: "基于仓库能力的研究推演",
      sourceUrl: "https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts",
      image: "../assets/nano-banana-pro/e12-codex-demo.jpg",
      status: "codex",
      prompt: `请基于我上传的基线图进行一次单变量编辑。

本轮唯一修改：把背景从当前颜色改为深炭灰色 #202124。

必须保持不变：主体身份、姿态、构图、镜头、服装、产品、所有文字、字号、对齐方式、材质、阴影方向和画幅比例。
禁止：重绘主体、添加新元素、移动文字、改变裁切或修改背景以外的任何区域。
验收：背景颜色准确；将新旧图片叠放比较时，非背景区域应保持语义一致。`
    }
  ];

  var templates = [
    {
      id: "T01",
      name: "高密度产品信息图",
      forUse: "参数页、产品说明、社媒长图",
      content: `目标：为[产品/主题]制作[画幅]信息图。
内容：标题[ ]；核心结论[ ]；信息模块[4–6项]；数据与单位[ ]；CTA[ ]。
结构：阅读顺序[ ]；每个模块的标题、图标和正文层级明确。
视觉：品牌色[ ]；背景[ ]；字体角色[标题/正文/数字]。
约束：所有文字逐字准确，不生成额外数据，不使用装饰性乱码。
验收：缩略图可读、数字准确、无重叠、信息顺序清晰。`
    },
    {
      id: "T02",
      name: "身份保持商业肖像",
      forUse: "人物广告、封面、品牌肖像",
      content: `参考：[人物图]。
必须保留：身份、面部骨骼、发型主体特征、视线方向。
允许修改：[服装/背景/灯光中的一项]。
画面：景别[ ]；机位[ ]；姿态[ ]；产品[ ]。
灯光：主光[ ]；辅光[ ]；品牌色仅作用于[ ]。
禁止：替换人物、改变年龄、过度磨皮、增加饰品、修改未授权区域。`
    },
    {
      id: "T03",
      name: "多格一致叙事",
      forUse: "四格故事、分镜、角色连续画面",
      content: `角色设定：人物[ ]；固定服装[ ]；固定道具[ ]；不可变特征[ ]。
画面数量：[4]格，统一[画幅/边框/配色]。
镜头清单：1.[建立场景] 2.[动作开始] 3.[关键变化] 4.[结果/情绪]。
连续性：人物、服装、道具、时间与空间方向跨格一致。
每格只承担一个叙事动作，不重复构图。
验收：按顺序可理解；无身份漂移、道具消失或多余肢体。`
    },
    {
      id: "T04",
      name: "材质驱动视觉资产",
      forUse: "游戏道具、概念物件、产品视觉",
      content: `主体：[物件]；结构锚点：[轮廓/部件/连接方式]。
材质层：主体材质[ ]；粗糙度[ ]；透明/金属参数[ ]；边缘表现[ ]。
灯光：主光方向[ ]；环境光[ ]；轮廓光[ ]。
相机：机位[ ]；焦段[ ]；背景[ ]。
禁止：[塑料感/错误反射/结构粘连/多余部件]。
验收：缩略图轮廓清晰，材质可信，关键结构无遮挡。`
    },
    {
      id: "T05",
      name: "单变量局部编辑",
      forUse: "改色、换文案、换道具、渠道适配",
      content: `基线：[参考图]。
本轮唯一修改：[具体对象]从[当前状态]改为[目标状态]。
必须保留：主体身份、构图、镜头、其他文字、材质、阴影与背景结构。
修改区域边界：[ ]。
禁止：重绘整图、添加新元素、改变非目标区域。
验收：目标修改准确；其余区域保持一致；记录本轮版本号与下一步。`
    }
  ];

  var codexNotes = {
    E03: "16 个州名全部出现；地图位置与边界仍需独立核验。",
    E04: "中文标题准确；使用生成的虚构人物锚点演示媒介迁移，不代表真实身份验证。",
    E05: "同一虚构人物锚点的脸部特征保持较好；这是方向演示，不是严格身份比对。",
    E07: "透明玻璃轮廓、叶片层级与内部连接件同时可读。",
    E08: "机械鲸、人物尺度参照与冰晶教堂的空间层次清楚。",
    E09: "肤色保持自然，电光蓝主要限制在背景与轮廓光。",
    E10: "A/B 结构差异直观；这是对照板演示，不是两次独立运行统计。",
    E11: "英文文案与 16:9 横版适配命中，视觉锚点保持。",
    E12: "深炭灰背景生效，主体、六个模块与文字大体保持。"
  };

  var sourceStates = {
    gemini: { text: "Gemini 实测", className: "experiment-state experiment-state--gemini", visual: "GEMINI 实测图" },
    codex: { text: "Codex 演示", className: "experiment-state experiment-state--codex", visual: "CODEX 演示图" },
    upstream: { text: "上游参考", className: "experiment-state experiment-state--upstream", visual: "上游参考图" }
  };

  var experimentEvidence = {
    E01: {
      label: "生成命中 · 编辑未命中",
      tone: "mixed",
      detail: "Gemini Web 首次生成命中；后续要求改为居中时未生效。",
      fit: "contain"
    },
    E02: {
      label: "首次命中 · 未复测",
      tone: "pass",
      detail: "Gemini Web 首次生成命中；目前只有一次记录，尚不能判断稳定复现率。"
    },
    E03: {
      label: "方向演示 · 待核验",
      tone: "demo",
      detail: "Codex 生成结果包含 16 个州名；地图边界和标签位置仍需独立核验。",
      fit: "contain"
    },
    E04: {
      label: "方向演示 · 非身份验证",
      tone: "demo",
      detail: "使用生成的虚构人物锚点演示媒介迁移，没有使用真实人物照片做身份比对。"
    },
    E05: {
      label: "方向演示 · 非身份验证",
      tone: "demo",
      detail: "使用同一虚构人物锚点演示服装与灯光变化，未进行真实身份一致性评估。"
    },
    E06: {
      label: "仅作参考 · 本提示词未执行",
      tone: "reference",
      detail: "当前图片来自上游案例，只展示多格连续性的能力方向，不是这条图书馆提示词的运行结果。"
    },
    E07: {
      label: "方向演示 · 未验证 Gemini",
      tone: "demo",
      detail: "Codex 生成结果用于展示透明材质与结构控制方向，尚未在 Gemini Web 复测。"
    },
    E08: {
      label: "方向演示 · 未验证 Gemini",
      tone: "demo",
      detail: "Codex 生成结果用于展示复杂场景的主体与尺度关系，尚未在 Gemini Web 复测。"
    },
    E09: {
      label: "方向演示 · 未验证 Gemini",
      tone: "demo",
      detail: "Codex 生成结果用于展示品牌色受控照明方向，尚未在 Gemini Web 复测。"
    },
    E10: {
      label: "对照示意 · 非独立运行",
      tone: "partial",
      detail: "当前图片是单张 A/B 对照板，不是两次独立生成，不能据此统计命中率或修改成本。"
    },
    E11: {
      label: "编辑演示 · 未验证 Gemini",
      tone: "demo",
      detail: "Codex 基于 E01 预览演示英文横版适配，尚未在 Gemini Web 执行。"
    },
    E12: {
      label: "编辑演示 · 未验证 Gemini",
      tone: "demo",
      detail: "Codex 基于 E02 预览演示背景改色；没有进行像素级非目标区域一致性测量。"
    }
  };

  var experimentApplications = {
    E01: {
      meaning: "用最低成本验证模型能否把中文、标点、层级、对齐和强调色当作可控内容；它是文字型生图能否进入生产流程的基础门槛。",
      useCases: ["社媒语录卡", "文章金句与研究笔记封面", "课程知识卡", "品牌口号概念稿"]
    },
    E02: {
      meaning: "验证模型能否在一张图里同时管理高密度中文、数字、流程和模块层级，判断其是否适合承担解释型视觉。",
      useCases: ["产品功能总览", "落地页说明图", "路演与销售材料", "使用指南", "社媒产品发布"]
    },
    E03: {
      meaning: "验证准确事实清单与艺术风格能否共存，并主动暴露地图、知识图解必须经过人工核验的边界。",
      useCases: ["教育地图", "区域报告封面", "旅行与展览视觉", "科普图解（核验后使用）"]
    },
    E04: {
      meaning: "验证能否把人物身份锚点与媒介、用途和版式分开控制，让同一人物适配新的内容载体。",
      useCases: ["采访与博客头图", "作者或专家栏目", "课程封面", "知识创作者品牌视觉"]
    },
    E05: {
      meaning: "验证改变服装和灯光时能否保留人物身份，判断商业肖像重绘的可控程度。",
      useCases: ["广告肖像概念", "个人品牌视觉", "代言人方案预演", "编辑与电商主视觉（需授权）"]
    },
    E06: {
      meaning: "验证人物、服装、道具、空间方向和动作能否跨画面连续，是多格叙事能否成立的基础测试。",
      useCases: ["故事板", "四格漫画", "产品引导故事", "广告序列", "教学步骤卡"]
    },
    E07: {
      meaning: "验证复杂结构、透明材质、内部部件与光学效果能否同时可读，适合评估视觉资产控制力。",
      useCases: ["工业概念图", "游戏与影视道具", "科技产品营销", "产品设计情绪板", "非工程级结构图"]
    },
    E08: {
      meaning: "验证复杂奇观场景中主体、尺度参照、空间层次和材质冲突是否仍保持叙事可读。",
      useCases: ["游戏与电影概念设计", "世界观开发", "活动与专辑海报", "品牌叙事情绪板"]
    },
    E09: {
      meaning: "验证品牌色能否被限制在指定光源和反射区域，而不是破坏肤色与产品识别的全画面滤镜。",
      useCases: ["广告创意稿", "电商首屏", "社媒活动素材", "虚拟新品发布", "品牌主视觉"]
    },
    E10: {
      meaning: "验证提示词结构化前后的可复现性、错误类型和修改成本；真正结论必须来自两次独立运行。",
      useCases: ["提示词培训", "团队编写规范", "模型评测报告", "A/B 基准设计", "迭代复盘"]
    },
    E11: {
      meaning: "验证冻结视觉锚点后，能否只改变语言与画幅，用于判断母版资产的跨渠道复用能力。",
      useCases: ["多语言活动素材", "社媒尺寸适配", "网站横幅改版", "区域市场本地化", "设计母版复用"]
    },
    E12: {
      meaning: "验证模型能否只修改一个变量并控制非目标区域漂移，是可控编辑与版本回归的基础。",
      useCases: ["背景与产品改色", "电商版本图", "活动素材变体", "客户修改稿", "视觉回归检查"]
    }
  };

  var experimentGrid = document.querySelector("#experiment-grid");
  var codexGallery = document.querySelector("#codex-gallery");
  var templateList = document.querySelector("#template-list");
  var experimentCount = document.querySelector("#experiment-count");
  var routeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-route]"));
  var toast = document.querySelector("#copy-toast");
  var themeToggle = document.querySelector("#theme-toggle");
  var currentRoute = "all";
  var toastTimer;

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function visualMarkup(item) {
    if (item.image) {
      var evidence = experimentEvidence[item.id] || {};
      var source = sourceStates[item.status] || { text: "待执行", visual: "视觉参考" };
      var fitClass = evidence.fit === "contain" ? " experiment-card__visual--contain" : "";
      return '<div class="experiment-card__visual' + fitClass + '"><img src="' + item.image + '" alt="' + escapeHtml(item.title + "的" + source.text + "结果预览") + '" loading="lazy"><span class="experiment-card__route">' + item.routeLabel + '</span><span class="experiment-card__provenance">' + source.visual + '</span></div>';
    }
    return '<div class="experiment-card__visual experiment-card__visual--abstract"><b>' + item.routeLabel.charAt(0) + '</b><span class="experiment-card__route">' + item.routeLabel + '</span></div>';
  }

  function renderExperiments() {
    var visible = currentRoute === "all" ? experiments : experiments.filter(function (item) { return item.route === currentRoute; });

    experimentGrid.innerHTML = visible.map(function (item) {
      var state = sourceStates[item.status] || { text: "可直接执行", className: "experiment-state" };
      var evidence = experimentEvidence[item.id] || { label: "待执行", tone: "reference", detail: "尚未记录执行结果。" };
      var application = experimentApplications[item.id] || { meaning: "用于验证该提示词结构的可控性。", useCases: ["按具体需求评估"] };
      return [
        '<article class="experiment-card" data-experiment="' + item.id + '">',
        visualMarkup(item),
        '<div class="experiment-card__body">',
        '<div class="experiment-card__top"><span class="experiment-id">' + item.id + '</span><div class="experiment-state-group"><span class="' + state.className + '" aria-label="图片来源：' + state.text + '">' + state.text + '</span><span class="experiment-evidence experiment-evidence--' + evidence.tone + '" aria-label="当前证据：' + evidence.label + '">' + evidence.label + '</span></div></div>',
        '<h3>' + item.title + '</h3>',
        '<p class="experiment-card__hypothesis">' + item.hypothesis + '</p>',
        '<div class="experiment-application"><div><span>WHY / 为什么测</span><p>' + application.meaning + '</p></div><div><span>USE / 使用场景</span><p>' + application.useCases.join(" · ") + '</p></div></div>',
        '<dl class="experiment-spec"><div><dt>输入</dt><dd>' + item.input + '</dd></div><div><dt>通过条件</dt><dd>' + item.success + '</dd></div><div class="experiment-spec__evidence"><dt>当前证据</dt><dd>' + evidence.detail + '</dd></div></dl>',
        '<details class="prompt-detail"><summary>查看完整执行提示词</summary><pre><code>' + escapeHtml(item.prompt) + '</code></pre></details>',
        '<div class="experiment-card__footer">',
        '<a class="experiment-source" href="' + item.sourceUrl + '" target="_blank" rel="noreferrer"><span>提示词灵感：</span>' + item.source + ' ↗</a>',
        '<button class="copy-button copy-button--primary" type="button" data-copy-experiment="' + item.id + '">复制执行提示词</button>',
        '</div></div></article>'
      ].join("");
    }).join("");

    experimentCount.textContent = "显示 " + visible.length + " / " + experiments.length + " 条可执行提示词";
  }

  function renderCodexGallery() {
    var demos = experiments.filter(function (item) { return item.status === "codex"; });
    codexGallery.innerHTML = demos.map(function (item) {
      return [
        '<figure class="demo-card" data-demo="' + item.id + '">',
        '<div class="demo-card__media"><img src="' + item.image + '" alt="' + item.title + ' 的 Codex ImageGen 演示结果" loading="lazy"><span>CODEX IMAGEGEN · ' + item.id + '</span></div>',
        '<figcaption><strong>' + item.title + '</strong><p>' + codexNotes[item.id] + '</p></figcaption>',
        '</figure>'
      ].join("");
    }).join("");
  }

  function renderTemplates() {
    templateList.innerHTML = templates.map(function (item) {
      return [
        '<article class="template-card">',
        '<div class="template-card__meta"><span>' + item.id + '</span><strong>' + item.name + '</strong><small>' + item.forUse + '</small></div>',
        '<pre class="template-code"><code>' + escapeHtml(item.content) + '</code></pre>',
        '<button class="copy-button" type="button" data-copy-template="' + item.id + '">复制骨架</button>',
        '</article>'
      ].join("");
    }).join("");
  }

  function showToast(message, failed) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.state = failed ? "failed" : "success";
    toast.hidden = false;
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 2000);
  }

  async function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    var textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    var copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("copy failed");
  }

  function copyWithFeedback(button, content, successMessage) {
    var original = button.textContent;
    copyText(content).then(function () {
      button.textContent = "已复制";
      showToast(successMessage, false);
      window.setTimeout(function () { button.textContent = original; }, 1400);
    }).catch(function () {
      showToast("复制失败，请展开后手动选择文本", true);
    });
  }

  routeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentRoute = button.dataset.route;
      routeButtons.forEach(function (candidate) {
        var active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderExperiments();
    });
  });

  experimentGrid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-experiment]");
    if (!button) return;
    var item = experiments.find(function (candidate) { return candidate.id === button.dataset.copyExperiment; });
    if (item) copyWithFeedback(button, item.prompt, item.id + " 执行提示词已复制");
  });

  templateList.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-template]");
    if (!button) return;
    var item = templates.find(function (candidate) { return candidate.id === button.dataset.copyTemplate; });
    if (item) copyWithFeedback(button, item.content, item.id + " 复用骨架已复制");
  });

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

  renderExperiments();
  renderCodexGallery();
  renderTemplates();
  updateThemeControl();
}());
