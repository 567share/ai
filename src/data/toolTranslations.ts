import { Tool } from '../types';
import { Language } from '../lib/i18n';
import { INITIAL_TOOLS } from './tools';

const INITIAL_TOOL_NAME_MAP = new Map<number, string>(
  INITIAL_TOOLS.map(t => [t.id, t.name.toLowerCase().trim()])
);

interface LocalizedData {
  desc: string;
  tags: string[];
}

export const TOOL_TRANSLATIONS: Record<number, Partial<Record<Language, LocalizedData>>> = {
  // 1: Google AI Studio
  1: {
    zh: {
      desc: "提供超大上下文窗口的 Gemini 模型访问，支持快速原型设计与应用开发。",
      tags: ["Gemini", "API", "大语言模型", "多模态"]
    }
  },

  // 2: Vercel v0
  2: {
    zh: {
      desc: "基于文本提示与 Shadcn UI，即时生成完整的前端 UI 布局与 React 代码组件。",
      tags: ["React", "Tailwind", "UI生成"]
    }
  },

  // 3: Hugging Face Spaces
  3: {
    zh: {
      desc: "探索并测试成千上万社区托管的开源 AI 模型与交互式 Gradio 应用。",
      tags: ["开源", "Gradio", "PyTorch"]
    }
  },

  // 4: Photoroom
  4: {
    zh: {
      desc: "影棚级背景消除、自动化商品抠图与批量图像资产一键编辑。",
      tags: ["电商", "抠图背景", "素材处理"]
    }
  },

  // 5: Cursor
  5: {
    zh: {
      desc: "专为 AI 结对编程、代码库全量索引与跨文件即时编辑设计的现代化代码编辑器。",
      tags: ["IDE", "VSCode", "自动补全"]
    }
  },

  // 6: Midjourney
  6: {
    zh: {
      desc: "业界领先的文本生成图像引擎，支持 Discord 与 Web 界面，生成超逼真艺术作品。",
      tags: ["图像生成", "艺术创作", "超逼真"]
    }
  },

  // 7: ElevenLabs
  7: {
    zh: {
      desc: "支持 30+ 种语言的超逼真 AI 语音合成、声音克隆与文本转语音引擎。",
      tags: ["语音合成", "文字变语音", "音频处理"]
    }
  },

  // 8: Perplexity AI
  8: {
    zh: {
      desc: "对话式 AI 搜索引擎，结合实时网络搜索并列出精确参考文献与来源。",
      tags: ["搜索", "学术研究", "引文出处"]
    }
  },

  // 9: Replicate
  9: {
    zh: {
      desc: "使用简单 HTTP API 接口在云端无缝运行开源机器学习与大模型推理。",
      tags: ["API", "云端推理", "Llama"]
    }
  },

  // 10: ChatGPT
  10: {
    zh: {
      desc: "OpenAI 旗舰对话助手，搭载高级逻辑推理模型，轻松处理复杂问答与专业任务。",
      tags: ["聊天机器人", "GPT-4o", "深度推理"]
    }
  },

  // 11: Claude AI
  11: {
    zh: {
      desc: "Anthropic 出品的旗舰对话助手，在代码编写、逻辑推理与长文撰写方面出类拔萃。",
      tags: ["Anthropic", "代码编写", "写作辅助"]
    }
  },

  // 12: DeepSeek
  12: {
    zh: {
      desc: "开源推理模型，在数学计算、代码分析与逻辑推导上性价比极高。",
      tags: ["开源", "逻辑推理", "数学分析"]
    }
  },

  // 13: Figma AI
  13: {
    zh: {
      desc: "内置于 Figma 的 AI 辅助套件，支持自动画线框图、填充真文本与智能排版。",
      tags: ["设计", "原型图", "UIUX"]
    }
  },

  // 14: Galileo AI
  14: {
    zh: {
      desc: "根据简单的文字描述，秒级生成高保真移动端与 Web 界面设计图。",
      tags: ["UI生成", "导出Figma", "网页设计"]
    }
  },

  // 15: Relume
  15: {
    zh: {
      desc: "AI 驱动的网站地图与线框布局构建器，几分钟内完成响应式网页架构设计。",
      tags: ["网站地图", "线框图", "Webflow"]
    }
  },

  // 16: LangChain
  16: {
    zh: {
      desc: "开源开发者框架，旨在链接大语言模型、上下文记忆与向量数据库管道。",
      tags: ["智能体", "模型链", "Python"]
    }
  },

  // 17: Ollama
  17: {
    zh: {
      desc: "在本地电脑离线一键运行 Llama 3、Mistral 等开源大语言模型，确保隐私安全。",
      tags: ["本地模型", "隐私保护", "跨平台"]
    }
  },

  // 18: Pinecone
  18: {
    zh: {
      desc: "云原生向量数据库，专为高并发 RAG 知识库检索与 AI 智能体数据匹配打造。",
      tags: ["向量数据库", "RAG检索", "Embedding"]
    }
  },

  // 19: Groq
  19: {
    zh: {
      desc: "基于 LPU 芯片的超高速推理引擎，为开源 AI 模型提供闪电般的 Token 输出速度。",
      tags: ["硬件芯片", "极速生成", "模型推理"]
    }
  },

  // 20: Runway Gen-3
  20: {
    zh: {
      desc: "新一代 AI 视频生成大模型，提供电影级高逼真动态镜头控制与视觉素材。",
      tags: ["视频生成", "文字生成视频", "电影级"]
    }
  },

  // 21: Magnific AI
  21: {
    zh: {
      desc: "高级 AI 图片超分辨率变清晰与增强工具，为数字图片注入逼真细节与质感。",
      tags: ["图片高清化", "细节增强", "纹理修正"]
    }
  },

  // 22: Krea AI
  22: {
    zh: {
      desc: "实时画布生成与屏幕实时渲染工具，拖拽形状即可无缝渲染精化图案。",
      tags: ["实时渲染", "画布创作", "创意设计"]
    }
  },

  // 23: Luma Dream Machine
  23: {
    zh: {
      desc: "极速电影感视频生成平台，轻松创建自然平滑的运镜与角色物理动画。",
      tags: ["视频生成", "运镜动画", "3D物理"]
    }
  },

  // 24: Suno AI
  24: {
    zh: {
      desc: "只需一段提示词即可生成具备完整人声与专业编曲的录音室级别歌曲。",
      tags: ["音乐生成", "词曲创作", "AI人声"]
    }
  },

  // 25: Udio
  25: {
    zh: {
      desc: "高级音乐生成系统，擅长高保真声学乐器录音、清晰混音与多流派原声创作。",
      tags: ["音乐创作", "精细混音", "人声声学"]
    }
  },

  // 26: Notion AI
  26: {
    zh: {
      desc: "内置于 Notion 的工作区 AI 助手，智能提炼文档要点、规划任务并解答团队笔记问题。",
      tags: ["协同办公", "文档摘要", "笔记知识库"]
    }
  },

  // 27: Fireflies.ai
  27: {
    zh: {
      desc: "自动会议记录助手，一键录音、转写文字并自动提取关键行动项与待办事项。",
      tags: ["会议纪要", "语音转文字", "CRM整合"]
    }
  },

  // 28: Gamma
  28: {
    zh: {
      desc: "输入一段文字，即可自动生成美观现代的幻灯片演示文稿、文档与互动网页。",
      tags: ["演示文稿", "PPT生成", "商业路演"]
    }
  },

  // 29: Otter.ai
  29: {
    zh: {
      desc: "实时语音转文字引擎，支持说话人自动区分、实时会议笔记与关键词高亮。",
      tags: ["音频处理", "实时转写", "商务办公"]
    }
  },

  // 30: AudioCraft
  30: {
    zh: {
      desc: "Meta 开源的深度学习音频代码库，支持高品质音效生成与背景音乐合成。",
      tags: ["开源", "音效合成", "Meta"]
    }
  },

  // 31: NotebookLM
  31: {
    zh: {
      desc: "Google 打造的个性化 AI 研究助手，严格基于您上传的文档提供精准检索与语音导读。",
      tags: ["学术研究", "严格溯源", "语音播客"]
    }
  },

  // 32: GitHub Copilot
  32: {
    zh: {
      desc: "原生集成于主流 IDE 中的 AI 结对程序员，提供实时代码补全与智能对话诊断。",
      tags: ["GitHub", "IDE", "自动补全"]
    }
  },

  // 33: Flux.1
  33: {
    zh: {
      desc: "Black Forest Labs 出品的顶级开源图像生成模型，具备无与伦比的文字渲染能力与真实度。",
      tags: ["开源", "文字渲染", "超高真感"]
    }
  },

  // 34: Bolt.new
  34: {
    zh: {
      desc: "提示词驱动的全栈 WebContainer 沙盒，直接在浏览器中构建、运行与部署 Web 应用。",
      tags: ["全栈开发", "WebContainer", "快速原型"]
    }
  },

  // 35: Poe by Quora
  35: {
    zh: {
      desc: "Quora 旗下多模型对话平台，在一个界面中自由体验 GPT-4、Claude、Llama 与自定义机器人。",
      tags: ["模型聚合", "多模型", "聊天机器人"]
    }
  },

  // 36: DeepL Translate
  36: {
    zh: {
      desc: "AI 神经网络翻译引擎，提供极度精准的多语言文本、文档与语音翻译。",
      tags: ["多语言翻译", "本地化", "写作润色"]
    }
  },

  // 37: DeepSeek
  37: {
    zh: {
      desc: "知名的国产 AI 助手，以强悍的逻辑推理、代码编写、数学解题与长文本处理能力著称。",
      tags: ["DeepSeek", "大模型", "逻辑推理", "代码"]
    }
  },

  // 38: 豆包 (Doubao)
  38: {
    zh: {
      desc: "字节跳动旗下的 AI 智能助手，支持智能对话、写作辅助、搜索、AI绘画、视频生成与语音交互。",
      tags: ["豆包", "字节跳动", "AI对话", "多模态"]
    }
  },

  // 39: Kimi
  39: {
    zh: {
      desc: "月之暗面推出的 AI 助手，支持联网搜索、深度推理、多模态理解、长文本对话与自主 Agent 智能体。",
      tags: ["Kimi", "月之暗面", "深度研究", "智能体"]
    }
  },

  // 40: 通义千问 (Qwen)
  40: {
    zh: {
      desc: "阿里推出的通用 AI 平台，涵盖对话、逻辑推理、编程助手、多模态生成、学术研究与智能体应用。",
      tags: ["通义千问", "阿里云", "大模型", "多模态"]
    }
  },

  // 41: 腾讯元宝 (Yuanbao)
  41: {
    zh: {
      desc: "腾讯出品的 AI 助手，深度集成微信搜索、文档分析、灵感写作、图像理解与腾讯生态服务。",
      tags: ["腾讯元宝", "腾讯", "AI搜索", "文档分析"]
    }
  },

  // 42: 智谱清言 (ChatGLM)
  42: {
    zh: {
      desc: "智谱 AI 推出的 AI 助手，基于 GLM 模型，支持长文本阅读、智能问答、AI 绘图、代码编写与智能体。",
      tags: ["智谱清言", "ChatGLM", "智谱AI", "智能体"]
    }
  },

  // 43: 文心一言 (ERNIE)
  43: {
    zh: {
      desc: "百度基于文心大模型打造的 AI 知识助手，支持文学创作、商业文案、数理逻辑与多模态生成。",
      tags: ["文心一言", "百度", "文心大模型", "AI助手"]
    }
  },

  // 44: 讯飞星火 (Spark)
  44: {
    zh: {
      desc: "科大讯飞推出的认知大模型，强于语言理解、教育辅导、语音交互、公文写作与多模态能力。",
      tags: ["讯飞星火", "科大讯飞", "语音交互", "教育辅助"]
    }
  },

  // 45: MiniMax
  45: {
    zh: {
      desc: "领先的国产 AI 科技公司，提供语言、语音、图像、视频及 Agent 智能体的全栈多模态大模型服务。",
      tags: ["MiniMax", "大模型", "语音合成", "多模态"]
    }
  },

  // 46: 海螺 AI (Hailuo AI)
  46: {
    zh: {
      desc: "MiniMax 旗下的 AI 视频生成平台，支持文生视频与图生视频，轻松生成电影级画质与流畅动态。",
      tags: ["海螺AI", "MiniMax", "文生视频", "图生视频"]
    }
  },

  // 47: 可灵 AI (Kling AI)
  47: {
    zh: {
      desc: "快手推出的新一代 AI 视频生成平台，支持超高质量的文生视频、图生视频与创意镜头控制。",
      tags: ["可灵AI", "快手", "视频生成", "运镜控制"]
    }
  },

  // 48: 即梦 AI (Jimeng AI)
  48: {
    zh: {
      desc: "字节跳动旗下的 AI 视觉创作平台，支持文生图、文生视频、图像质感修饰与创意视频剪辑。",
      tags: ["即梦AI", "字节跳动", "AI绘画", "AI视频"]
    }
  },

  // 49: Vidu
  49: {
    zh: {
      desc: "生数科技出品的 AI 视频大模型，支持极速文生视频、图生视频、首尾帧控制与动漫运镜效果。",
      tags: ["Vidu", "生数科技", "视频大模型", "动漫动画"]
    }
  },

  // 50: Lovart
  50: {
    zh: {
      desc: "AI 设计智能体，只需输入自然语言简报，即可自动生成设计稿、营销海报、品牌素材与宣传视频。",
      tags: ["Lovart", "设计Agent", "品牌设计", "创意海报"]
    }
  },

  // 51: LiblibAI
  51: {
    zh: {
      desc: "国内领先的 AI 创作与模型分享社区，汇集海量 Stable Diffusion 模型、LoRA 权重与工作流。",
      tags: ["LiblibAI", "StableDiffusion", "LoRA模型", "AI绘画"]
    }
  },

  // 52: TRAE
  52: {
    zh: {
      desc: "字节跳动推出的 AI 编程 IDE 环境，内置 Agent 智能体编程工作流，支持代码生成、重构与项目解析。",
      tags: ["TRAE", "字节跳动", "AI编程", "代码Agent"]
    }
  },

  // 53: CodeGeeX
  53: {
    zh: {
      desc: "智谱 AI 推出的开源代码生成助手，支持多语言补全、代码翻译、行内解释与 IDE 插件整合。",
      tags: ["CodeGeeX", "智谱AI", "代码生成", "IDE插件"]
    }
  },

  // 54: 腾讯混元 (Hunyuan)
  54: {
    zh: {
      desc: "腾讯多模态大模型生态，涵盖文本大语言模型、文生图、文生视频、3D 生成与开发者 API。",
      tags: ["腾讯混元", "腾讯", "多模态", "文生图视频"]
    }
  },

  // 55: 通义万相
  55: {
    zh: {
      desc: "阿里云推出的 AI 视觉生成大模型，支持创作艺术画作、设计海报、图像局部重绘与文生视频。",
      tags: ["通义万相", "阿里云", "AI绘画", "图像编辑"]
    }
  },

  // 56: 通义灵码
  56: {
    zh: {
      desc: "阿里云推出的 AI 编码辅助工具，支持智能代码补全、代码注释自动生成、单元测试生成与研发问答。",
      tags: ["通义灵码", "阿里云", "代码助手", "单元测试"]
    }
  },

  // 57: 百炼 (Model Studio)
  57: {
    zh: {
      desc: "阿里云一站式大模型开发平台，提供通义千问等丰富模型调用、应用构建、Agent 工作流编排与 API。",
      tags: ["阿里云", "百炼平台", "API调用", "应用开发"]
    }
  },

  // 58: Coze
  58: {
    zh: {
      desc: "字节跳动旗下的无代码 AI Agent 智能体与聊天机器人开发平台，快速构建插件、工作流与应用。",
      tags: ["Coze", "扣子", "字节跳动", "Agent开发"]
    }
  },

  // 59: 扣子空间 (Coze Space)
  59: {
    zh: {
      desc: "Coze 扣子生态下的个人与团队 AI 工作空间，轻松管理、协同与运行各类智能体自动化应用。",
      tags: ["扣子空间", "Coze", "智能体", "自动化"]
    }
  },

  // 60: Manus
  60: {
    zh: {
      desc: "全自主 AI Agent 平台，能够自主进行网络搜索、分析数据、编写代码、生成文件并执行多步骤复杂任务。",
      tags: ["Manus", "自主 Agent", "任务自动化", "深度调研"]
    }
  },

  // 61: 秘塔 AI 搜索
  61: {
    zh: {
      desc: "无广告的国产 AI 搜索引擎，提供结构化大纲、思维导图、学术研究文献溯源与深度答案提取。",
      tags: ["秘塔搜索", "AI搜索", "结构化答案", "学术溯源"]
    }
  },

  // 62: 天工 AI
  62: {
    zh: {
      desc: "昆仑万维打造的通用 AI 助手，融合 AI 搜索、长文写作、文档解读与生成式对话服务。",
      tags: ["天工AI", "昆仑万维", "AI搜索", "智能写作"]
    }
  },

  // 63: 夸克 AI
  63: {
    zh: {
      desc: "阿里旗下夸克浏览器的 AI 增强助手，集成智能搜索、文档处理、学习辅导与提炼总结功能。",
      tags: ["夸克", "阿里", "智能搜索", "办公效率"]
    }
  },

  // 64: 通义听悟
  64: {
    zh: {
      desc: "阿里云出品的音视频 AI 助手，支持实时语音转文字、会议纪要自动提炼、章节划分与多语言翻译。",
      tags: ["通义听悟", "阿里云", "语音转文字", "会议纪要"]
    }
  },

  // 65: 讯飞听见
  65: {
    zh: {
      desc: "科大讯飞旗下的智能语音转写与会议录音服务，提供高精度语音转文字、字幕匹配与会议总结。",
      tags: ["讯飞听见", "科大讯飞", "语音转写", "字幕制作"]
    }
  },

  // 66: 腾讯会议 AI
  66: {
    zh: {
      desc: "腾讯会议内置的 AI 智能助手，提供会议实时字幕、智能纪要生成、待办事项提取与重点提醒。",
      tags: ["腾讯会议", "腾讯", "AI纪要", "高效办公"]
    }
  },

  // 67: 讯飞绘画
  67: {
    zh: {
      desc: "科大讯飞出品的 AI 视觉艺术创作服务，通过自然语言文字轻松生成高精细度插画与设计图案。",
      tags: ["讯飞绘画", "科大讯飞", "AI插画", "艺术创作"]
    }
  },

  // 68: 美图设计室
  68: {
    zh: {
      desc: "美图公司推出的电商与商业设计 AI 工具，一键生成商品海报、抠图抠人像、电商主图与营销素材。",
      tags: ["美图设计室", "美图", "电商设计", "一键抠图"]
    }
  },

  // 69: 美图秀秀 AI
  69: {
    zh: {
      desc: "美图秀秀 AI 创作生态，提供 AI 肖像画、照片画质增强、动漫修图、滤镜艺术化与智能修图。",
      tags: ["美图秀秀", "AI修图", "画质增强", "人像美化"]
    }
  },

  // 70: 妙鸭相机
  70: {
    zh: {
      desc: "现象级 AI 肖像写真生成服务，只需上传数张照片即可一键生成专业商务形象照与各类风格写真。",
      tags: ["妙鸭相机", "AI写真", "形象照", "人像摄影"]
    }
  },

  // 71: 堆友 AI
  71: {
    zh: {
      desc: "阿里巴巴设计团队打造的 AI 创意设计社区，提供 AI 绘图、3D 材质素材库与电商设计工作流。",
      tags: ["堆友", "阿里设计", "3D素材", "电商创意"]
    }
  },

  // 72: 稿定设计
  72: {
    zh: {
      desc: "知名在线视觉设计平台，集成了 AI 作图、自动抠图、智能文案写作、营销海报模板与电商设计。",
      tags: ["稿定设计", "海报模板", "AI作图", "营销设计"]
    }
  },

  // 73: 商汤日日新 (SenseNova)
  73: {
    zh: {
      desc: "商汤科技打造的企业级通用人工智能大模型体系，涵盖语言大模型、多模态、计算机视觉与 API。",
      tags: ["商汤科技", "日日新", "企业级AI", "视觉大模型"]
    }
  },

  // 74: 零一万物 (01.AI)
  74: {
    zh: {
      desc: "李开复创办的 AI 创新公司，推出的 Yi 系列大模型在开源与企业级多模态评测中表现优异。",
      tags: ["零一万物", "Yi大模型", "开源模型", "李开复"]
    }
  },

  // 75: 阶跃星辰 (StepFun)
  75: {
    zh: {
      desc: "国产大模型创业公司，专注于千亿参数多模态基础大模型与智能 Agent 技术的研发与应用。",
      tags: ["阶跃星辰", "StepFun", "多模态", "基础大模型"]
    }
  },

  // 76: 百川智能 (Baichuan)
  76: {
    zh: {
      desc: "王小川创办的大模型科技公司，专注于高性能 Baichuan 语言大模型与医疗等行业解决方案。",
      tags: ["百川智能", "百川大模型", "王小川", "行业大模型"]
    }
  },

  // 77: MiniMax Agent
  77: {
    zh: {
      desc: "MiniMax 推出的智能体任务执行环境，支持复杂计划分解、工具调用与多模态自动化交付。",
      tags: ["MiniMax", "Agent智能体", "自动化", "多模态"]
    }
  },

  // 78: 星野
  78: {
    zh: {
      desc: "基于 AI 大模型的虚拟角色互动与情感陪伴平台，打造逼真的对话体验与个性化角色社群。",
      tags: ["星野", "AI陪伴", "虚拟角色", "情感对话"]
    }
  },

  // 79: 猫箱
  79: {
    zh: {
      desc: "AI 虚拟角色互动体验社区，用户可自定义与创造各类性格的角色进行沉浸式对话与剧本互动。",
      tags: ["猫箱", "虚拟角色", "沉浸剧本", "AI对话"]
    }
  },

  // 80: 筑梦岛
  80: {
    zh: {
      desc: "AI 角色对话与互动创作平台，专注于丰富的情感陪伴、角色故事演绎与沉浸式社交。",
      tags: ["筑梦岛", "AI角色", "故事演绎", "情感互动"]
    }
  },

  // 81: Soul AI
  81: {
    zh: {
      desc: "Soul 社交平台集成的 AI 角色与陪伴体验，为用户提供实时 AI 社交伙伴与对话玩伴。",
      tags: ["Soul", "AI社交", "虚拟伴侣", "情感交流"]
    }
  },

  // 82: 腾讯智影
  82: {
    zh: {
      desc: "腾讯智能视频创作套件，支持数字人播报、文本一键成片、智能字幕匹配、AI 变声与视频剪辑。",
      tags: ["腾讯智影", "腾讯", "数字人", "文本成片"]
    }
  },

  // 83: 数字人小助手
  83: {
    zh: {
      desc: "科大讯飞的 2D/3D 数字人与虚拟主播技术，广泛用于新闻播报、课程讲解、客服与媒体制作。",
      tags: ["数字人", "科大讯飞", "虚拟主播", "语音播报"]
    }
  },

  // 84: 华为盘古大模型
  84: {
    zh: {
      desc: "华为云打造的企业级行业大模型生态，覆盖 NLP、视觉、矿山、气象、药物分子与工业计算。",
      tags: ["盘古大模型", "华为云", "工业AI", "行业大模型"]
    }
  },

  // 85: ModelScope
  85: {
    zh: {
      desc: "阿里巴巴开源的 AI 模型社区（魔搭），提供数千款开源模型托管、在线体验、数据集与训练部署环境。",
      tags: ["ModelScope", "魔搭", "阿里开源", "AI模型社区"]
    }
  },

  // 86: 魔搭社区
  86: {
    zh: {
      desc: "国内顶尖的开源 AI 开发者社区，汇集丰富的大模型 Demo、数据集、推理算力与开发者学习资源。",
      tags: ["魔搭社区", "开源社区", "数据集", "开发者资源"]
    }
  },

  // 87: Google Gemini
  87: {
    zh: {
      desc: "Google 旗下的多模态对话式 AI 智能助手，由 Gemini 大模型驱动，支持深度逻辑推理、写作、编程、视觉理解与实时搜索。",
      tags: ["Gemini", "多模态", "AI 助手", "Google"]
    }
  }
};

