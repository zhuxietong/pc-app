<template>
  <button @click="onClick">OOS</button>
</template>

<script setup lang="ts">

// 在渲染进程的 TypeScript 文件中

declare global {
  interface Window {
    tk: {
      run: () => Promise<void>
    }
  }
}

async function runPlaywright() {
  await window.tk.run()
  // ... 其他操作
}

// async function runPlaywrightLogic() {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   const title = await page.title();
//   await browser.close();
//   return title;
// }

// import _task from "../_task";

const onClick = () => {
  runPlaywright()
  // _task().then((res) => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // })
}

</script>

<style scoped>

</style>