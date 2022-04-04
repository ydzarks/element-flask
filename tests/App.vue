<template>
  <div id="app">
    <elf-search-table
      class="full-height full-width"
      :data="tableData"
      :loading="loading"
      :pageTotal="total"
      :formProps="{ labelWidth: '80px' }"
      @query="doQuery"
      @reset="doReset"
    >
      <template v-slot:searchItem>
        <elf-search-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </elf-search-item>
      </template>
      <template>
        <el-table-column prop="date" label="日期" width="180" sortable> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" sortable> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      </template>
    </elf-search-table>
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
      },
    };
  },
  methods: {
    doQuery(page) {
      console.log(page);
      this.loading = true;
      setTimeout(() => {
        this.tableData = [{ name: "测试" }];
        this.total = 200;
        this.loading = false;
      }, 1000);
    },
    doReset(page) {
      console.log(page);
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
