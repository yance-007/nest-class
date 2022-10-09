import axios, { Method } from 'axios';
import { getConfig } from './index';

const {
  FEISHU_CONFIG: { FEISHU_URL },
} = getConfig();

const request = async ({ url, option = {} }) => {
  
}
