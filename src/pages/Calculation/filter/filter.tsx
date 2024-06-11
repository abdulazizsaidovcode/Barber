import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import moment from "moment";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import { getOrder } from "../../../helpers/api-function/order/orderFunction";
import { getDistrict } from "../../../helpers/api-function/master/master";

const FilterOrder: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const {
    regionData,
    setData,
    districtData,
    statusO,
    setTotalPage,
    setDistrictData,
  } = orderStore();

  const [filters, setFilters] = useState({
    fullName: "",
    regionId: 0,
    districtId: 0,
    orderDate: null,
    categoryName: "",
    orderStatus: "",
    paymentType: "",
  });

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  useEffect(() => {
    const params: any = {
      status: statusO,
      setData: setData,
      setTotalPage: setTotalPage,
      ...filters,
    };

    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (params[key] === "" || params[key] === null || params[key] === 0) {
        delete params[key];
      }
    });

    // Fetch clients data
    getOrder(params);

    console.log(params);
  }, [filters]);

  const handleInputChange = (key: string, value: any) => {
    if (key === "orderDate") {
      value = value ? moment(value).format("YYYY-MM-DD") : null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      fullName: "",
      regionId: 0,
      districtId: 0,
      orderDate: null,
      categoryName: "",
      orderStatus: "",
      paymentType: "",
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-2">
        {/* fullName */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Input
            placeholder="Search by fullname"
            prefix={<IoSearchOutline />}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            value={filters.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </Col>
        {/* regionId */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            placeholder="Region"
            value={filters.regionId || 0}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onChange={(value) => {
              handleInputChange("regionId", value);
              getDistrict(setDistrictData, value);
            }}
          >
            <Select.Option value={0} disabled>
              Select region
            </Select.Option>
            {regionData.length !== 0 ? regionData.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.name}
              </Select.Option>
            )) : (
              <Select.Option disabled>
              No data
            </Select.Option>
            )}
          </Select>
        </Col>
        {/* districtId */}
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            placeholder="City"
            value={filters.districtId || 0}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onChange={(value) => handleInputChange("districtId", value)}
          >
            <Select.Option value={0} disabled >
              Select city
            </Select.Option>
            {districtData.length !== 0 ? districtData.map((district) => (
              <Select.Option key={district.id} value={district.id}>
                {district.name}
              </Select.Option>
            )) : (
              <Select.Option disabled>
              No data
            </Select.Option>
            )}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4 flex gap-4">
          <Button
            className="flex items-center justify-center bg-white w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg bg-white">
            Download
          </Button>
        </Col>
      </Row>
      {showExtraFilters && (
        <Row gutter={[29, 16]} className="mb-2">
          {/* orderDate */}
          <Col xs={14} sm={7} md={4} className="mb-4">
            <DatePicker
              onChange={(date) => handleInputChange("orderDate", date)}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          </Col>
          {/* categoryName */}
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              placeholder="Service Category"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              value={filters.categoryName}
              onChange={(value) => handleInputChange("categoryName", value)}
            >
              <Select.Option value="100">100</Select.Option>
              <Select.Option value="200">200</Select.Option>
            </Select>
          </Col>
          {/* orderStatus */}
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              placeholder="Record Status"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              value={filters.orderStatus}
              onChange={(value) => handleInputChange("orderStatus", value)}
            >
              <Select.Option value="Approved">Approved √</Select.Option>
              <Select.Option value="In_Process">In Process !</Select.Option>
            </Select>
          </Col>
          {/* paymentType */}
          <Col xs={24} sm={12} md={5} className="mb-4">
            <Select
              placeholder="Payment Type"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              value={filters.paymentType}
              onChange={(value) => handleInputChange("paymentType", value)}
            >
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={3} className="mb-4">
            <Button
              className="bg-gray-200 dark:bg-gray-800 rounded-lg w-full dark:text-white"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterOrder;
