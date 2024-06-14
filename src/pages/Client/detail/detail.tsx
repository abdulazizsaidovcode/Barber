import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { client_full_data, getFileId } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import DetailClient from '../../../components/client_card/detail';
import DefaultLayout from '../../../layout/DefaultLayout';
import userImg from '../../../images/user.png';

const DetailMaster: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = location.pathname.substring(11);
  console.log(id);

  useEffect(() => {
    getClient_data()
  }, []);
  const getClient_data = () => {
    setIsLoading(true);

    axios
      .get(`${client_full_data}${id}`, config)
      .then((response) => {
        const master = response.data.body;
        console.log(master);
        setOrderDetails(master);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <div>
        {isLoading ? (
          <p className="dark:text-white">Loading order details...</p>
        ) : orderDetails ? (
          <div>
            <DetailClient
            getFunc={getClient_data}
              
              StatusNow={orderDetails.chatStatus}
              ClientImg={
                orderDetails.image ? getFileId + orderDetails.image : userImg
              }
              StartData={orderDetails.registrationDate ?? 'Mavjud emas'}
              Telegram={orderDetails.telegram ?? 'Mavjud emas'}
              Clients={orderDetails.masterCount ?? 'Mavjud emas'}
              rejectedOrderCount={orderDetails.canceledOrder ?? 'Mavjud emas'}
              CompOrders={orderDetails.completedOrder ?? 'Mavjud emas'}
              Instagram={orderDetails.instagram ?? 'Mavjud emas'}
              Number={orderDetails.phoneNumber ?? 'Mavjud emas'}
              Region={orderDetails.region ?? 'Mavjud emas'}
              City={orderDetails.district ?? 'Mavjud emas'}
              Age={orderDetails.age ?? 'Mavjud emas'}
              Gender={orderDetails.gender ?? 'Mavjud emas'}
              SurName={orderDetails.lastName ?? 'Mavjud emas'}
              Location={orderDetails.address ?? 'Manzil Mavjud emas'}
              ClientName={orderDetails.firstName ?? 'Mavjud emas'}
              turnover={orderDetails.birthDate ?? 'Mavjud emas'}
              Status={orderDetails.status ?? 'Mavjud emas'}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <p className="dark:text-white">No order details found.</p>
        )}
      </div>{' '}
    </DefaultLayout>
  );
};

export default DetailMaster;
