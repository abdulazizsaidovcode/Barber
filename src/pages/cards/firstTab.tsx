// FilterComponent.tsx
import React, { useState } from 'react';
import { Select, Input, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  // Toggle visibility of extra filters
  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  // Inline styles for the component
  const styles = {
    mainContainer: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    filterGroup: {
      marginBottom: '16px',
    },
    filterTitle: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    filterInput: {
      width: '100%',
      backgroundColor: '#f0f0f0', // Light gray
    },
    toggleButton: {
      width: '13%',
      backgroundColor: '#f0f0f0',
    },
    extraButton: {
      backgroundColor: '#f0f0f0',
    },
  };

  const tableHeaders = [
    { id: 1, name: 'Картинка' },
    { id: 2, name: 'Мастер' },
    { id: 3, name: 'Тип карты' },
    { id: 4, name: 'Описание' },
    { id: 5, name: 'Ставка”' },
    { id: 6, name: 'Дата открытия"' },
    { id: 7, name: 'Дата окончания' },
    { id: 8, name: 'Дней до окончания' },
    { id: 9, name: 'Статус"' },
  ];
  const tableData = [
    {
      
      nonCashTurnover: '50 000 000',
      allTurnover: '250 000 000',
      totalIncome: '25 000 000',
      incomeSimple: '0',
      incomePremium: '5 000 000',
      incomeVip: '12 000 000',
      masterTotal: '25 000 000',
      anotherSimple: '0',
      familyIncome: '0',
      totalClients: ':',
    },
  ];

  return (
    <div style={styles.mainContainer}>
      {/* Top filters row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder="Search by name"
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select defaultValue="Country" style={styles.filterInput}>
            <Option value="toshkent">Toshkent</Option>
            <Option value="qarshi">Qarshi</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="2024"
            style={styles.filterInput}
            placeholder="Select Year"
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
          </Select>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          style={styles.filterGroup}
          className="flex gap-4"
        >
          <Button
            className="flex items-center justify-center"
            type="primary"
            onClick={toggleExtraFilters}
            style={styles.toggleButton}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button style={styles.extraButton}>Download</Button>
        </Col>
      </Row>

      {/* Extra filters row */}
      {showExtraFilters && (
        <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Input placeholder="Status" style={styles.filterInput} />
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select defaultValue="Service category" style={styles.filterInput}>
              <Option value="toshkent">Toshkent</Option>
              <Option value="qarshi">Qarshi</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select
              defaultValue="2024"
              style={styles.filterInput}
              placeholder="Tariff"
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Button style={styles.extraButton}>Reset</Button>
          </Col>
        </Row>
      )}
      {/* Table piece */}
      <div>
      <MasterTable thead={tableHeaders}>
          {tableData.map((data, index) => (
            <tr key={index} className="dark:text-white">
              <td className="p-5">{}</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.allTurnover}</td>
              <td className="p-5">{data.totalIncome}</td>
              <td className="p-5">{data.incomeSimple}</td>
              <td className="p-5">{data.incomePremium}</td>
              <td className="p-5">{data.incomeVip}</td>
              <td className="p-5">{data.masterTotal}</td>
              <td className="p-5">{data.anotherSimple}</td>
              <td className="p-5">{data.familyIncome}</td>
              <td className="p-5">{data.totalClients}</td>
            </tr>
          ))}
        </MasterTable>
      </div>
    </div>
  );
};

export default FilterComponent;