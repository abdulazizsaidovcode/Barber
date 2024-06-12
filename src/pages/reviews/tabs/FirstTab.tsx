import React, { useState } from 'react';
import { Buttons } from '../../../components/buttons';
import { DatePicker, Input, Rate, Select } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import ReviewsServiceCard from '../cards/ReviewsServiceCard';
import DelModal from '../../../components/settings/modals/delModal';
import { useTranslation } from 'react-i18next';

interface FirstTabProps {
  mainData: {
    allAverageFeedback: number;
    allReviewsCount: number;
    clientAverageFeedback: number;
    clientReviewsCount: number;
    femaleClientCount: number;
    femaleClientFeedback: number;
    femaleMasterCount: number;
    femaleMasterFeedback: number;
    fiveStarFeedbackCount: number;
    fourStarFeedbackCount: number;
    maleClientCount: number;
    maleClientFeedback: number;
    maleMasterCount: number;
    maleMasterFeedback: number;
    masterAverageFeedback: number;
    masterReviewsCount: number;
    oneStarFeedbackCount: number;
    threeStarFeedbackCount: number;
    twoStarFeedbackCount: number;
  };
}

const FirstTab: React.FC<FirstTabProps> = ({ mainData }) => {
  const [showMore, setShowMore] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const openShowMore = () => setShowMore(!showMore);
  const openDelModal = () => setIsDelOpen(true);
  const closeDelModal = () => setIsDelOpen(false);
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className='flex flex-wrap gap-5'>
          <Input
            placeholder={t("Search_by_name")}
            prefix={<IoSearchOutline />}
            className='w-60'
          />
          <Select
            placeholder={t("Region")}
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Регион', label: 'Регион' },
            ]}
          />
          <Select
            placeholder={t("City")}
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Город', label: 'Город' },
            ]}
          />
          <Buttons onClick={openShowMore}>
            {showMore ? <UpOutlined /> : <DownOutlined />}
          </Buttons>
          <Buttons>
            {t("Reset")}
          </Buttons>
        </div>
        {showMore && (
          <div className='flex flex-wrap gap-5 mt-5 '>
            <Select
              placeholder={t("Rating")}
              className='w-60'
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'Город', label: 'Город' },
              ]}
            />
            <Select
              placeholder={t("From_whom")}
              className='w-60'
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'Город', label: 'Город' },
              ]}
            />
            <DatePicker className='w-60' placeholder={t("Date")} />
            <DatePicker className='w-60' placeholder={t("Period")} />
          </div>
        )}
      </div>
      <div>
        <div className='flex md:flex-row gap-3 flex-col reviews-shadow mt-5 items-center bg-white w-full h-max p-5 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4'>
          <div className='md:w-1/3 w-full'>
            <p className='md:text-xl'>{mainData.allAverageFeedback} ({mainData.allReviewsCount} отзывов)</p>
            <p className='md:text-xl'>Мастера - {mainData.masterAverageFeedback} ({mainData.masterReviewsCount})</p>
            <p className='md:text-xl'>Клиенты - {mainData.clientAverageFeedback}  ({mainData.clientReviewsCount})</p>
          </div>
          <div className='md:w-1/3 w-full'>
            <div className='flex'>
              <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5 flex flex-col gap-[2.5px]'>
                <Rate disabled defaultValue={1} className="text-sm mr-2" />
                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                <Rate disabled defaultValue={3} className="text-sm mr-2" />
                <Rate disabled defaultValue={4} className="text-sm mr-2" />
                <Rate disabled defaultValue={5} className="text-sm mr-2" />
              </div>
              <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5'>
                <p className='f'>{mainData.oneStarFeedbackCount} отзывов</p>
                <p className='f'>{mainData.twoStarFeedbackCount} отзывов</p>
                <p className='f'>{mainData.threeStarFeedbackCount} отзывов</p>
                <p className='f'>{mainData.fourStarFeedbackCount} отзывов</p>
                <p className='f'>{mainData.fiveStarFeedbackCount} отзывов</p>
              </div>
            </div>
          </div>
          <div className='md:w-1/3 w-full'>
            <p className='md:text-xl'>Мастера мужчины - {mainData.maleMasterFeedback} ({mainData.maleMasterCount})</p>
            <p className='md:text-xl'>Мастера женщины - {mainData.femaleMasterFeedback} ({mainData.femaleMasterCount})</p>
            <p className='md:text-xl'>Клиенты мужчины - {mainData.maleClientFeedback} ({mainData.maleClientCount})</p>
            <p className='md:text-xl'>Клиенты женщины - {mainData.femaleClientFeedback} ({mainData.femaleClientCount})</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <ReviewsServiceCard
          firstName='Имя'
          lastName='Фамилия'
          starCount={5}
          description='Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!'
          whoIs='Мастер'
          createDate='25.02.2024'
          openDelModal={openDelModal}
        />
      </div>
      <DelModal
        isOpen={isDelOpen}
        onClose={closeDelModal}
      />
    </div>
  );
};

export default FirstTab;