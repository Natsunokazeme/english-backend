export interface MidJourneyRequest {
  prompt: string;
  guidance_scale?: number; //1-20 default 7.5 文字相关性 越高越相关
  height?: number; //default 512px 图片高度
  width?: number; //default 512px 图片宽度
  negative_prompts?: string; //负向提示,即不想出现在图片中的内容
  sampler?: string; //default greedy 采样器
  seed?: number; //随机种子
  steps?: number; //default 50 去噪步数，越多越干净 10-100
  style?: string; //default null 风格
  upsample?: number; //default 2 1表示禁用
}

export interface MidJourneyResponse {
  code: number;
  data: string; //base64
  nsfw: number; //0表示图片不违规有效，1表示图片违规无效
}

export interface MidJourneyTokenResponse {
  code: number;
  data: { token: string };
}
