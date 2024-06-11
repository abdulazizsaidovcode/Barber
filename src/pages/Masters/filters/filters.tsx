import { Button, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getDistrict, getMasters } from '../../../helpers/api-function/master/master.tsx';
import masterStore from '../../../helpers/state_managment/master/masterStore.tsx';
import { useTranslation } from 'react-i18next';
import { downloadExcelFile } from '../../../helpers/attachment/file-download.tsx';
import { master_download } from '../../../helpers/api.tsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Filters: React.FC = () => {
  const {
    setData,
    setTotalPage,
    setDistrictData,
    setFilters,
    regionData,
    districtData,
    filters,
    filterObj,
    category,
    isLoading,
    setIsLoading
  } = masterStore();
  const [showExtraFilters, setShowExtraFilters] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    getMasters({
      fullName: filters.searchValue ? filters.searchValue : '',
      regionId: filters.regionValue ? filters.regionValue : '',
      districtId: filters.cityValue ? filters.cityValue : '',
      startDate: datePicker(0),
      endDate: datePicker(1),
      categoryId: filters.serviceCategoryValue ? filters.serviceCategoryValue : '',
      statusName: filters.statusValue ? filters.statusValue : '',
      selfEmployed: filters.selfEmployedStatusValue === true ? true : filters.selfEmployedStatusValue === false ? false : '',
      workPlace: filters.placeOfWorkValue ? filters.placeOfWorkValue : '',
      setData,
      setTotalPage
    });
    if (filters.regionValue) getDistrict(setDistrictData, +filters.regionValue);
  }, [filters]);

  const toggleExtraFilters = (): void => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });

  function datePicker(num: number) {
    let date, month, year;

    if (filters.registrationPeriodValue && filters.registrationPeriodValue[0]) {
      date = filters.registrationPeriodValue[num].date();
      month = filters.registrationPeriodValue[num].month() + 1;
      year = filters.registrationPeriodValue[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${year}-${month}-${date}`;
    }
  }

  const styles = {
    mainContainer: {
      padding: '0 30px',
      marginBottom: '20px'
    },
    filterGroup: {
      marginBottom: '16px'
    },
    filterTitle: {
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    filterInput: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px'
    },
    toggleButton: {
      width: '13%',
      backgroundColor: '#f0f0f0'
    },
    extraButton: {
      backgroundColor: '#f0f0f0'
    }
  };

  return (
    <div style={styles.mainContainer}>
      <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder={t('Search_by_name')}
            value={filters.searchValue}
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
            onChange={(e) => handleInputChange('searchValue', e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder={`Регион`}
            value={filters.regionValue}
            style={styles.filterInput}
            onChange={(value) => handleInputChange('regionValue', value)}
          >
            {regionData.length > 0 && regionData.map(item => (
              <Option value={item.id} key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder={`Город`}
            value={filters.cityValue}
            style={styles.filterInput}
            onChange={(value) => handleInputChange('cityValue', value)}
          >
            {districtData.length > 0 && districtData.map(item => (
              <Option value={item.id} key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup} className="flex gap-4">
          <Button
            className="flex items-center justify-center"
            type="primary"
            onClick={toggleExtraFilters}
            style={styles.toggleButton}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button
            style={styles.extraButton}
            onClick={() => downloadExcelFile(master_download, setIsLoading)}
          >
            {isLoading ? 'loading...' : t('Download')}
          </Button>
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  placeholder={['Дата начала', 'Дата окончания']}
                  value={filters.registrationPeriodValue}
                  style={styles.filterInput}
                  onChange={(date) => handleInputChange('registrationPeriodValue', date)}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={`Категория услуг`}
                value={filters.serviceCategoryValue}
                style={styles.filterInput}
                onChange={(value) => handleInputChange('serviceCategoryValue', value)}
              >
                {category.length > 0 && category.map(item => (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Col>

            {/*reels two*/}
            {/*<Col xs={24} sm={12} md={6} style={styles.filterGroup}>*/}
            {/*  <Select*/}
            {/*    defaultValue="Тип расписания"*/}
            {/*    style={styles.filterInput}*/}
            {/*    onChange={(value) => handleInputChange('scheduleTypeValue', value)}*/}
            {/*  >*/}
            {/*    <Option value="2024">2024</Option>*/}
            {/*    <Option value="2023">2023</Option>*/}
            {/*  </Select>*/}
            {/*</Col>*/}
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={`Статус самозанятых`}
                value={filters.statusValue}
                style={styles.filterInput}
                onChange={(value) => handleInputChange('selfEmployedStatusValue', value)}
              >
                <Option value={true}>Да</Option>
                <Option value={false}>Нет</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={`Статус`}
                value={filters.statusValue}
                style={styles.filterInput}
                onChange={(value) => handleInputChange('statusValue', value)}
              >
                <Option value="ACTIVE">Активный</Option>
                <Option value="BLOCKED">Заблокированный</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={`Место работы`}
                value={filters.placeOfWorkValue}
                style={styles.filterInput}
                onChange={(value) => handleInputChange('placeOfWorkValue', value)}
              >
                <Option value="SALON">Салон</Option>
                <Option value="TO_HOME">Да дому</Option>
                <Option value="ON_SITE">С выездом</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Button onClick={resetFilters} style={styles.extraButton}>Reset</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
