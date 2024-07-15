import { fabricAPI } from "./lib/fabricAPI";
async function main() {
  console.log('开始注入插件');
  await fabricAPI.init.initFabricAPI();
  console.log('插件注入成功');
}
main()