export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "All": { en: "All", zh: "全部" },
  "Text & Coding": { en: "Text & Coding", zh: "文本与编程" },
  "AI Assistant": { en: "AI Assistant", zh: "AI 助手" },
  "Text & Research": { en: "Text & Research", zh: "文本与研究" },
  "Multimodal AI": { en: "Multimodal AI", zh: "多模态 AI" },
  "AI Video": { en: "AI Video", zh: "AI 视频" },
  "AI Image & Video": { en: "AI Image & Video", zh: "AI 图像与视频" },
  "AI Design": { en: "AI Design", zh: "AI 设计" },
  "AI Image": { en: "AI Image", zh: "AI 图像" },
  "Coding": { en: "Coding", zh: "编程助手" },
  "AI Platform": { en: "AI Platform", zh: "AI 开放平台" },
  "AI Agents": { en: "AI Agents", zh: "AI 智能体" },
  "AI Search": { en: "AI Search", zh: "AI 搜索" },
  "AI Search & Productivity": { en: "AI Search & Productivity", zh: "AI 搜索与效率" },
  "Productivity": { en: "Productivity", zh: "效率工具" },
  "AI Models": { en: "AI Models", zh: "AI 模型" },
  "AI Companion": { en: "AI Companion", zh: "AI 陪伴/角色" },
  "AI Social": { en: "AI Social", zh: "AI 社交" },
  "Digital Human": { en: "Digital Human", zh: "数字人" },
  "AI Developer Tools": { en: "AI Developer Tools", zh: "AI 开发者工具" },
  "Images & Creative": { en: "Images & Creative", zh: "图像与创意" },
  "Design & UI": { en: "Design & UI", zh: "设计与 UI" },
  "Developer Tools": { en: "Developer Tools", zh: "开发者工具" },
  "Productivity & Audio": { en: "Productivity & Audio", zh: "效率与音频" }
};

