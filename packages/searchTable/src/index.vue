<template>
  <el-container class="elf-search-table">
    <el-header class="elf-search-table__header" height="fit-content" v-if="$slots.searchItem">
      <elf-search-form
        v-bind="formProps"
        @query="_doQuery"
        @reset="_doReset"
        @config="_doConfig"
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
      <div class="elf-search-table__actions">
        <div class="elf-search-table__actions-title" :class="title ? '' : 'hidden'">{{ title }}</div>
        <div class="elf-search-table__actions-content" :class="title ? '' : 'align-left'" v-if="$slots.actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        v-on="$listeners"
        height="fit-content"
        :border="border"
        :stripe="stripe"
        @sort-change="_sortChange"
        v-loading="loading"
        :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner"
      >
        <el-table-column label="序号" v-if="showNoColumn" width="80">
          <template v-slot="{ $index }">
            {{ $index + 1 + (currentPage - 1) * pageSize }}
          </template>
        </el-table-column>
        <slot></slot>
      </el-table>
      <el-pagination
        v-if="pagination"
        @size-change="_pageSizeChange"
        @current-change="
          () => {
            _emmitEvent();
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
    title: { type: String },
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
    showNoColumn: {
      type: Boolean,
      default: false,
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
  computed: {
    orderKeyName() {
      return this.queryProps.order || this.$ELEMENTFLASK.queryProps.order;
    },
    orderByKeyName() {
      return this.queryProps.orderBy || this.$ELEMENTFLASK.queryProps.orderBy;
    },
    pageKeyName() {
      return this.queryProps.page || this.$ELEMENTFLASK.queryProps.page;
    },
    pageSizeKeyName() {
      return this.queryProps.pageSize || this.$ELEMENTFLASK.queryProps.pageSize;
    },
  },
  methods: {
    _emmitEvent(event = "query") {
      let queryParams = {};
      queryParams[this.orderKeyName] = this.order;
      queryParams[this.orderByKeyName] = this.orderBy;
      if (this.pagination) {
        queryParams[this.pageKeyName] = this.currentPage;
        queryParams[this.pageSizeKeyName] = this.pageSize;
      }
      if (event == "query") {
        this.$refs.tableRef.bodyWrapper.scrollTop = 0;
      }
      this.$emit(event, queryParams);
    },
    _doQuery() {
      this.currentPage = 1;
      this._emmitEvent("query");
    },
    _doReset() {
      this.order = null;
      this.orderBy = null;
      this.currentPage = 1;
      this._emmitEvent("reset");
    },
    _doConfig() {
      this.$emit("config");
    },
    _sortChange(sort) {
      this.order = sort.order;
      this.orderBy = sort.order != null ? sort.prop : null;
      this.currentPage = 1;
      this._emmitEvent("query");
      this.$emit("sortChange", sort);
    },
    _pageSizeChange() {
      this.currentPage = 1;
      this._emmitEvent("query");
    },
    refreshPage() {
      this._doQuery();
    },
    refreshCurrentPage() {
      this._emmitEvent("query");
    },
  },
};
</script>
