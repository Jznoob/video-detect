export interface DetectParams {
  model: string;
  threshold: number;
  interval: number;
}

/**
 * 模拟向后端提交视频检测任务，返回任务 ID
 */
export async function detectVideo(file: File, params: DetectParams): Promise<string> {
  console.log('detectVideo', file.name, params);
  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 简单生成一个随机 taskId
  const randomId = Math.random().toString(36).slice(2, 10);
  return randomId;
}