export const BADGE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "All": { en: "Pricing", zh: "运营模式" },
  "Free": { en: "Free", zh: "免费" },
  "Freemium": { en: "Freemium", zh: "部分免费" },
  "Paid": { en: "Paid", zh: "付费" },
  "API": { en: "API", zh: "API 接口" },
  "Enterprise": { en: "Enterprise", zh: "企业版" }
};

export const TAG_TRANSLATIONS_DICT: Record<string, Record<Language, string>> = {
  "enterprise": { en: "Enterprise", zh: "企业级" },
  "ai assistant": { en: "AI Assistant", zh: "AI 助手" },
  "text & research": { en: "Text & Research", zh: "文本与研究" },
  "text & rearch": { en: "Text & Research", zh: "文本与研究" },
  "multimodal ai": { en: "Multimodal AI", zh: "多模态 AI" },
  "multimodel ai": { en: "Multimodal AI", zh: "多模态 AI" },
  "ai agents": { en: "AI Agents", zh: "AI 智能体" },
  "ai agent": { en: "AI Agent", zh: "AI 智能体" },
  "agent": { en: "Agent", zh: "智能体" },
  "agents": { en: "Agents", zh: "智能体" },
  "ai search": { en: "AI Search", zh: "AI 搜索" },
  "search": { en: "Search", zh: "搜索" },
  "research": { en: "Research", zh: "深度研究" },
  "deep search": { en: "Deep Search", zh: "深度搜索" },
  "deep research": { en: "Deep Research", zh: "深度调研" },
  "text & coding": { en: "Text & Coding", zh: "文本与编程" },
  "coding": { en: "Coding", zh: "代码编写" },
  "writing": { en: "Writing", zh: "写作辅助" },
  "reasoning": { en: "Reasoning", zh: "逻辑推理" },
  "chatbot": { en: "Chatbot", zh: "聊天机器人" },
  "chatbots": { en: "Chatbots", zh: "聊天机器人" },
  "chat": { en: "Chat", zh: "对话" },
  "ide": { en: "IDE", zh: "开发环境" },
  "vscode": { en: "VSCode", zh: "VSCode 插件" },
  "autocompletion": { en: "Autocompletion", zh: "自动补全" },
  "autocomplete": { en: "Autocomplete", zh: "代码补全" },
  "citations": { en: "Citations", zh: "文献引文" },
  "llm": { en: "LLM", zh: "大语言模型" },
  "multimodal": { en: "Multimodal", zh: "多模态" },
  "multimodel": { en: "Multimodal", zh: "多模态" },
  "open source": { en: "Open Source", zh: "开源" },
  "opensource": { en: "OpenSource", zh: "开源" },
  "videogen": { en: "VideoGen", zh: "视频生成" },
  "video generation": { en: "Video Generation", zh: "视频生成" },
  "video": { en: "Video", zh: "视频" },
  "text-to-video": { en: "Text-to-Video", zh: "文生视频" },
  "image-to-video": { en: "Image-to-Video", zh: "图生视频" },
  "text-to-image": { en: "Text-to-Image", zh: "文生图" },
  "cinematic": { en: "Cinematic", zh: "电影级" },
  "upscaling": { en: "Upscaling", zh: "高清放大" },
  "textures": { en: "Textures", zh: "纹理质感" },
  "realtime": { en: "RealTime", zh: "实时渲染" },
  "real time": { en: "Real Time", zh: "实时渲染" },
  "canvas": { en: "Canvas", zh: "画板创作" },
  "3dphysics": { en: "3DPhysics", zh: "3D 物理" },
  "textrendering": { en: "TextRendering", zh: "文字渲染" },
  "voice synthesis": { en: "Voice Synthesis", zh: "语音合成" },
  "tts": { en: "TTS", zh: "文字转语音" },
  "audio": { en: "Audio", zh: "音频处理" },
  "voice": { en: "Voice", zh: "语音交互" },
  "musicgen": { en: "MusicGen", zh: "音乐生成" },
  "songwriting": { en: "Songwriting", zh: "词曲创作" },
  "vocals": { en: "Vocals", zh: "AI 人声" },
  "music": { en: "Music", zh: "音乐生成" },
  "acoustics": { en: "Acoustics", zh: "声学混音" },
  "workspace": { en: "Workspace", zh: "协同工作区" },
  "summarization": { en: "Summarization", zh: "文档摘要" },
  "notes": { en: "Notes", zh: "笔记管理" },
  "meetingnotes": { en: "MeetingNotes", zh: "会议纪要" },
  "meetings": { en: "Meetings", zh: "会议纪要" },
  "crm": { en: "CRM", zh: "CRM 集成" },
  "presentations": { en: "Presentations", zh: "演示文稿" },
  "slides": { en: "Slides", zh: "幻灯片" },
  "pitchdecks": { en: "PitchDecks", zh: "商业路演" },
  "business": { en: "Business", zh: "商务办公" },
  "soundfx": { en: "SoundFX", zh: "音效合成" },
  "translation": { en: "Translation", zh: "多语言翻译" },
  "localization": { en: "Localization", zh: "本地化" },
  "design": { en: "Design", zh: "UI/UX 设计" },
  "prototyping": { en: "Prototyping", zh: "原型图" },
  "uiux": { en: "UIUX", zh: "界面设计" },
  "ui generation": { en: "UI Generation", zh: "UI 生成" },
  "figma export": { en: "Figma Export", zh: "导出 Figma" },
  "webdesign": { en: "WebDesign", zh: "网页设计" },
  "sitemaps": { en: "Sitemaps", zh: "网站地图" },
  "wireframes": { en: "Wireframes", zh: "线框图" },
  "webflow": { en: "Webflow", zh: "Webflow 导出" },
  "fullstack": { en: "Fullstack", zh: "全栈开发" },
  "webcontainer": { en: "WebContainer", zh: "WebContainer" },
  "cloud inference": { en: "Cloud Inference", zh: "云端推理" },
  "chaining": { en: "Chaining", zh: "模型链" },
  "localllm": { en: "LocalLLM", zh: "本地大模型" },
  "privacy": { en: "Privacy", zh: "隐私保护" },
  "vectordb": { en: "VectorDB", zh: "向量数据库" },
  "rag": { en: "RAG", zh: "RAG 检索" },
  "embeddings": { en: "Embeddings", zh: "向量嵌入" },
  "hardware": { en: "Hardware", zh: "硬件加速" },
  "speed": { en: "Speed", zh: "极速推理" },
  "inference": { en: "Inference", zh: "模型推理" },
  "background removal": { en: "Background Removal", zh: "背景抠图" },
  "assets": { en: "Assets", zh: "素材处理" },
  "image generation": { en: "Image Generation", zh: "图像生成" },
  "image": { en: "Image", zh: "图像处理" },
  "photorealism": { en: "Photorealism", zh: "超逼真" },
  "education": { en: "Education", zh: "教育辅导" },
  "documents": { en: "Documents", zh: "文档分析" },
  "automation": { en: "Automation", zh: "任务自动化" },
  "productivity": { en: "Productivity", zh: "效率提升" },
  "transcription": { en: "Transcription", zh: "语音转写" },
  "ai summary": { en: "AI Summary", zh: "AI 总结" },
  "art": { en: "Art", zh: "艺术创作" },
  "foundation model": { en: "Foundation Model", zh: "基础大模型" },
  "models": { en: "Models", zh: "模型生态" },
  "datasets": { en: "Datasets", zh: "数据集" },
  "characters": { en: "Characters", zh: "虚拟角色" },
  "companion": { en: "Companion", zh: "情感陪伴" },
  "roleplay": { en: "Roleplay", zh: "角色扮演" },
  "storytelling": { en: "Storytelling", zh: "故事演绎" },
  "social": { en: "Social", zh: "AI 社交" },
  "digital human": { en: "Digital Human", zh: "数字人" },
  "avatar": { en: "Avatar", zh: "虚拟主播" },
  "ecommerce": { en: "Ecommerce", zh: "电商设计" },
  "photo": { en: "Photo", zh: "照片修图" },
  "enhancement": { en: "Enhancement", zh: "画质增强" },
  "portrait": { en: "Portrait", zh: "人像写真" },
  "photography": { en: "Photography", zh: "摄影" },
  "templates": { en: "Templates", zh: "设计模板" },
  "marketing": { en: "Marketing", zh: "营销设计" },
  "design agent": { en: "Design Agent", zh: "设计智能体" },
  "branding": { en: "Branding", zh: "品牌设计" },
  "creative": { en: "Creative", zh: "创意设计" },
  "stable diffusion": { en: "Stable Diffusion", zh: "Stable Diffusion" },
  "lora": { en: "LoRA", zh: "LoRA 模型" },
  "community": { en: "Community", zh: "社区提交" },
  "google": { en: "Google", zh: "Google" },
  "gemini": { en: "Gemini", zh: "Gemini" }
};

