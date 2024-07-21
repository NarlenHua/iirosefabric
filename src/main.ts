import { FabricAPI } from "./lib/fabricAPI";
async function main() {
  try {
    console.log('开始注入插件');
    let api: FabricAPI = new FabricAPI();
    await api.initFabricAPI();
    console.log('插件注入成功');
  } catch (error) {
    console.log(error);
  }
}
main()