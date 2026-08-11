import { Tool } from '../types';
import { Language } from '../lib/i18n';

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
    },
    es: {
      desc: "Accede a modelos Gemini con grandes ventanas de contexto para prototipado rápido y desarrollo de apps.",
      tags: ["Gemini", "API", "LLM", "Multimodal"]
    },
    ja: {
      desc: "広大なコンテキストウィンドウを持つGeminiモデルにアクセスし、迅速なプロトタイピングとアプリ開発を実現。",
      tags: ["Gemini", "API", "LLM", "マルチモーダル"]
    },
    de: {
      desc: "Zugriff auf Gemini-Modelle mit riesigen Kontextfenstern für schnelles Prototyping und App-Entwicklung.",
      tags: ["Gemini", "API", "LLM", "Multimodal"]
    },
    fr: {
      desc: "Accédez aux modèles Gemini avec d'immenses fenêtres de contexte pour le prototypage rapide et le développement d'applications.",
      tags: ["Gemini", "API", "LLM", "Multimodal"]
    },
    pt: {
      desc: "Acesse modelos Gemini com grandes janelas de contexto para prototipagem rápida e desenvolvimento de aplicativos.",
      tags: ["Gemini", "API", "LLM", "Multimodal"]
    },
    ko: {
      desc: "대규모 컨텍스트 창을 갖춘 Gemini 모델에 액세스하여 빠른 프로토타이핑 및 앱 개발을 지원합니다.",
      tags: ["Gemini", "API", "대형언어모델", "멀티모달"]
    }
  },

  // 2: Vercel v0
  2: {
    zh: {
      desc: "基于文本提示与 Shadcn UI，即时生成完整的前端 UI 布局与 React 代码组件。",
      tags: ["React", "Tailwind", "UI生成"]
    },
    es: {
      desc: "Genera diseños de UI frontend y componentes de código usando descripciones de texto y Shadcn UI.",
      tags: ["React", "Tailwind", "GeneraciónUI"]
    },
    ja: {
      desc: "テキストプロンプトとShadcn UIを使用して、完全なフロントエンドUIレイアウトとコンポーネントコードを生成。",
      tags: ["React", "Tailwind", "UI生成"]
    },
    de: {
      desc: "Generieren Sie komplette Frontend-UI-Layouts und Code-Komponenten mithilfe von Textprompts und Shadcn UI.",
      tags: ["React", "Tailwind", "UI-Generierung"]
    },
    fr: {
      desc: "Générez des interfaces utilisateur frontend et des composants de code à partir de descriptions textuelles et Shadcn UI.",
      tags: ["React", "Tailwind", "GénérationUI"]
    },
    pt: {
      desc: "Gere layouts de interface frontend e componentes de código completos usando descrições de texto e Shadcn UI.",
      tags: ["React", "Tailwind", "GeraçãoUI"]
    },
    ko: {
      desc: "프롬프트와 Shadcn UI를 사용하여 완전한 프론트엔드 UI 레이아웃 및 코드 컴포넌트를 생성합니다.",
      tags: ["React", "Tailwind", "UI생성"]
    }
  },

  // 3: Hugging Face Spaces
  3: {
    zh: {
      desc: "探索并测试成千上万社区托管的开源 AI 模型与交互式 Gradio 应用。",
      tags: ["开源", "Gradio", "PyTorch"]
    },
    es: {
      desc: "Explora y prueba miles de modelos de IA de código abierto y aplicaciones interactivas Gradio.",
      tags: ["CódigoAbierto", "Gradio", "PyTorch"]
    },
    ja: {
      desc: "コミュニティがホストする数千のオープンソースAIモデルと対話型Gradioアプリを試用・探索。",
      tags: ["オープンソース", "Gradio", "PyTorch"]
    },
    de: {
      desc: "Entdecken und testen Sie Tausende von der Community gehostete Open-Source-KI-Modelle und Gradio-Apps.",
      tags: ["OpenSource", "Gradio", "PyTorch"]
    },
    fr: {
      desc: "Explorez et testez des milliers de modèles d'IA open source et d'applications Gradio interactives.",
      tags: ["OpenSource", "Gradio", "PyTorch"]
    },
    pt: {
      desc: "Explore e teste milhares de modelos de IA de código aberto e aplicativos interativos Gradio.",
      tags: ["CódigoAberto", "Gradio", "PyTorch"]
    },
    ko: {
      desc: "커뮤니티에서 호스팅하는 수천 개의 오픈소스 AI 모델과 대화형 Gradio 앱을 탐색 및 테스트하세요.",
      tags: ["오픈소스", "Gradio", "PyTorch"]
    }
  },

  // 4: Photoroom
  4: {
    zh: {
      desc: "影棚级背景消除、自动化商品抠图与批量图像资产一键编辑。",
      tags: ["电商", "抠图背景", "素材处理"]
    },
    es: {
      desc: "Eliminación de fondos con calidad de estudio, maquetación de productos y edición en lote en segundos.",
      tags: ["ComercioElectrónico", "QuitarFondo", "Recursos"]
    },
    ja: {
      desc: "スタジオ品質の背景削除、自動商品切り抜き、バッチ画像編集を数秒で実現。",
      tags: ["EC", "背景削除", "アセット"]
    },
    de: {
      desc: "Hintergrundentfernung in Studioqualität, automatische Produktplatzierung und Stapelbearbeitung in Sekunden.",
      tags: ["E-Commerce", "HintergrundEntfernen", "Assets"]
    },
    fr: {
      desc: "Suppression d'arrière-plan de qualité studio, mise en scène automatique de produits et retouche par lot.",
      tags: ["E-commerce", "Détourage", "Ressources"]
    },
    pt: {
      desc: "Remoção de fundo com qualidade de estúdio, apresentação de produtos e edição em lote em segundos.",
      tags: ["E-commerce", "RemoverFundo", "Ativos"]
    },
    ko: {
      desc: "스튜디오 품질의 배경 제거, 자동 상품 연출 및 일괄 자산 편집을 몇 초 만에 처리합니다.",
      tags: ["이커머스", "배경제거", "자산"]
    }
  },

  // 5: Cursor
  5: {
    zh: {
      desc: "专为 AI 结对编程、代码库全量索引与跨文件即时编辑设计的现代化代码编辑器。",
      tags: ["IDE", "VSCode", "自动补全"]
    },
    es: {
      desc: "Editor de código centrado en IA diseñado para programación en pareja, indexación de código y edición de múltiples archivos.",
      tags: ["IDE", "VSCode", "Autocompletado"]
    },
    ja: {
      desc: "ペアプログラミング、コードベースのインデックス作成、複数ファイルの即座編集に対応したAI専用コードエディタ。",
      tags: ["IDE", "VSCode", "自動補完"]
    },
    de: {
      desc: "AI-First-Code-Editor für Pair-Programming, Codebase-Indexierung und schnelles Bearbeiten mehrerer Dateien.",
      tags: ["IDE", "VSCode", "Autovervollständigung"]
    },
    fr: {
      desc: "Éditeur de code axé sur l'IA conçu pour le pair programming, l'indexation de codebase et l'édition multifichier.",
      tags: ["IDE", "VSCode", "Autoplétion"]
    },
    pt: {
      desc: "Editor de código focado em IA projetado para programação em dupla, indexação de código e edição de múltiplos arquivos.",
      tags: ["IDE", "VSCode", "Autocompletar"]
    },
    ko: {
      desc: "페어 프로그래밍, 코드베이스 인덱싱 및 다중 파일 즉시 편집을 위해 설계된 AI 중심 코드 에디터.",
      tags: ["IDE", "VSCode", "자동완성"]
    }
  },

  // 6: Midjourney
  6: {
    zh: {
      desc: "业界领先的文本生成图像引擎，支持 Discord 与 Web 界面，生成超逼真艺术作品。",
      tags: ["图像生成", "艺术创作", "超逼真"]
    },
    es: {
      desc: "Generador de imágenes por texto de última generación a través de Discord y panel web para arte fotorrealista.",
      tags: ["GeneraciónImágenes", "Arte", "Fotorrealismo"]
    },
    ja: {
      desc: "DiscordおよびWebダッシュボードを通じてフォトリアルなアートを生成する最高峰の画像生成AI。",
      tags: ["画像生成", "アート", "フォトリアル"]
    },
    de: {
      desc: "Führender Text-zu-Bild-Generator über Discord und Web-Dashboard für fotorealistische Kunstwerke.",
      tags: ["Bildgenerierung", "Kunst", "Fotorealismus"]
    },
    fr: {
      desc: "Générateur texte-image de pointe via Discord et tableau de bord Web pour la création d'art photoréaliste.",
      tags: ["GénérationImage", "Art", "Photoréalisme"]
    },
    pt: {
      desc: "Gerador de texto para imagem de última geração via Discord e painel web para arte fotorrealista.",
      tags: ["GeraçãoImagem", "Arte", "Fotorrealismo"]
    },
    ko: {
      desc: "Discord 및 웹 대시보드를 통해 실사 같은 아트웍을 생성하는 최고 수준의 텍스트-이미지 생성기.",
      tags: ["이미지생성", "아트", "실사화"]
    }
  },

  // 7: ElevenLabs
  7: {
    zh: {
      desc: "支持 30+ 种语言的超逼真 AI 语音合成、声音克隆与文本转语音引擎。",
      tags: ["语音合成", "文字变语音", "音频处理"]
    },
    es: {
      desc: "Generador de voz de IA hiperrealista, clonación de voz y texto a voz en más de 30 idiomas.",
      tags: ["SintesisVoz", "TTS", "Audio"]
    },
    ja: {
      desc: "30以上の言語に対応した超リアルなAI音声合成、声のクローニング、テキスト読み上げエンジン。",
      tags: ["音声合成", "TTS", "オーディオ"]
    },
    de: {
      desc: "Hyperrealistischer Sprachgenerator, Stimmklonen und Text-to-Speech in über 30 Sprachen.",
      tags: ["Sprachsynthese", "TTS", "Audio"]
    },
    fr: {
      desc: "Générateur vocal IA hyperréaliste, clonage de voix et synthèse vocale dans plus de 30 langues.",
      tags: ["SynthèseVocale", "TTS", "Audio"]
    },
    pt: {
      desc: "Gerador de voz IA hiper-realista, clonagem de voz e texto para fala em mais de 30 idiomas.",
      tags: ["SinteseVoz", "TTS", "Áudio"]
    },
    ko: {
      desc: "30개 이상의 언어를 지원하는 초고화질 AI 음성 합성, 음성 복제 및 텍스트 음성 변환 엔진.",
      tags: ["음성합성", "TTS", "오디오"]
    }
  },

  // 8: Perplexity AI
  8: {
    zh: {
      desc: "对话式 AI 搜索引擎，结合实时网络搜索并列出精确参考文献与来源。",
      tags: ["搜索", "学术研究", "引文出处"]
    },
    es: {
      desc: "Motor de respuestas conversacional que ofrece búsqueda web en tiempo real con fuentes citadas.",
      tags: ["Búsqueda", "Investigación", "Citas"]
    },
    ja: {
      desc: "出典元を明記したリアルタイム検索を提供する対話型AI回答エンジン。",
      tags: ["検索", "リサーチ", "引用"]
    },
    de: {
      desc: "Dialogorientierte Antwort-Suchmaschine mit Echtzeit-Websuche und genauen Quellenangaben.",
      tags: ["Suche", "Recherche", "Zitate"]
    },
    fr: {
      desc: "Moteur de réponses conversationnel offrant une recherche Web en temps réel avec références citées.",
      tags: ["Recherche", "Investigation", "Citations"]
    },
    pt: {
      desc: "Mecanismo de respostas conversacional que oferece pesquisa web em tempo real com fontes citadas.",
      tags: ["Pesquisa", "Investigação", "Citações"]
    },
    ko: {
      desc: "출처가 인용된 실시간 웹 검색을 제공하는 대화형 AI 답변 엔진.",
      tags: ["검색", "리서치", "인용"]
    }
  },

  // 9: Replicate
  9: {
    zh: {
      desc: "使用简单 HTTP API 接口在云端无缝运行开源机器学习与大模型推理。",
      tags: ["API", "云端推理", "Llama"]
    },
    es: {
      desc: "Ejecuta modelos de aprendizaje automático en la nube con un punto de enlace API HTTP simple.",
      tags: ["API", "InferenciaNube", "Llama"]
    },
    ja: {
      desc: "シンプルなHTTP APIエンドポイントでオープンソースの機械学習モデルをクラウド上で実行。",
      tags: ["API", "クラウド推論", "Llama"]
    },
    de: {
      desc: "Führen Sie Open-Source-Machine-Learning-Modelle in der Cloud über einen einfachen HTTP-API-Endpunkt aus.",
      tags: ["API", "CloudInferenz", "Llama"]
    },
    fr: {
      desc: "Exécutez des modèles de machine learning open source dans le cloud avec un simple point d'accès API HTTP.",
      tags: ["API", "InférenceCloud", "Llama"]
    },
    pt: {
      desc: "Execute modelos de aprendizado de máquina em nuvem com um ponto de extremidade API HTTP simples.",
      tags: ["API", "InferênciaNuvem", "Llama"]
    },
    ko: {
      desc: "간단한 HTTP API 엔드포인트로 클라우드에서 오픈소스 머신러닝 모델을 실행합니다.",
      tags: ["API", "클라우드추론", "Llama"]
    }
  },

  // 10: ChatGPT
  10: {
    zh: {
      desc: "OpenAI 旗舰对话助手，搭载高级逻辑推理模型，轻松处理复杂问答与专业任务。",
      tags: ["聊天机器人", "GPT-4o", "深度推理"]
    },
    es: {
      desc: "Interfaz conversacional de OpenAI impulsada por modelos de razonamiento avanzado para tareas complejas.",
      tags: ["Chatbot", "GPT-4o", "Razonamiento"]
    },
    ja: {
      desc: "複雑なタスクに対応する高度な推論モデルを搭載したOpenAIのフラッグシップ会話型AI。",
      tags: ["チャットボット", "GPT-4o", "推論"]
    },
    de: {
      desc: "OpenAIs führende KI-Schnittstelle, angetrieben von fortschrittlichen Denkmodellen für komplexe Aufgaben.",
      tags: ["Chatbot", "GPT-4o", "Denkmodell"]
    },
    fr: {
      desc: "Interface conversationnelle phare d'OpenAI alimentée par des modèles de raisonnement avancés.",
      tags: ["Chatbot", "GPT-4o", "Raisonnement"]
    },
    pt: {
      desc: "Interface conversacional carro-chefe da OpenAI alimentada por modelos de raciocínio avançado.",
      tags: ["Chatbot", "GPT-4o", "Raciocínio"]
    },
    ko: {
      desc: "복잡한 작업을 해결하는 고급 추론 모델 기반 OpenAI의 플래그십 대화형 AI.",
      tags: ["챗봇", "GPT-4o", "추론"]
    }
  },

  // 11: Claude AI
  11: {
    zh: {
      desc: "Anthropic 出品的旗舰对话助手，在代码编写、逻辑推理与长文撰写方面出类拔萃。",
      tags: ["Anthropic", "代码编写", "写作辅助"]
    },
    es: {
      desc: "Chatbot insignia de Anthropic, reconocido por su asistencia avanzada en código, razonamiento y redacción.",
      tags: ["Anthropic", "Programación", "Redacción"]
    },
    ja: {
      desc: "高度なコード支援、複雑な推論、明確な文章作成で定評のあるAnthropicの対話型AI。",
      tags: ["Anthropic", "コーディング", "文章作成"]
    },
    de: {
      desc: "Anthropic's führender Chatbot, bekannt für hervorragende Programmierhilfe, Logik und präzises Schreiben.",
      tags: ["Anthropic", "Coden", "Schreiben"]
    },
    fr: {
      desc: "Chatbot phare d'Anthropic reconnu pour son aide avancée au codage, son raisonnement et sa rédaction.",
      tags: ["Anthropic", "Codage", "Rédaction"]
    },
    pt: {
      desc: "Chatbot carro-chefe da Anthropic conhecido por suporte avançado em código, raciocínio e redação.",
      tags: ["Anthropic", "Código", "Redação"]
    },
    ko: {
      desc: "고급 코딩 지원, 논리적 추론 및 정교한 글쓰기로 정평이 난 Anthropic의 대표 챗봇.",
      tags: ["Anthropic", "코딩", "글쓰기"]
    }
  },

  // 12: DeepSeek
  12: {
    zh: {
      desc: "高性能开源推理模型，在数学计算、代码分析与逻辑推导上性价比极高。",
      tags: ["开源", "逻辑推理", "数学分析"]
    },
    es: {
      desc: "Modelos de razonamiento de código abierto con alto rendimiento en matemáticas, código y análisis lógico.",
      tags: ["CódigoAbierto", "Razonamiento", "Matemáticas"]
    },
    ja: {
      desc: "数学、コード、論理分析において圧倒的なコストパフォーマンスを誇るオープンソース推論モデル。",
      tags: ["オープンソース", "推論", "数学"]
    },
    de: {
      desc: "Open-Source-Denkmodelle für extrem kosteneffiziente Mathematik, Code-Analyse und Logik.",
      tags: ["OpenSource", "Denkmodell", "Mathematik"]
    },
    fr: {
      desc: "Modèles de raisonnement open source offrant une analyse mathématique, logique et de code très rentable.",
      tags: ["OpenSource", "Raisonnement", "Maths"]
    },
    pt: {
      desc: "Modelos de raciocínio de código aberto altamente econômicos para matemática, código e análise lógica.",
      tags: ["CódigoAberto", "Raciocínio", "Matemática"]
    },
    ko: {
      desc: "수학, 코딩 및 논리 분석에서 높은 가성비를 제공하는 오픈소스 추론 모델.",
      tags: ["오픈소스", "추론", "수학"]
    }
  },

  // 13: Figma AI
  13: {
    zh: {
      desc: "内置于 Figma 的 AI 辅助套件，支持自动画线框图、填充真文本与智能排版。",
      tags: ["设计", "原型图", "UIUX"]
    },
    es: {
      desc: "Capa de IA integrada en Figma para generar esquemas, reemplazar texto y automatizar diseños.",
      tags: ["Diseño", "Prototipado", "UIUX"]
    },
    ja: {
      desc: "ワイヤーフレームの生成、ダミーテキストの置換、レイアウト自動化を担うFigma内蔵AIツール。",
      tags: ["デザイン", "プロトタイピング", "UIUX"]
    },
    de: {
      desc: "In Figma integrierte KI-Funktionen zur Erstellung von Wireframes, Textplatzhaltern und Layouts.",
      tags: ["Design", "Prototyping", "UIUX"]
    },
    fr: {
      desc: "Assistant IA intégré dans Figma pour générer des maquettes, remplacer du texte et automatiser la mise en page.",
      tags: ["Design", "Prototypage", "UIUX"]
    },
    pt: {
      desc: "Camada de IA integrada ao Figma para criar wireframes, substituir texto temporário e automatizar layouts.",
      tags: ["Design", "Prototipagem", "UIUX"]
    },
    ko: {
      desc: "와이어프레임 생성, 대체 텍스트 채우기 및 레이아웃 자동화를 지원하는 Figma 내장 AI 기능.",
      tags: ["디자인", "프로토타이핑", "UIUX"]
    }
  },

  // 14: Galileo AI
  14: {
    zh: {
      desc: "根据简单的文字描述，秒级生成高保真移动端与 Web 界面设计图。",
      tags: ["UI生成", "导出Figma", "网页设计"]
    },
    es: {
      desc: "Genera pantallas de interfaz de usuario e interfaces móviles de alta fidelidad desde texto.",
      tags: ["GeneraciónUI", "ExportarFigma", "DiseñoWeb"]
    },
    ja: {
      desc: "テキストの説明から高精度なUI画面やモバイルアプリのデザインを瞬時に生成。",
      tags: ["UI生成", "Figmaエクスポート", "Webデザイン"]
    },
    de: {
      desc: "Erstellt aus Textbeschreibungen im Handumdrehen hochauflösende UI-Screens und Mobile-App-Designs.",
      tags: ["UI-Generierung", "FigmaExport", "Webdesign"]
    },
    fr: {
      desc: "Génère des écrans d'interface utilisateur haute fidélité à partir de simples descriptions textuelles.",
      tags: ["GénérationUI", "ExportFigma", "WebDesign"]
    },
    pt: {
      desc: "Gere telas de interface de usuário e apps móveis de alta fidelidade instantaneamente a partir de textos.",
      tags: ["GeraçãoUI", "ExportarFigma", "DesignWeb"]
    },
    ko: {
      desc: "텍스트 설명만으로 고품질 UI 화면과 모바일 앱 디자인을 즉시 생성합니다.",
      tags: ["UI생성", "Figma내보내기", "웹디자인"]
    }
  },

  // 15: Relume
  15: {
    zh: {
      desc: "AI 驱动的网站地图与线框布局构建器，几分钟内完成响应式网页架构设计。",
      tags: ["网站地图", "线框图", "Webflow"]
    },
    es: {
      desc: "Creador de mapas del sitio y maquetas de diseño con IA para crear sitios web en minutos.",
      tags: ["MapaDelSitio", "Bocetos", "Webflow"]
    },
    ja: {
      desc: "AIによるサイトマップとワイヤーフレーム作成ツール。レスポンシブWebデザインを数分で構築。",
      tags: ["サイトマップ", "ワイヤーフレーム", "Webflow"]
    },
    de: {
      desc: "KI-gestützter Generator für Sitemaps und Wireframes zur raschen Erstellung responsiver Websites.",
      tags: ["Sitemaps", "Wireframes", "Webflow"]
    },
    fr: {
      desc: "Générateur de sitemaps et de maquettes fonctionnelles par IA pour concevoir des sites Web en quelques minutes.",
      tags: ["Sitemaps", "Maquettes", "Webflow"]
    },
    pt: {
      desc: "Construtor de mapas de site e wireframes com IA para projetar layouts de sites responsivos em minutos.",
      tags: ["MapasDeSite", "Wireframes", "Webflow"]
    },
    ko: {
      desc: "반응형 웹 레이아웃을 몇 분 만에 기획하는 AI 사이트맵 및 와이어프레임 생성기.",
      tags: ["사이트맵", "와이어프레임", "Webflow"]
    }
  },

  // 16: LangChain
  16: {
    zh: {
      desc: "开源开发者框架，旨在链接大语言模型、上下文记忆与向量数据库管道。",
      tags: ["智能体", "模型链", "Python"]
    },
    es: {
      desc: "Framework de código abierto para encadenar modelos LLM, memoria y vectores de datos externos.",
      tags: ["Agentes", "Encadenamiento", "Python"]
    },
    ja: {
      desc: "LLM、メモリ構造、外部ベクトル検索を連携・チェーン接続するオープンソース開発フレームワーク。",
      tags: ["エージェント", "チェーン", "Python"]
    },
    de: {
      desc: "Open-Source-Framework zur Verknüpfung von LLMs, Speicherstrukturen und Vektordatenbanken.",
      tags: ["Agenten", "Verkettung", "Python"]
    },
    fr: {
      desc: "Framework open source permettant de chainer des LLM, des architectures mémoire et des vecteurs.",
      tags: ["Agents", "Chaînage", "Python"]
    },
    pt: {
      desc: "Framework de código aberto para encadear LLMs, arquiteturas de memória e vetores externos.",
      tags: ["Agentes", "Encadeamento", "Python"]
    },
    ko: {
      desc: "LLM, 메모리 구조, 외부 벡터 데이터베이스를 체이닝하는 오픈소스 개발 프레임워크.",
      tags: ["에이전트", "체이닝", "파이썬"]
    }
  },

  // 17: Ollama
  17: {
    zh: {
      desc: "在本地电脑离线一键运行 Llama 3、Mistral 等开源大语言模型，确保隐私安全。",
      tags: ["本地模型", "隐私保护", "跨平台"]
    },
    es: {
      desc: "Ejecuta potentes modelos de código abierto como Llama 3 y Mistral en tu ordenador sin conexión.",
      tags: ["LLMLocal", "Privacidad", "MacWindows"]
    },
    ja: {
      desc: "Llama 3やMistralなどのオープンソースLLMを自分のPC上で完全オフライン実行。",
      tags: ["ローカルLLM", "プライバシー", "MacWindows"]
    },
    de: {
      desc: "Führen Sie leistungsstarke Open-Source-LLMs wie Llama 3 komplett offline auf Ihrem Computer aus.",
      tags: ["LokalesLLM", "Datenschutz", "MacWindows"]
    },
    fr: {
      desc: "Exécutez de puissants LLM open source comme Llama 3 hors ligne sur votre ordinateur.",
      tags: ["LLMLocal", "Confidentialité", "MacWindows"]
    },
    pt: {
      desc: "Execute LLMs de código aberto como Llama 3 offline no seu próprio computador.",
      tags: ["LLMLocal", "Privacidade", "MacWindows"]
    },
    ko: {
      desc: "Llama 3, Mistral과 같은 오픈소스 LLM을 내 컴퓨터에서 완전 오프라인으로 실행합니다.",
      tags: ["로컬LLM", "개인정보보호", "MacWindows"]
    }
  },

  // 18: Pinecone
  18: {
    zh: {
      desc: "云原生向量数据库，专为高并发 RAG 知识库检索与 AI 智能体数据匹配打造。",
      tags: ["向量数据库", "RAG检索", "Embedding"]
    },
    es: {
      desc: "Base de datos vectorial nativa en la nube para búsquedas RAG rápidas y pipelines de IA.",
      tags: ["BaseDatosVectorial", "RAG", "Incrustaciones"]
    },
    ja: {
      desc: "高速なRAG検索やAIエージェントの照合パイプライン向けクラウドネイティブ型ベクトルDB。",
      tags: ["ベクトルDB", "RAG", "埋め込み"]
    },
    de: {
      desc: "Cloud-native Vektordatenbank-Infrastruktur für schnelle RAG-Suche und KI-Agenten-Pipelines.",
      tags: ["VektorDB", "RAG", "Embeddings"]
    },
    fr: {
      desc: "Infrastructure de base de données vectorielle cloud conçue pour la recherche RAG rapide.",
      tags: ["BaseVectorielle", "RAG", "Plongements"]
    },
    pt: {
      desc: "Infraestrutura de banco de dados vetorial em nuvem para pesquisa RAG rápida e pipelines de IA.",
      tags: ["BancoVetorial", "RAG", "Embeddings"]
    },
    ko: {
      desc: "빠른 RAG 검색과 AI 에이전트 파이프라인을 위해 구축된 클라우드 네이티브 벡터 데이터베이스.",
      tags: ["벡터DB", "RAG", "임베딩"]
    }
  },

  // 19: Groq
  19: {
    zh: {
      desc: "基于 LPU 芯片的超高速推理引擎，为开源 AI 模型提供闪电般的 Token 输出速度。",
      tags: ["硬件芯片", "极速生成", "模型推理"]
    },
    es: {
      desc: "Motor de inferencia LPU que ofrece velocidades de generación de tokens extremas para IA.",
      tags: ["Hardware", "Velocidad", "Inferencia"]
    },
    ja: {
      desc: "LPU推論エンジンにより、オープンソースAIのトークン生成を驚異的なスピードで実行。",
      tags: ["ハードウェア", "爆速", "推論"]
    },
    de: {
      desc: "LPU-Inferenz-Engine mit blitzschneller Token-Generierungsgeschwindigkeit für Open-Source-KI.",
      tags: ["Hardware", "Geschwindigkeit", "Inferenz"]
    },
    fr: {
      desc: "Moteur d'inférence LPU offrant des vitesses de génération de tokens ultra-rapides.",
      tags: ["Matériel", "Vitesse", "Inférence"]
    },
    pt: {
      desc: "Mecanismo de inferência LPU com velocidade ultrarrápida na geração de tokens para IA.",
      tags: ["Hardware", "Velocidade", "Inferência"]
    },
    ko: {
      desc: "LPU 추론 엔진을 통해 오픈소스 AI 모델의 초고속 토큰 생성 속도를 제공합니다.",
      tags: ["하드웨어", "초고속", "추론"]
    }
  },

  // 20: Runway Gen-3
  20: {
    zh: {
      desc: "新一代 AI 视频生成大模型，提供电影级高逼真动态镜头控制与视觉素材。",
      tags: ["视频生成", "文字生成视频", "电影级"]
    },
    es: {
      desc: "Modelo de generación de video de última generación que produce controles de movimiento fotorrealistas.",
      tags: ["GeneraciónVideo", "TextoAVideo", "Cinematográfico"]
    },
    ja: {
      desc: "シネマティックな運動制御と超リアルな映像素材を生成する次世代動画生成AIモデル。",
      tags: ["動画生成", "テキスト動画変換", "映画風"]
    },
    de: {
      desc: "Video-Generierungsmodell der nächsten Generation für hyperrealistische Bewegungssteuerung und Film-Assets.",
      tags: ["Videogenerierung", "TextZuVideo", "Kino"]
    },
    fr: {
      desc: "Modèle de génération vidéo de nouvelle génération produisant des mouvements hyperréalistes.",
      tags: ["GénérationVidéo", "TexteEnVidéo", "Cinéma"]
    },
    pt: {
      desc: "Modelo de geração de vídeo de última geração com controle de movimento hiper-realista.",
      tags: ["GeraçãoVídeo", "TextoParaVídeo", "Cinematográfico"]
    },
    ko: {
      desc: "초실사 모션 제어와 영화적 품질의 자산을 구현하는 차세대 영상 생성 AI 모델.",
      tags: ["비디오생성", "텍스트비디오변환", "영화품질"]
    }
  },

  // 21: Magnific AI
  21: {
    zh: {
      desc: "高级 AI 图片超分辨率变清晰与增强工具，为数字图片注入逼真细节与质感。",
      tags: ["图片高清化", "细节增强", "纹理修正"]
    },
    es: {
      desc: "Escalador y mejorador de imágenes de IA que añade detalles y claridad a las fotos digitales.",
      tags: ["Escalado", "Mejora", "Texturas"]
    },
    ja: {
      desc: "デジタル写真に劇的なディテールと鮮明さを加える高度なAI画像アップスケーラー。",
      tags: ["高画質化", "ディテール補正", "テクスチャ"]
    },
    de: {
      desc: "Erweiterter KI-Bild-Upscaler zur Verbesserung von Details, Schärfe und Texturen in Digitalfotos.",
      tags: ["Hochskalieren", "Verbesserung", "Texturen"]
    },
    fr: {
      desc: "Agrandisseur et améliorateur d'images IA ajoutant des détails et une clarté spectaculaires.",
      tags: ["Agrandissement", "Amélioration", "Textures"]
    },
    pt: {
      desc: "Upscaler e otimizador de imagem avançado com IA que adiciona detalhes incríveis a fotos.",
      tags: ["Upscaling", "Melhoria", "Texturas"]
    },
    ko: {
      desc: "디지털 사진에 극적인 디테일과 선명도를 더해주는 고급 AI 이미지 업스케일러.",
      tags: ["업스케일링", "화질개선", "텍스처"]
    }
  },

  // 22: Krea AI
  22: {
    zh: {
      desc: "实时画布生成与屏幕实时渲染工具，拖拽形状即可无缝渲染精美图案。",
      tags: ["实时渲染", "画布创作", "创意设计"]
    },
    es: {
      desc: "Generación de imágenes en lienzo en tiempo real y flujo de renderizado desde la pantalla.",
      tags: ["TiempoReal", "Lienzo", "Creativo"]
    },
    ja: {
      desc: "キャンバス上の操作や画面描画をリアルタイムでAI生成・スタイリングするクリエイティブツール。",
      tags: ["リアルタイム", "キャンバス", "クリエイティブ"]
    },
    de: {
      desc: "Echtzeit-Bildgenerierung auf einer Zeichenfläche und Rendering aus Bildschirminhalten.",
      tags: ["Echtzeit", "Zeichenfläche", "Kreativ"]
    },
    fr: {
      desc: "Génération d'images sur canvas en temps réel et rendu à partir du flux d'écran.",
      tags: ["TempsRéel", "Canvas", "Créatif"]
    },
    pt: {
      desc: "Geração de imagens em tela em tempo real e estilização direta de fluxos de tela.",
      tags: ["TempoReal", "Canvas", "Criativo"]
    },
    ko: {
      desc: "실시간 캔버스 이미지 생성 및 스크린 렌더링을 지원하는 크리에이티브 AI.",
      tags: ["실시간", "캔버스", "크리에이티브"]
    }
  },

  // 23: Luma Dream Machine
  23: {
    zh: {
      desc: "极速电影感视频生成平台，轻松创建自然平滑的运镜与角色物理动画。",
      tags: ["视频生成", "运镜动画", "3D物理"]
    },
    es: {
      desc: "Generador de video cinematográfico de alta velocidad que crea movimientos de cámara fluidos.",
      tags: ["GeneraciónVideo", "Cinematográfico", "Física3D"]
    },
    ja: {
      desc: "スムーズなカメラワークと自然なキャラクターアニメーションを生成する高速動画AI。",
      tags: ["動画生成", "映画風", "3D物理"]
    },
    de: {
      desc: "Schneller cinematic Videogenerator für flüssige Kamerabewegungen und Charakteranimationen.",
      tags: ["Videogenerierung", "Kino", "3DPhysik"]
    },
    fr: {
      desc: "Générateur vidéo cinématographique rapide créant des mouvements de caméra fluides.",
      tags: ["GénérationVidéo", "Cinéma", "Physique3D"]
    },
    pt: {
      desc: "Gerador de vídeo cinematográfico de alta velocidade com movimentos de câmera suaves.",
      tags: ["GeraçãoVídeo", "Cinematográfico", "Física3D"]
    },
    ko: {
      desc: "자연스러운 카메라 무빙과 캐릭터 애니메이션을 생성하는 고속 영화급 비디오 생성기.",
      tags: ["비디오생성", "영화품질", "3D물리"]
    }
  },

  // 24: Suno AI
  24: {
    zh: {
      desc: "只需一段提示词即可生成具备完整人声与专业编曲的录音室级别歌曲。",
      tags: ["音乐生成", "词曲创作", "AI人声"]
    },
    es: {
      desc: "Crea canciones completas con calidad de estudio, voces e instrumental a partir de texto.",
      tags: ["GeneraciónMúsica", "Composición", "Voces"]
    },
    ja: {
      desc: "プロンプトを入力するだけで、ボーカルと演奏を含むスタジオ品質の楽曲を完全自動生成。",
      tags: ["楽曲生成", "作詞作曲", "ボーカル"]
    },
    de: {
      desc: "Erstellen Sie komplette Songs in Studioqualität mit Gesang und Instrumenten aus einem Prompt.",
      tags: ["Musikgenerierung", "Songwriting", "Gesang"]
    },
    fr: {
      desc: "Générez des chansons complètes de qualité studio avec voix et instruments à partir d'un texte.",
      tags: ["GénérationMusique", "Composition", "Voix"]
    },
    pt: {
      desc: "Gere músicas completas com qualidade de estúdio, vocais e arranjos a partir de texto.",
      tags: ["GeraçãoMúsica", "Composição", "Vocais"]
    },
    ko: {
      desc: "간단한 프롬프트만으로 풍부한 보컬과 악기 연주가 포함된 완성형 곡을 제작합니다.",
      tags: ["음악생성", "작곡작사", "보컬"]
    }
  },

  // 25: Udio
  25: {
    zh: {
      desc: "高级音乐生成系统，擅长高保真声学乐器录音、清晰混音与多流派原声创作。",
      tags: ["音乐创作", "精细混音", "人声声学"]
    },
    es: {
      desc: "Sistema de generación de música que crea rica instrumentación acústica y pistas de sonido profesionales.",
      tags: ["Música", "Voces", "Acústica"]
    },
    ja: {
      desc: "豊かなアコースティック演奏、クリアなマスタリング、立体的なミキシングを実現する音楽AI。",
      tags: ["音楽", "ボーカル", "アコースティック"]
    },
    de: {
      desc: "Musikgenerierungssystem für reiche akustische Instrumentierung und sauberes Mastering.",
      tags: ["Musik", "Gesang", "Akustik"]
    },
    fr: {
      desc: "Système de génération musicale créant des arrangements acoustiques riches et des mixages impeccables.",
      tags: ["Musique", "Voix", "Acoustique"]
    },
    pt: {
      desc: "Sistema de geração de música que produz arranjos acústicos ricos e faixas de som nítidas.",
      tags: ["Música", "Vocais", "Acústica"]
    },
    ko: {
      desc: "풍부한 어쿠스틱 연주, 깨끗한 마스터링 트랙 및 입체 음향을 구현하는 음악 생성기.",
      tags: ["음악", "보컬", "어쿠스틱"]
    }
  },

  // 26: Notion AI
  26: {
    zh: {
      desc: "内置于 Notion 的工作区 AI 助手，智能提炼文档要点、规划任务并解答团队笔记问题。",
      tags: ["协同办公", "文档摘要", "笔记知识库"]
    },
    es: {
      desc: "Asistente de espacio de trabajo que resume documentos, organiza tareas y responde sobre tus notas.",
      tags: ["EspacioTrabajo", "Resumen", "Notas"]
    },
    ja: {
      desc: "ドキュメントの要約、タスクのスケジュール管理、ページ内容に関する質問に答えるNotion内蔵AI。",
      tags: ["ワークスペース", "要約", "ノート"]
    },
    de: {
      desc: "Integrierter Assistent im Workspace zum Zusammenfassen von Dokumenten und zur Aufgabenplanung.",
      tags: ["Workspace", "Zusammenfassung", "Notizen"]
    },
    fr: {
      desc: "Assistant intégré qui résume des documents internes, planifie des tâches et répond aux questions sur vos notes.",
      tags: ["EspaceDeTravail", "Résumé", "Notes"]
    },
    pt: {
      desc: "Assistente de espaço de trabalho que resume documentos, organiza tarefas e responde perguntas sobre notas.",
      tags: ["EspaçoDeTrabalho", "Resumo", "Notas"]
    },
    ko: {
      desc: "문서 요약, 일정 관리, 페이지 내용 질의응답을 지원하는 Notion 통합 AI 헬퍼.",
      tags: ["워크스페이스", "요약", "노트"]
    }
  },

  // 27: Fireflies.ai
  27: {
    zh: {
      desc: "自动会议记录助手，一键录音、转写文字并自动提取关键行动项与待办事项。",
      tags: ["会议纪要", "语音转文字", "CRM整合"]
    },
    es: {
      desc: "Asistente que graba, transcribe y extrae puntos de acción clave de tus videollamadas.",
      tags: ["NotasReunión", "Transcripción", "CRM"]
    },
    ja: {
      desc: "ビデオ会議の録音、文字起こし、重要なアクションアイテムの抽出を自動化するAIツール。",
      tags: ["会議メモ", "文字起こし", "CRM"]
    },
    de: {
      desc: "Automatische Aufzeichnung, Transkription und Extraktion von Aufgaben aus Videokonferenzen.",
      tags: ["MeetingNotizen", "Transkription", "CRM"]
    },
    fr: {
      desc: "Assistant qui enregistre, transcrit et extrait les tâches clés des visioconférences.",
      tags: ["NotesDeRéunion", "Transcription", "CRM"]
    },
    pt: {
      desc: "Assistente que grava, transcreve e extrai tarefas essenciais de suas reuniões por vídeo.",
      tags: ["NotasDeReunião", "Transcrição", "CRM"]
    },
    ko: {
      desc: "화상 회의를 자동 녹음, 자막 변환하고 핵심 실행 과제를 추출해주는 AI 회의록 도구.",
      tags: ["회의록", "음성전환", "CRM"]
    }
  },

  // 28: Gamma
  28: {
    zh: {
      desc: "输入一段文字，即可自动生成美观现代的幻灯片演示文稿、文档与互动网页。",
      tags: ["演示文稿", "PPT生成", "商业路演"]
    },
    es: {
      desc: "Crea presentaciones de diapositivas modernas, documentos y páginas web a partir de descripciones.",
      tags: ["Presentaciones", "Diapositivas", "PitchDecks"]
    },
    ja: {
      desc: "テキストの説明から、美しくモダンなスライド、ドキュメント、Webページを自動作成。",
      tags: ["プレゼン", "スライド", "ピッチデッキ"]
    },
    de: {
      desc: "Erstellen Sie moderne Präsentationen, interaktive Folien und Webseiten aus Textbeschreibungen.",
      tags: ["Präsentationen", "Folien", "PitchDecks"]
    },
    fr: {
      desc: "Générez des présentations modernes, des documents et des pages Web interactives via de simples textes.",
      tags: ["Présentations", "Diapositives", "PitchDecks"]
    },
    pt: {
      desc: "Gere apresentações de slides modernas, documentos e páginas web com descrições de texto.",
      tags: ["Apresentações", "Slides", "PitchDecks"]
    },
    ko: {
      desc: "텍스트 설명만으로 아름답고 현대적인 슬라이드 발표 자료, 문서, 웹페이지를 생성합니다.",
      tags: ["프레젠테이션", "슬라이드", "피치덱"]
    }
  },

  // 29: Otter.ai
  29: {
    zh: {
      desc: "实时语音转文字引擎，支持说话人自动区分、实时会议笔记与关键词高亮。",
      tags: ["音频处理", "实时转写", "商务办公"]
    },
    es: {
      desc: "Motor de voz a texto en tiempo real con identificación de hablantes y resaltado de notas.",
      tags: ["Audio", "Transcripción", "Negocios"]
    },
    ja: {
      desc: "話者分離と自動キーワードタグ機能を備えたリアルタイム音声文字起こしエンジン。",
      tags: ["オーディオ", "文字起こし", "ビジネス"]
    },
    de: {
      desc: "Echtzeit-Sprach-zu-Text-Engine mit automatischer Sprechererkennung und Notiz-Highlights.",
      tags: ["Audio", "Transkription", "Business"]
    },
    fr: {
      desc: "Moteur de synthèse vocale en temps réel avec séparation des intervenants et prise de notes.",
      tags: ["Audio", "Transcription", "Business"]
    },
    pt: {
      desc: "Mecanismo de voz para texto em tempo real com identificação de oradores e notas automáticas.",
      tags: ["Áudio", "Transcrição", "Negócios"]
    },
    ko: {
      desc: "화자 구분 및 자동 메모 생성을 제공하는 실시간 음성-텍스트 자막 전환 엔진.",
      tags: ["오디오", "음성전환", "비즈니스"]
    }
  },

  // 30: AudioCraft
  30: {
    zh: {
      desc: "Meta 开源的深度学习音频代码库，支持高品质音效生成与背景音乐合成。",
      tags: ["开源", "音效合成", "Meta"]
    },
    es: {
      desc: "Biblioteca de código abierto de Meta para generar efectos de sonido y pistas de música.",
      tags: ["CódigoAbierto", "EfectosSonido", "Meta"]
    },
    ja: {
      desc: "効果音や音楽トラックの生成を担うMetaのオープンソース音声AIライブラリ。",
      tags: ["オープンソース", "効果音", "Meta"]
    },
    de: {
      desc: "Meta's Open-Source-Bibliothek für generative Audio-Modelle zur Soundeffekt- und Musikgenerierung.",
      tags: ["OpenSource", "Soundeffekte", "Meta"]
    },
    fr: {
      desc: "Bibliothèque open source de Meta utilisant des modèles audio génératifs pour les effets sonores.",
      tags: ["OpenSource", "EffetsSonores", "Meta"]
    },
    pt: {
      desc: "Biblioteca de código aberto da Meta para geração de efeitos sonoros e trilhas de áudio.",
      tags: ["CódigoAberto", "EfeitosSonoros", "Meta"]
    },
    ko: {
      desc: "음향 효과 및 오디오 트랙 생성을 위한 Meta의 오픈소스 딥러닝 오디오 라이브러리.",
      tags: ["오픈소스", "효과음", "Meta"]
    }
  },

  // 31: NotebookLM
  31: {
    zh: {
      desc: "Google 打造的个性化 AI 研究助手，严格基于您上传的文档提供精准检索与语音导读。",
      tags: ["学术研究", "严格溯源", "语音播客"]
    },
    es: {
      desc: "Asistente de investigación personalizado de Google basado en tus documentos e información de audio.",
      tags: ["Investigación", "BasadoEnFuentes", "ResumenAudio"]
    },
    ja: {
      desc: "アップロードしたドキュメントを情報源とし、音声概要も生成できるGoogleのAIリサーチ助手。",
      tags: ["リサーチ", "グラウンディング", "音声概要"]
    },
    de: {
      desc: "Googles KI-Recherche-Assistent, der auf Ihren hochgeladenen Dokumenten basiert und Audio-Übersichten erstellt.",
      tags: ["Recherche", "Quellenbasiert", "AudioÜbersicht"]
    },
    fr: {
      desc: "Assistant de recherche IA personnalisé de Google fondé sur vos documents et synthèses audio.",
      tags: ["Recherche", "FondéSurSources", "AperçuAudio"]
    },
    pt: {
      desc: "Assistente de pesquisa personalizado do Google baseado em seus próprios documentos com resumos em áudio.",
      tags: ["Pesquisa", "Embasado", "ResumoÁudio"]
    },
    ko: {
      desc: "업로드한 문서를 기반으로 답변하고 오디오 오버뷰를 생성하는 Google의 맞춤형 AI 리서치 도구.",
      tags: ["리서치", "문서기반", "오디오요약"]
    }
  },

  // 32: GitHub Copilot
  32: {
    zh: {
      desc: "原生集成于主流 IDE 中的 AI 结对程序员，提供实时代码补全与智能对话诊断。",
      tags: ["GitHub", "IDE", "自动补全"]
    },
    es: {
      desc: "Programador par de IA integrado en tu IDE para autocompletado de código y chat en tiempo real.",
      tags: ["GitHub", "IDE", "Autocompletado"]
    },
    ja: {
      desc: "IDEにネイティブ統合され、コードの自動補完やチャット支援を提供するAIペアプログラマー。",
      tags: ["GitHub", "IDE", "自動補完"]
    },
    de: {
      desc: "KI-Programmierassistent direkt in Ihrer IDE für Echtzeit-Code-Autovervollständigung und Chat.",
      tags: ["GitHub", "IDE", "Autovervollständigung"]
    },
    fr: {
      desc: "Développeur IA intégré à votre IDE pour l'autoplétion de code et l'assistance en temps réel.",
      tags: ["GitHub", "IDE", "Autoplétion"]
    },
    pt: {
      desc: "Programador em dupla com IA integrado ao seu IDE para autocompletar código e chat em tempo real.",
      tags: ["GitHub", "IDE", "Autocompletar"]
    },
    ko: {
      desc: "실시간 코드 자동 완성 및 대화 지원을 위해 IDE에 통합된 AI 결합 프로그래머.",
      tags: ["GitHub", "IDE", "자동완성"]
    }
  },

  // 33: Flux.1
  33: {
    zh: {
      desc: "Black Forest Labs 出品的顶级开源图像生成模型，具备无与伦比的文字渲染能力与真实度。",
      tags: ["开源", "文字渲染", "超高真感"]
    },
    es: {
      desc: "Suite de generación de imágenes de código abierto de Black Forest Labs con renderizado de texto impecable.",
      tags: ["CódigoAbierto", "RenderizadoTexto", "Fotorrealismo"]
    },
    ja: {
      desc: "文字レンダリングと圧倒的なリアル感を誇るBlack Forest Labsの最新オープン画像生成モデル。",
      tags: ["オープンソース", "文字描画", "フォトリアル"]
    },
    de: {
      desc: "Erstklassige Open-Source-Bildgenerierung von Black Forest Labs mit hervorragender Textdarstellung.",
      tags: ["OpenSource", "TextRendering", "Fotorealismus"]
    },
    fr: {
      desc: "Suite de génération d'images open source de Black Forest Labs offrant un rendu de texte exceptionnel.",
      tags: ["OpenSource", "RenduTexte", "Photoréalisme"]
    },
    pt: {
      desc: "Suíte de geração de imagens de código aberto da Black Forest Labs com renderização de texto impecável.",
      tags: ["CódigoAberto", "RenderizaçãoTexto", "Fotorrealismo"]
    },
    ko: {
      desc: "탁월한 텍스트 렌더링과 실사감을 제공하는 Black Forest Labs의 최첨단 오픈 이미지 생성 수트.",
      tags: ["오픈소스", "텍스트렌더링", "실사화"]
    }
  },

  // 34: Bolt.new
  34: {
    zh: {
      desc: "提示词驱动的全栈 WebContainer 沙盒，直接在浏览器中构建、运行与部署 Web 应用。",
      tags: ["全栈开发", "WebContainer", "快速原型"]
    },
    es: {
      desc: "Sandbox de WebContainer que crea, ejecuta y despliega aplicaciones web directamente en el navegador.",
      tags: ["Fullstack", "WebContainer", "Prototipado"]
    },
    ja: {
      desc: "ブラウザ上でWebアプリを直接構築・実行・デプロイできるプロンプト駆動型WebContainer環境。",
      tags: ["フルスタック", "WebContainer", "プロトタイピング"]
    },
    de: {
      desc: "Prompt-gesteuerte WebContainer-Sandbox zum Erstellen, Ausführen und Deployen von Web-Apps im Browser.",
      tags: ["Fullstack", "WebContainer", "Prototyping"]
    },
    fr: {
      desc: "Environnement WebContainer permettant de concevoir, exécuter et déployer des apps Web dans le navigateur.",
      tags: ["Fullstack", "WebContainer", "Prototypage"]
    },
    pt: {
      desc: "Ambiente WebContainer que constrói, executa e implanta aplicativos web diretamente no navegador.",
      tags: ["Fullstack", "WebContainer", "Prototipagem"]
    },
    ko: {
      desc: "브라우저에서 직접 웹 애플리케이션을 빌드, 실행 및 배포하는 프롬프트 기반 웹컨테이너 환경.",
      tags: ["풀스택", "WebContainer", "프로토타이핑"]
    }
  },

  // 35: Poe by Quora
  35: {
    zh: {
      desc: "Quora 旗下多模型对话平台，在一个界面中自由体验 GPT-4、Claude、Llama 与自定义机器人。",
      tags: ["模型聚合", "多模型", "聊天机器人"]
    },
    es: {
      desc: "Plataforma de chat multimodelo para consultar GPT-4, Claude, Llama y bots personalizados en una sola interfaz.",
      tags: ["Agregador", "Multimodelo", "Chatbots"]
    },
    ja: {
      desc: "GPT-4、Claude、Llama、カスタムボットを1つの画面で利用できるマルチモデルAIプラットフォーム。",
      tags: ["アグリゲーター", "マルチモデル", "チャットボット"]
    },
    de: {
      desc: "Multi-Modell-Chat-Spielwiese, mit der Sie GPT-4, Claude, Llama und eigene Bots auf einer Oberfläche nutzen.",
      tags: ["Aggregator", "MultiModell", "Chatbots"]
    },
    fr: {
      desc: "Plateforme de chat multi-modèles permettant de consulter GPT-4, Claude, Llama et des bots personnalisés.",
      tags: ["Agrégateur", "Multimodèle", "Chatbots"]
    },
    pt: {
      desc: "Plataforma de chat multimodelo para usar GPT-4, Claude, Llama e robôs personalizados em uma só interface.",
      tags: ["Agregador", "Multimodelo", "Chatbots"]
    },
    ko: {
      desc: "GPT-4, Claude, Llama 및 맞춤형 봇을 단일 인터페이스에서 사용할 수 있는 다중 모델 대화 플랫폼.",
      tags: ["애그리게이터", "다중모델", "챗봇"]
    }
  },

  // 36: DeepL Translate
  36: {
    zh: {
      desc: "AI 神经网络翻译引擎，提供极度精准的多语言文本、文档与语音翻译。",
      tags: ["多语言翻译", "本地化", "写作润色"]
    },
    es: {
      desc: "Motor de traducción neuronal de IA que ofrece traducción precisa de texto, documentos y voz en varios idiomas.",
      tags: ["Traducción", "Localización", "Redacción"]
    },
    ja: {
      desc: "高精度な多言語テキスト、ドキュメント、音声翻訳を提供するAIニューラル翻訳エンジン。",
      tags: ["翻訳", "ローカライズ", "文章推敲"]
    },
    de: {
      desc: "Neuronale KI-Übersetzungs-Engine für hochpräzise Übersetzung von Texten, Dokumenten und Sprache.",
      tags: ["Übersetzung", "Lokalisierung", "Schreiben"]
    },
    fr: {
      desc: "Moteur de traduction neuronale IA offrant une traduction ultra-précise de textes, documents et voix.",
      tags: ["Traduction", "Localisation", "Rédaction"]
    },
    pt: {
      desc: "Mecanismo de tradução neural com IA que fornece tradução hiperprecisa de textos, documentos e fala.",
      tags: ["Tradução", "Localização", "Redação"]
    },
    ko: {
      desc: "정확한 다국어 텍스트, 문서 및 음성 번역을 제공하는 AI 신경망 번역 엔진.",
      tags: ["번역", "현지화", "글쓰기"]
    }
  }
};

export function getLocalizedTool(tool: Tool, language: Language): Tool {
  if (!tool) return tool;
  if (language === 'en') return tool;
  const itemTrans = TOOL_TRANSLATIONS[tool.id]?.[language];
  if (!itemTrans) return tool;
  return {
    ...tool,
    desc: itemTrans.desc || tool.desc,
    tags: itemTrans.tags || tool.tags
  };
}
