/* Set src to the relative local file path after supplying the asset.
   Empty src preserves the intentionally written screenshot placeholder.
   No build step, server or remote hosting is needed. */
window.PORTFOLIO_MEDIA = {
  reference: {type: "image", src: "", alt: "高原秋境的环境参考图"},
  showreel: {type: "vimeo", src: "https://player.vimeo.com/video/1235311184", poster: "AssetLibrary/HighlandsInGold/assets/VideoCover.png", alt: "高原秋境作品展示视频"},
  overview: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/CAM1.png", alt: "高原秋境场景全景"},
  detail: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/CAM2.png", alt: "植被与地表细节"},
  cam3: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/CAM3.png", alt: "CAM3：遗迹旁的秋季高原植被"},
  cam4: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/CAM4.png", alt: "CAM4：林地、灌丛与草甸"},
  cam5: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/CAM5.png", alt: "CAM5：阳光下的秋季草花"},
  grass_distribution: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GrassDistribution.png", alt: "草花斑块分布可视化"},
  main_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphMain.png", alt: "PCG Main 主图的森林、灌木与遮罩输出连线"},
  forest_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphForest.png", alt: "森林空间噪声分区、边界混合和独立密度筛选"},
  shrub_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphShrubs.png", alt: "灌木图调用三层簇并汇总避让输出"},
  cluster_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphCluster.png", alt: "三层簇径向分层、植物筛选与生成"},
  palette: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/Palette.png", alt: "三层簇分布可视化与 Palette 参数面板"},
  grass_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphGrass.png", alt: "草地两级噪声与地形投射筛选"},
  village_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphVillage.png", alt: "村庄地块切分与建筑占地筛选"},
  fence_graph: {type: "image", src: "AssetLibrary/HighlandsInGold/assets/GraphFence.png", alt: "村庄生成效果、相关资产与 Fence 围栏子图"}
};

/* Content remains readable with JavaScript disabled. This script only mounts media. */
document.querySelectorAll('[data-media]').forEach(figure => {
  const item = (window.PORTFOLIO_MEDIA || {})[figure.dataset.media];
  if (!item || !item.src) return;
  if (item.type === 'vimeo') {
    const cover = figure.querySelector('.video_cover');
    if (!cover) return;
    cover.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.className = 'video_frame';
      frame.title = item.alt;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      frame.src = item.src + '?autoplay=1&title=0&byline=0&portrait=0';
      cover.replaceWith(frame);
      frame.focus();
    });
    return;
  }
  const video = item.type === 'video';
  const media = document.createElement(video ? 'video' : 'img');
  if (video) {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    media.setAttribute('aria-label', item.alt);
    if (item.poster) media.poster = item.poster;
  } else {
    media.alt = item.alt;
    media.loading = 'lazy';
  }
  media.addEventListener(video ? 'loadedmetadata' : 'load', () => figure.classList.add('has_media'), {once:true});
  media.addEventListener('error', () => {figure.classList.remove('has_media');media.remove();}, {once:true});
  media.src = item.src;
  figure.insertBefore(media, figure.firstChild);
});