export function translateCategory(category: string, language?: string): string {
  if (!category) return category;
  if (!language || language === 'en') return category;
  const match = CATEGORY_TRANSLATIONS[category];
  return match ? (match[language as Language] || category) : category;
}

export function translateBadge(badge: string, language?: string): string {
  if (!badge) return badge;
  if (!language || language === 'en') return badge;
  const match = BADGE_TRANSLATIONS[badge];
  return match ? (match[language as Language] || badge) : badge;
}

export function translateTag(tag: string, language?: string): string {
  if (!tag) return tag;
  if (!language || language === 'en') return tag;
  const normalizedKey = tag.trim().toLowerCase();
  const match = TAG_TRANSLATIONS_DICT[normalizedKey];
  return match ? (match[language as Language] || tag) : tag;
}

export function getLocalizedTool(tool: Tool, language?: string): Tool {
  if (!tool) return tool;
  if (!language || language === 'en') return tool;

  // Check if this tool matches an initial static tool by ID and name
  const expectedInitialName = INITIAL_TOOL_NAME_MAP.get(tool.id);
  const isInitialStaticTool = Boolean(expectedInitialName && expectedInitialName === tool.name.toLowerCase().trim());

  const itemTrans = isInitialStaticTool ? TOOL_TRANSLATIONS[tool.id]?.[language as Language] : undefined;
  const baseDesc = itemTrans?.desc || tool.desc;
  const rawTags = itemTrans?.tags || (tool.tags && Array.isArray(tool.tags) ? tool.tags : []);

  const localizedTags = rawTags.map(tag => translateTag(tag, language));

  return {
    ...tool,
    desc: baseDesc,
    tags: localizedTags
  };
}
