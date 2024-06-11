import MasterTable from '../../components/Tables/MasterTable.tsx';
import { thead } from './data.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuProps, Pagination, Dropdown, Space, Menu } from 'antd';
import Filters from './filters/filters.tsx';
import React, { useState } from 'react';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import images from '../../images/user/user-01.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Modal from '../../components/modals/modal.tsx';
import { Buttons } from '../../components/buttons';
import { updateStatusFunc } from '../../helpers/api-function/master/master.tsx';
import { Toaster } from 'react-hot-toast';

export interface UpdateStatus {
  status: string;
  masterId: string;
}

const MasterTables: React.FC = () => {
  const { data, totalPage, isModal, setIsModal, setData, setTotalPage, isLoading, setIsLoading} = masterStore();
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({ status: '', masterId: '' });
  const { t } = useTranslation();

  const onChange = (page: number, pageSize: number): void => {
    console.log('clicked number:', page);
    console.log('Total page:', pageSize);
  };

  const getItems = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/master/${id}`}>{t('Open')}</Link>
    },
    {
      key: 'ACTIVE',
      label: 'Активный'
    },
    {
      key: 'BLOCKED',
      label: 'Заблокированный'
    }
  ];

  const openIsModal = () => setIsModal(!isModal);

  const handleMenuClick = (e: any, masterId: string) => {
    setUpdateStatus({ status: e.key, masterId });
    openIsModal();
  };

  return (
    <>
      <Toaster position={`top-center`} />
      <Filters />
      <MasterTable thead={thead}>
        {data.length > 0 ? (
          data.map((item, key) => (
            <tr
              key={item.id}
              className={`${key === data.length - 1
                ? ''
                : 'border-b border-[#eee] dark:border-strokedark'
              }`}
            >
              <td className={`min-w-[150px] p-5`}>
                <img
                  src={item.imgUrl ? item.imgUrl : images}
                  alt="img"
                  className={
                    'w-10 h-10 scale-[1.4] rounded-full' + ' object-cover'
                  }
                />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.fullName}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.serviceCategory?.map((c) => (
                    <p key={c}>{c}</p>
                  ))}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.startedWork}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.orderCount}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.rating}</p>
              </td>
              <td className="min-w-[150px] p-5 pt-7 flex items-center justify-between">
                <p
                  className={`${item.status === 'ACTIVE' ? 'bg-green-400' : item.status === 'BLOCKED' ? 'bg-red-500' : 'bg-red-700'} text-white rounded-full py-1 px-3 text-sm font-medium`}
                >
                  {item.status}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      overlay={<Menu onClick={(e) => handleMenuClick(e, item.id)} items={getItems(item.id)} />}
                      placement="bottomLeft"
                      arrow
                    >
                      <CiMenuKebab
                        className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                    </Dropdown>
                  </Space>
                </Space>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.schedule}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.canceled}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.specialization?.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.totalClient}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.phoneNumber}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.workPlace}</p>
              </td>
            </tr>
          ))
        ) : (
          <tr className={`border-b border-[#eee] dark:border-strokedark`}>
            <td
              className="min-w-full text-center py-10 text-xl font-bold"
              colSpan={5}
            >
              Malumot mavjud emas!
            </td>
          </tr>
        )}
      </MasterTable>
      <Pagination
        showSizeChanger={false}
        responsive={true}
        defaultCurrent={1}
        total={totalPage}
        onChange={onChange}
        rootClassName={`mt-10 mb-5 ms-5`}
      />

      {/*modal*/}
      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p className={`font-bold text-xl text-black opacity-80 text-center`}>
              {updateStatus.status === 'ACTIVE' ? 'Активный' : 'Заблокировать'} мастра?
            </p>
          </div>
          <div className={`flex justify-center items-center gap-10 mt-8`}>
            <Buttons
              bWidth={`w-[200px]`}
              onClick={() => updateStatusFunc(updateStatus.masterId, updateStatus.status, setData, setTotalPage, openIsModal, setIsLoading)}
            >{isLoading ? 'loading...' : 'да'}</Buttons>
            <Buttons
              bWidth={`w-[200px]`}
              onClick={openIsModal}
            >нет</Buttons>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MasterTables;
