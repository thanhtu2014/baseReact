import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Table } from 'antd';
import { uniqueId } from 'lodash';

import { TableService } from '@/services';
import { PAGE_SIZE } from '@/constants';
import { ReactComponent as ChevronLeftIcon } from '@/assets/images/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from '@/assets/images/icons/chevron-right.svg';
import enUS from 'antd/es/locale/en_US';
import thTH from 'antd/es/locale/th_TH';
import { getCurrentLanguage } from '@/utils/locale';

function TableComponent({
  columns,
  action,
  filterParams = {},
  triggerRefresh,
  defaultFilter,
  fetchDataOnInit = true,
  ...props
}) {
  const pagyFilterDefault = {
    current: 1,
    pageSize: PAGE_SIZE,
  };
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      ...pagyFilterDefault,
    },
  });
  const [tableLocale] = useState(() => {
    const currentLanguage = getCurrentLanguage();
    switch (currentLanguage) {
      case 'en':
        return enUS;
      case 'th':
        return thTH;
      default:
        return enUS;
    }
  });

  const fetchRecords = async () => {
    setIsFetching(true);
    let params = { ...tableParams };

    if (defaultFilter) {
      params = { ...params, ...defaultFilter };
    }

    const resp = await TableService.getList(action, { ...params, ...filterParams });
    const { pagination } = filterParams;
    delete filterParams.pagination;

    if (resp.success) {
      setData(resp.data);
      setTableParams({
        ...tableParams,
        ...filterParams,
        pagination: {
          ...tableParams.pagination,
          ...pagination,
          total: resp.totalCount
        }
      });
    }
    setIsFetching(false);
  };

  useEffect(() => {
    const canFetch = fetchDataOnInit ||
      tableParams.pagination.current !== pagyFilterDefault.current ||
      tableParams.pagination.pageSize !== pagyFilterDefault.pageSize;

    if (canFetch) {
      fetchRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  useEffect(() => {
    if (triggerRefresh) {
      fetchRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh]);

  const handleTableChange = (pagination) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        ...pagination,
      },
    });
  };

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <button className="ant-pagination-item-link" type="button" tabIndex="-1">
          <span role="img" aria-label="right" className="anticon anticon-right">
            <ChevronLeftIcon />
          </span>
        </button>
      );
    }

    if (type === 'next') {
      return (
        <button className="ant-pagination-item-link" type="button" tabIndex="-1">
          <span role="img" aria-label="right" className="anticon anticon-right">
            <ChevronRightIcon />
          </span>
        </button>
      );
    }

    return originalElement;
  };

  return (
    <ConfigProvider locale={tableLocale}>
      <Table
        rowKey={(record) => record.id || uniqueId()}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={{
          itemRender,
          showSizeChanger: true,
          ...tableParams.pagination
        }}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 1024
        }}
        {...props}
        loading={isFetching}
      />
    </ConfigProvider>
  );
}

TableComponent.propTypes = {
  action: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  filterParams: PropTypes.object,
  triggerRefresh: PropTypes.bool,
  defaultFilter: PropTypes.object,
  fetchDataOnInit: PropTypes.bool,
};

export default TableComponent;
