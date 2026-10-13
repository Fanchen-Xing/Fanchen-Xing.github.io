/* Set src to the relative local file path after supplying the asset.
   Empty src preserves the intentionally written screenshot placeholder.
   No build step, server or remote hosting is needed. */
window.PORTFOLIO_MEDIA = {
  reference: {type: "image", src: "", alt: "高原秋境的环境参考图"},
  showreel: {type: "vimeo", src: "https://player.vimeo.com/video/1235311184", poster: "assets/VideoCover.png", alt: "高原秋境作品展示视频"},
  overview: {type: "image", src: "assets/CAM1.png", alt: "高原秋境场景全景"},
  detail: {type: "image", src: "assets/CAM2.png", alt: "植被与地表细节"},
  cam3: {type: "image", src: "assets/CAM3.png", alt: "CAM3：遗迹旁的秋季高原植被"},
  cam4: {type: "image", src: "assets/CAM4.png", alt: "CAM4：林地、灌丛与草甸"},
  cam5: {type: "image", src: "assets/CAM5.png", alt: "CAM5：阳光下的秋季草花"},
  grass_distribution: {type: "image", src: "assets/GrassDistribution.png", alt: "草花斑块分布可视化"},
  main_graph: {type: "image", src: "assets/GraphMain.png", alt: "PCG Main 主图的森林、灌木与遮罩输出连线"},
  forest_graph: {type: "image", src: "assets/GraphForest.png", alt: "森林空间噪声分区、边界混合和独立密度筛选"},
  shrub_graph: {type: "image", src: "assets/GraphShrubs.png", alt: "灌木图调用三层簇并汇总避让输出"},
  cluster_graph: {type: "image", src: "assets/GraphCluster.png", alt: "三层簇径向分层、植物筛选与生成"},
  palette: {type: "image", src: "assets/Palette.png", alt: "三层簇分布可视化与 Palette 参数面板"},
  grass_graph: {type: "image", src: "assets/GraphGrass.png", alt: "草地两级噪声与地形投射筛选"},
  village_graph: {type: "image", src: "assets/GraphVillage.png", alt: "村庄地块切分与建筑占地筛选"},
  fence_graph: {type: "image", src: "assets/GraphFence.png", alt: "村庄生成效果、相关资产与 Fence 围栏子图"}
};
