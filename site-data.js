/* Edit this file to maintain News, research categories, Invited Talks, and BibTeX.
 * News: { date: "2026-11", text: "Our paper appeared at ...",
 *         links: [{ label: "paper", href: "#paper-lpam" }], suffix: "." }
 * A paper may belong to multiple categories, e.g. ["image", "geometry"].
 * Talks: { date: "2026-11", title: "Talk title", host: "Inviting institution", url: "https://..." }
 * please add items in window.homepageData "news / talks" arrays.
 */
window.homepageData = {
  categories: [
  {
    "id": "full",
    "label": "Full"
  },
  {
    "id": "image",
    "label": "Image Stitching / Editing"
  },
  {
    "id": "geometry",
    "label": "3D Geometry Perception"
  },
  {
    "id": "medical",
    "label": "Medical Image Analysis"
  }
],
  publicationCategories: {
  "AdaML": [
    "medical"
  ],
  "TriConDepth": [
    "geometry"
  ],
  "dyglnet": [
    "medical"
  ],
  "object_ir": [
    "image"
  ],
  "nisudm": [
    "image"
  ],
  "lpam": [
    "image"
  ],
  "multi_homo_warp": [
    "image"
  ],
  "spw": [
    "image"
  ],
  "qebise": [
    "image"
  ],
  "ell": [
    "image"
  ],
  "pbsc": [
    "image"
  ]
},
  news: [
    {
      date: "2026-11",
      displayDate: "Nov 2026",
      text: "",
      links: [{ label: "AdaML", href: "#paper-AdaML" }],
      suffix: " paper accepted by Computerized Medical Imaging and Graphics (CMIG)."
    },
    {
      date: "2026-09",
      displayDate: "Sep 2026",
      text: "",
      links: [{ label: "TriConDepth", href: "#paper-TriConDepth" }],
      suffix: " paper accepted by Pattern Recognition (PR)."
    }
  ],
  talks: [
    {
      date: "2024-11",
      title: "Research Progress of Image Stitching in Large Parallax Scenarios",
      host: "School of Automation, Southeast University"
    }
  ],
  bibEntries: {
      AdaML: `@article{Li2026AdaML,
          title = {AdaML: Adaptive meta-learning for generalizable sparse-view CT reconstruction},
          journal = {Computerized Medical Imaging and Graphics},
          pages = {102839},
          year = {2026},
          author = {Guodong Li and Tianli Liao and Kun Shang and Ce Wang},
          }`,
      TriConDepth: `@article{Zhong2026tricondepth,
          title = {Leveraging unlabeled data via semi-supervised contrastive learning for enhanced monocular depth estimation},
          journal = {Pattern Recognition},
          pages = {114984},
          year = {2026},
          author = {Yuhua Zhong and You Hao and Xiaofeng Wu and Tianli Liao and Ce Wang},
          }`,
      dyglnet: `@article{zhao2026dyglnet,
          title={DyGLNet: Hybrid global-local feature fusion with dynamic upsampling for medical image segmentation},
          author={Zhao, Yican and Wang, Ce and Hao, You and Li, Lei and Liao, Tianli},
          journal={Pattern Recognition},
          pages={112792},
          year={2026},
          publisher={Elsevier}
          }`,
      object_ir: `@article{liao2026object-ir,
          title = {Object-IR: Leveraging object consistency and mesh deformation for self-supervised image retargeting},
          author = {Tianli Liao and Ran Wang and Siqing Zhang and Lei Li and Guangen Liu and Chenyang Zhao and Heling Cao and Peng Li},
          journal = {Pattern Recognition},
          volume = {172},
          pages = {112651},
          year = {2026},
          }`,
      nisudm: `@article{liao2026natural,
          title={Natural image stitching using depth maps},
          author={Liao, Tianli and Li, Nan},
          journal={Signal Processing: Image Communication},
          pages={117438},
          volume={141},
          year={2026},
          publisher={Elsevier}
          }`,
      lpam: `@InProceedings{Liao_2025_ICCV,
          author    = {Liao, Tianli and Zhao, Chenyang and Li, Lei and Cao, Heling},
          title     = {Leveraging Local Patch Alignment to Seam-cutting for Large Parallax Image Stitching},
          booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
          month     = {October},
          year      = {2025},
          pages     = {27262-27271}
          }`,
      multi_homo_warp: `@article{Liao2025Parallax,
          title = {Parallax-tolerant image stitching via segmentation-guided multi-homography warping},
          author = {Tianli Liao and Ce Wang and Lei Li and Guangen Liu and Nan Li},
          journal = {Signal Processing},
          volume = {230},
          pages = {109860},
          year = {2025},
          }`,
      spw: `@article{liao2020single,
          title={Single-perspective warps in natural image stitching},
          author={Liao, Tianli and Li, Nan},
          journal={IEEE transactions on image processing},
          volume={29},
          pages={724--735},
          year={2020},
          publisher={IEEE}
          }`,
      qebise: `@article{liao2019quality,
          title={Quality evaluation-based iterative seam estimation for image stitching},
          author={Liao, Tianli and Chen, Jing and Xu, Yifang},
          journal={Signal, Image and Video Processing},
          volume={13},
          pages={1199--1206},
          year={2019},
          publisher={Springer}
          }`,
      ell: `@article{xu2018learning,
          title={Learning-based natural geometric matching with homography prior},
          author={Xu, Yifang and Liao, Tianli and Chen, Jing},
          journal={Electronics Letters},
          volume={54},
          number={23},
          pages={1328--1330},
          year={2018},
          publisher={Wiley Online Library}
          }`,
      pbsc: `@article{li2018perception,
          title={Perception-based seam cutting for image stitching},
          author={Li, Nan and Liao, Tianli and Wang, Chao},
          journal={Signal, Image and Video Processing},
          volume={12},
          pages={967--974},
          year={2018},
          publisher={Springer}
          }`
        }
};
