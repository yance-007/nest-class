/* eslint-disable @typescript-eslint/no-var-requires */
import { parse } from 'yaml';
const path = require('path');
const fs = require('fs');

// 读取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = async () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = await fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
