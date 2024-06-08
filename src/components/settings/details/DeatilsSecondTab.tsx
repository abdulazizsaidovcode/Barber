import React, { useState } from 'react';
import { Checkbox } from 'antd';
import Accordion from '../../accordion/accordion';
import FunctionlityCard from './FunctionlityCard';
import { Buttons } from '../../buttons';
import EditModal from '../modals/editModal';

interface SecondTabData {
  bookingDuration: number;
  bookingPerMonth: number;
  prePaymentCount: number;
  numberOfAlbums: number;
  numberOfFoto: number;
  monthPrice: number;
  yearPrice: number;
}

interface DetailsSecondTabProps {
  data: SecondTabData;
  setData: React.Dispatch<React.SetStateAction<SecondTabData>>;
  onSave: () => void;
}

const DetailsSecondTab: React.FC<DetailsSecondTabProps> = ({ data, setData, onSave }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<keyof SecondTabData | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const showModal = (field: keyof SecondTabData) => {
    setCurrentField(field);
    setCurrentValue(data[field]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (currentField !== null) {
      setData(prevData => ({ ...prevData, [currentField]: currentValue }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(Number(e.target.value));
  };

  const handleCheckboxChange = (field: keyof SecondTabData, isChecked: boolean) => {
    setData(prevData => ({ ...prevData, [field]: isChecked ? 0 : prevData[field] }));
  };

  return (
    <>
      <EditModal
        isOpen={isModalVisible}
        onClose={handleCancel}
        value={currentValue}
        type='number'
        onChange={handleValueChange}
        onSave={handleOk}
      />
      <div className='w-full flex justify-between px-5'>
        <div className='w-1/2 flex flex-col gap-3'>
          <Accordion title='Ограничение длительности бронирования (день)'>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <FunctionlityCard editOnClick={() => showModal('bookingDuration')} title={`${data.bookingDuration ?? "0"}`} />
              </div>
              <div className='w-[30%] flex items-center justify-between'>
                <Checkbox
                  className='dark:text-white'
                  checked={data.bookingDuration === 0}
                  onChange={(e) => handleCheckboxChange('bookingDuration', e.target.checked)}
                >
                  Не ограничено
                </Checkbox>
              </div>
            </div>
          </Accordion>
          <Accordion title='Ограничение бронирований в месяц'>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <FunctionlityCard editOnClick={() => showModal('bookingPerMonth')} title={`${data.bookingPerMonth ?? "0"}`} />
              </div>
              <div className='w-[30%] flex items-center justify-between'>
                <Checkbox
                  className='dark:text-white'
                  checked={data.bookingPerMonth === 0}
                  onChange={(e) => handleCheckboxChange('bookingPerMonth', e.target.checked)}
                >
                  Не ограничено
                </Checkbox>
              </div>
            </div>
          </Accordion>
          <Accordion title='Ограничение бронирований с предоплатой в месяц'>
            <div className='flex justify-between'>
              <div className='w-[66%]'>
                <FunctionlityCard editOnClick={() => showModal('prePaymentCount')} title={`${data.prePaymentCount ?? "0"}`} />
              </div>
              <div className='w-[30%] flex items-center justify-between'>
                <Checkbox
                  className='dark:text-white'
                  checked={data.prePaymentCount === 0}
                  onChange={(e) => handleCheckboxChange('prePaymentCount', e.target.checked)}
                >
                  Не ограничено
                </Checkbox>
              </div>
            </div>
          </Accordion>
        </div>
        <div className='w-1/2 flex flex-col gap-3 px-5'>
          <Accordion title='Ограничение галереи'>
            <div className='flex flex-col justify-between'>
              <p className='mt-3 mb-3 dark:text-white'>Количество альбомов</p>
              <div className='flex justify-between'>
                <div className='w-[66%]'>
                  <FunctionlityCard editOnClick={() => showModal('numberOfAlbums')} title={`${data.numberOfAlbums ?? "0"}`} />
                </div>
                <div className='w-[30%] flex items-center justify-between'>
                  <Checkbox
                    className='dark:text-white'
                    checked={data.numberOfAlbums === 0}
                    onChange={(e) => handleCheckboxChange('numberOfAlbums', e.target.checked)}
                  >
                    Не ограничено
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between'>
              <p className='mt-3 mb-3 dark:text-white'>Количество фото в 1 альбоме</p>
              <div className='flex justify-between'>
                <div className='w-[66%]'>
                  <FunctionlityCard editOnClick={() => showModal('numberOfFoto')} title={`${data.numberOfFoto ?? "0"}`} />
                </div>
                <div className='w-[30%] flex items-center justify-between'>
                  <Checkbox
                    className='dark:text-white'
                    checked={data.numberOfFoto === 0}
                    onChange={(e) => handleCheckboxChange('numberOfFoto', e.target.checked)}
                  >
                    Не ограничено
                  </Checkbox>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion title='Цена тарифа в месяц'>
            <div className='flex flex-col justify-between'>
              <p className='mt-3 mb-3 dark:text-white'>В месяц</p>
              <div className='w-[65%]'>
                <FunctionlityCard editOnClick={() => showModal('monthPrice')} title={`${data.monthPrice ?? "0"}`} />
              </div>
            </div>
            <div className='flex flex-col justify-between'>
              <p className='mt-3 mb-3 dark:text-white'>В год</p>
              <div className='w-[65%]'>
                <FunctionlityCard editOnClick={() => showModal('yearPrice')} title={`${data.yearPrice ?? "0"}`} />
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      <div className='ms-5 mt-3'>
        <Buttons onClick={onSave}>
          Сохранить изменения
        </Buttons>
      </div>
    </>
  );
};

export default DetailsSecondTab;