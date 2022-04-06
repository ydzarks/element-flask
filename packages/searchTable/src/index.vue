<template>
  <el-container class="elf-search-table">
    <el-header class="elf-search-table__header" height="fit-content" v-if="$slots.searchItem">
      <elf-search-form
        v-bind="formProps"
        @query="doQuery"
        @reset="doReset"
        @configureChange="
          (params) => {
            $emit('configureChange', params);
          }
        "
      >
        <template>
          <slot name="searchItem"></slot>
        </template>
      </elf-search-form>
    </el-header>
    <el-main class="elf-search-table__body">
      <el-row class="elf-search-table__actions" v-if="$slots.actions">
        <el-col :span="24">
          <slot name="actions"></slot>
        </el-col>
      </el-row>
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        v-on="$listeners"
        height="fit-content"
        :border="border"
        :stripe="stripe"
        @sort-change="sortChange"
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner"
      >
        <slot></slot>
      </el-table>
      <el-pagination
        v-if="pagination"
        @size-change="pageSizeChange"
        @current-change="
          () => {
            emmitEvent();
          }
        "
        :page-sizes="pageSizes"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "elfSearchTable",
  props: {
    stripe: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    formProps: {
      type: Object,
      default: () => ({}),
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: () => [25, 50, 100, 200],
      validator(val) {
        if (val.length >= 1) {
          return true;
        } else {
          console.error("pageSizes必须为长度大于等于1的正整数数组");
          return false;
        }
      },
    },
    pageTotal: {
      type: Number,
      default: 0,
    },
    queryProps: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    elementLoadingText: {
      type: String,
      default: "加载中",
    },
    elementLoadingSpinner: {
      type: String,
      default: "el-icon-loading",
    },
  },
  data() {
    return {
      pageSize: this.pageSizes[0],
      order: null,
      orderBy: null,
      currentPage: 1,
    };
  },
  methods: {
    emmitEvent(event = "query") {
      let queryParams = {};
      queryParams[this.queryProps.order ?? "order"] = this.order;
      queryParams[this.queryProps.orderBy ?? "orderBy"] = this.orderBy;
      if (this.pagination) {
        queryParams[this.queryProps.page ?? "page"] = this.currentPage;
        queryParams[this.queryProps.pageSize ?? "pageSize"] = this.pageSize;
      }
      this.$emit(event, queryParams);
    },
    doQuery() {
      this.currentPage = 1;
      this.emmitEvent("query");
    },
    doReset() {
      this.order = null;
      this.orderBy = null;
      this.currentPage = 1;
      this.emmitEvent("reset");
    },
    sortChange(sort) {
      this.order = sort.order;
      this.orderBy = sort.order != null ? sort.prop : null;
      this.currentPage = 1;
      this.emmitEvent("query");
      this.$emit("sortChange", sort);
    },
    pageSizeChange() {
      this.currentPage = 1;
      this.emmitEvent("query");
    },
  },
};
</script>
