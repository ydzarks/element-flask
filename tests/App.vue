<template>
  <div id="app">
    <elf-steps>
      <elf-step title="参数模板设定" status="process">hahahha1</elf-step>
      <elf-step
        title="参数模板设定"
        status="process"
        description="请按照模板进行参数上传，支持 xls/xlsx文件,大小不超过 50MB"
      ></elf-step>
    </elf-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      total: 0,
      tableData: [],
      form: {
        name: "",
        gender: "",
      },
    };
  },
  methods: {
    doQuery(page) {
      console.log(page);
      this.loading = true;
      setTimeout(() => {
        this.tableData = [];
        for (let index = 0; index < 200; index++) {
          this.tableData.push({ name: "测试" });
        }
        this.total = 200;
        this.loading = false;
      }, 1000);
    },
    doReset(page) {
      console.log(page);
    },
    configureChange() {
      console.log(arguments);
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  text-align: center;
  height: 100vh;
  width: 100vw;
}

.full-height {
  height: 100%;
}

.full-width {
  width: 100%;
}
</style>
