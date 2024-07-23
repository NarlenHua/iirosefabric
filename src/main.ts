import { init } from "./lib/init";
async function main() {
  try {
    console.log('开始注入插件');
    await init.initFabricAPI();
    console.log('插件注入成功');
  } catch (error) {
    console.log(error);
  }
}
main()