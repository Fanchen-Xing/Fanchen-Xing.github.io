# Highlands in Gold / 高原秋境

可整体复制的作品内容包。当前是无需构建的静态网页，双击 index.html 可查看；Vimeo 视频需要联网。没有 npm 依赖、构建产物或 Unreal 工程依赖。

## 交给网站 agent

先阅读 AGENTS.md，再阅读 index.html 与 media.js。将整个 PortfolioSite 文件夹复制到目标网站工作区后，按目标网站的框架、导航、字体、颜色和响应式布局整合内容。现有 CSS 只是当前展示方案，不要求照搬；可以迁移成网站组件，但请保留已确认文案、图片顺序、视频与章节关系，更新全部引用后再删掉被替代的旧文件。不需要访问原项目磁盘或当前聊天。

## 文件用途

- index.html：最终文案、章节结构、图片说明和视频封面入口。
- styles.css：当前样式；顶部 :root 是字体、颜色与间距设置。
- media.js：媒体路径及替代文本；reference 留空是尚未提供的参考图位。
- app.js：加载图片，点击封面后嵌入 Vimeo 播放器。
- assets/：全部在用的原始图片，保留原始分辨率。
- tools/RenderSystemDiagram.py：系统架构图可编辑源文件，仅重新绘图时需要 Python/Pillow 和可显示中文的字体。Windows 默认字体路径写在脚本中，其他平台需替换字体路径；网页运行不需要 Python。
- AGENTS.md：内容与排版约束。

## 章节与媒体对应

作品介绍 → 作品展示 → 展示图 → PCG 系统 → 开发流程。

| 部分 | 素材 |
|---|---|
| 展示视频 | Vimeo 1235311184；封面 assets/VideoCover.png |
| 展示图 | assets/CAM1.png 至 CAM5.png，按编号顺序，每张独占一行，不显示图下注释 |
| 系统架构 | assets/SystemArchitecture.png |
| 主图 | assets/GraphMain.png |
| 森林与灌木 | assets/GraphForest.png、GraphShrubs.png |
| 三层簇 | assets/GraphCluster.png、Palette.png |
| 草地分布 | assets/GraphGrass.png、GrassDistribution.png |
| 村庄生成 | assets/GraphVillage.png、GraphFence.png；后者包含生成效果和 Fence 图 |
| 资产与参考 | 保留一个未提供的参考图位，不使用其他图冒充 |

视频公开链接：https://vimeo.com/1235311184
播放器：https://player.vimeo.com/video/1235311184
不要使用 /manage/videos/ 管理地址作为播放链接。当前实现点击本地封面加载播放器，同时保留 Vimeo 观看链接。嵌入播放权限尚未实测，不应擅自修改账号或视频隐私设置。

## 内容事实与边界

中文作品名为“高原秋境”，英文名已确定为 Highlands in Gold，但用户明确暂不在网页添加英文标题或游戏旁白。项目重点是秋季高原植被生态。

地形使用 Gaea 制作，其余场景资产来自 Fab 商城。村庄技术实现由 AI 全权负责，用户提供生成规则、参考与迭代反馈；其他模块中的 AI 工作包括部分 Primitive 实现、节点整理与调试。

性能段落保留定性说明，另以一段正文描述数据，不使用表格：Main 范围 3000 × 3000 米，保留实例总量 751,837；Grass1 范围 300 × 300 米，保留实例总量 248,088。用户确认原始生成体长宽各 2 米，Scale 分别为 1500 和 150。生成时间约 5–7 秒来自用户观察，不是 profiler 测量，也没有分别测量两个生成体的可靠耗时。不得扩写为 FPS、硬件基准或每秒吞吐量。

技术正文主要依据 2026-10-10 的官方 Unreal MCP 图结构快照；本包为网页迁移用途，已移除原始证据日志。重新排版无需重验 Unreal，也不要声称数据是新一次实时检测结果。若要改变技术事实，应另行取得项目证据。

主图生成森林、灌木和河岸内容，树灌占用 Mask 供草地图规避；成簇系统被灌木作为子图复用，也可独立制作近景。村庄 Fence 是内部子图，道路采用 Spline Mesh。架构图按用户指定表达村庄道路 Mask 与主图、草地图联动；历史快照仅确认 Grass 消费该接口，不能把概念架构误写为所有连接均已运行验收。不要凭图示增加反向依赖或声称四个系统都输出 Mask。

## 复制后检查

确认所有相对资源路径在目标网站的子目录下有效；检查导航锚点、中文显示、手机布局、大图比例、视频封面和播放入口。若改为框架组件，请迁移 media.js 中全部图片引用，而不只复制 HTML 中直接出现的图片。assets 下图片不应拉伸或裁掉内容。保留架构图的放大查看入口。
