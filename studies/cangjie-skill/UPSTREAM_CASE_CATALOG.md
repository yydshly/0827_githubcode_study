# cangjie-skill 代表案例目录

核对日期：2026-08-28  
口径：公开 GitHub 仓库结构、README/INDEX 声明与本地固定样例审计。除《左耳听风》外，本目录没有独立重跑每个 Skill 的完整压力测试或业务效果，因此“优秀案例”表示来源形态和产物设计具有代表性，不等于全部外部效度已经证明。

## 案例总览

| 案例 | 输入形态 | 公开产出 | 最值得看的能力 | 证据口径 |
| --- | --- | ---: | --- | --- |
| [AI for Everyone Skill](https://github.com/kangarooking/ai-for-everyone-skill) | 26集视频课程字幕 | 25 Skills | 从课程顺序提炼为可行性、项目、组织转型能力地图 | 上游结构核对 |
| [Loop Engineering Skill](https://github.com/kangarooking/loop-engineering-skill) | 4个中英文长视频 | 8 Skills | 跨讲者组合任务判定、停止条件和独立验证 | 上游结构核对 |
| [System Prompt Skills](https://github.com/kangarooking/system-prompt-skills) | 165份公开产品系统提示词 | 15 Skills | 从产品工件反向抽取工具、安全、记忆、引用和上下文模式 | 上游结构核对 |
| [X Growth Skills](https://github.com/kangarooking/X-growth-skills) | 创作者经验+官方建议+公开算法资料 | 15 Skills | 把混合资料组织为定位、冷启动、内容、复盘和变现路径 | 上游结构核对 |
| [Buffett Letters Skill](https://github.com/kangarooking/buffett-letters-skill) | 1957–2023股东信 | 20 Skills | 跨数十年材料抽取稳定判断并组合调用 | 上游结构+本地样例审计 |
| [《左耳听风》Column Proxy](experiments/zuoer-tingfeng/column-proxy/README.md) | 119篇第三方专栏代理语料 | 247候选、1正式Skill | 从提取到盲测、安装、真实案例与组织接入门的完整证据链 | 我们的受控验证 |

## 1. 视频课程：AI for Everyone

- 来源：Andrew Ng / 吴恩达课程的26集字幕；
- 公开统计：176个候选、22个三重验证通过单元、加3个综合能力后形成25个Skills；
- 代表能力：`ml-feasibility`、`triple-due-diligence`、`ai-transformation-playbook`；
- 证明力：课程不必被保留成章节摘要，可以转成“判断AI是否可做—怎样选项目—怎样推动组织”的调用地图；
- 局限：本研究只核对公开文件结构与声明，没有独立运行25项行为回归。

## 2. 多视频综合：Loop Engineering

- 来源：4个中英文Loop Engineering长视频文案；
- 公开产出：8个Skills；
- 代表能力：`loop-worthiness-test`、`goal-verification`、`maker-checker`；
- 证明力：能够把多位讲者的互补观点整理成任务价值、停止条件、系统架构和认知风险等相邻能力；
- 局限：跨讲者综合容易消除观点冲突，必须保留逐项来源和证伪边界。

## 3. 产品工件集合：System Prompt Skills

- 来源：165个公开AI产品系统提示词；
- 公开产出：15个Skills；
- 代表能力：`tool-specification`、`injection-defense`、`context-management`；
- 证明力：输入不需要是“作者讲方法”的叙事文本，也可以从真实产品工件中归纳反复出现的设计模式；
- 局限：提示词来源许可、真实性、时效和厂商归属需要另行评估；抽取出的模式不是厂商官方规范。

## 4. 混合资料集：X Growth Skills

- 来源：多位创作者经验、X官方建议和公开算法资料；
- 公开产出：15个Skills；
- 代表能力：`x-positioning-tradeoff`、`x-cold-start-playbook`、`x-data-review`；
- 证明力：不同来源可以被组织成“定位—起号—内容—互动—复盘—变现”的组合路径；
- 局限：平台产品、算法和风控规则高度时变，执行建议必须重新核验最新官方资料。

## 5. 长期文档集合：Buffett Letters Skill

- 来源：1957–2023年股东信；
- 公开产出：40个去重候选中筛选20个Skills；
- 代表能力：`mr-market`、`circle-of-competence`、`margin-of-safety`；
- 证明力：多年重复表达可以沉淀为稳定判断，并在一个现实问题中组合多个原子Skill；
- 局限：本地固定样例确认20个Skill都具有R/I/A1/A2/E/B和测试题文件，但没有可重放的`test-results.md`，因此不把“有测试文件”写成“测试已执行”。

## 6. 我们的受控案例：《左耳听风》Column Proxy

- 来源：119篇第三方专栏代理语料，不是纸质书全文；
- 当前产出：247条候选、4个能力方向、1个正式Skill；
- 已证明：首个Skill完成Stage 1.5三重验证、Stage 2构造、Stage 4三轮独立回归19/19、Stage 5A仓库安装、Stage 5B Cloudflare公开事故完整演示和Stage 5C组织案例接入门；
- 价值：它不是规模最大的案例，但目前是我们证据最深、失败轨迹和边界最完整的案例；
- 局限：组织事故案例仍为0，另外3项能力仍是候选。

## 阅读建议

- 想理解“视频课程怎样变成能力地图”：先看 AI for Everyone；
- 想理解“多个视频怎样合并又保持边界”：看 Loop Engineering；
- 想理解“非叙事产品工件也能蒸馏”：看 System Prompt Skills；
- 想理解“多来源资料怎样组合成业务路径”：看 X Growth Skills；
- 想理解“多个原子Skill怎样协同判断”：看 Buffett Letters；
- 想检查整个生产链是否真实可验证：看我们的《左耳听风》案例。

