import React, { useEffect, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import ChatusersList from '../components/user';
import { Input, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import { IoSearchOutline } from 'react-icons/io5';
import { chat_url, messages_url, sockjs_url } from '../../../helpers/api';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import NewChat from '../newChat';
import Sms from '../sms/sms';
import Notselected from '../components/notselected';
import chatStore from '../../../helpers/state_managment/chat/chatStore.tsx';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { config } from '../../../helpers/token.tsx';
import { GetChatList } from '../../../helpers/api-function/chat/chat.tsx';
import toast from 'react-hot-toast';

const Chatdetail: React.FC = () => {
  const { role, chatData, setChatData } = chatStore();

  const [sidebarWidth, setSidebarWidth] = useState('w-max');
  const [siteBar, setSiteBar] = useState<boolean>(false);
  const [siteBarClass, setSiteBarClass] = useState<string>('');

  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(sessionStorage.getItem('userId'));

  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState<string>('');
  const [stompClient, setStompClient] = useState<any>(null);

  const [fullName, setFullName] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('ALL_MESSAGES');
  const [chatId, setChatId] = useState<string | null>(null);
  const [replyId, setreplyId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    connect();
  }, [adminId]);

  useEffect(() => {
    if (recipientId) {
      fetchMessages(adminId, recipientId);
    }
  }, [recipientId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarWidth('w-1/4');
      } else {
        setSidebarWidth('fixed z-10 left-0');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarWidth((currentWidth) => (currentWidth === 'w-max' ? 'fixed' : 'w-max'));
    setSiteBarClass(() => {
      if (siteBar) {
        setSiteBar(false);
        return 'translate-x-0 left-0 ';
      } else {
        setSiteBar(true);
        return '-translate-x-full -left-10';
      }
    });
  };

  const connect = () => {
    if (adminId) {
      const socket = new SockJS(sockjs_url);
      const stomp = Stomp.over(socket);

      stomp.connect({}, (frame: any) => {
        console.log('Connected: ' + frame);
        setStompClient(stomp);
        stomp.subscribe(`/user/${adminId}/queue/messages`, (response) => {

          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);

        });
      }, (error: any) => {
        console.error('Error connecting: ', error);
      });
    }
  };

  const sendMessage = () => {
    if (stompClient && recipientId) {
      const chatMessage = {
        senderId: adminId,
        recipientId: recipientId,
        content: content,
        isRead: false,
        attachmentIds: []
      };

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      fetchMessages(adminId, recipientId);
      setContent('');
    }
  };

  const fetchMessages = (adminId: string | null, recipientId: string | null) => {
    if (adminId && recipientId) {
      axios.get(`${messages_url}/${adminId}/${recipientId}`, config)
        .then(res => {
          setMessages(res.data.body);
        }).catch(err => {
          console.error(err);
        });
    }
  };

  const readAllMessages = () => {
    axios.get(`${chat_url}/all-message-ready`, config)
      .then(res => {
        toast.success('All messages marked as read successfully');
      }).catch(err => {
        console.log(err);
      });
  };
  // delete message
  useEffect(() => {
    console.log(chatId);
    if (chatId) {
      if (stompClient && stompClient.connected) {
        stompClient.send('/app/deleteMessage', {}, JSON.stringify(chatId));
        fetchMessages(adminId, recipientId);
        console.log("ochdi");
      }
    }
  }, [chatId])

  // edit messagi
  useEffect(() => {
    const editMessage = {
      messageId: editId,
      chatDto: {
        senderId: adminId,
        recipientId: recipientId,
        content: content,
        isRead: false,
        attachmentIds: []
      }
    }
    console.log(editId);

    if (editId && content) {
      if (stompClient && stompClient.connected) {
        stompClient.send('/app/editMessage', {}, JSON.stringify(editMessage));
        fetchMessages(adminId, recipientId);
        console.log("edit boldi");
      }
    } else {
      toast.error("Введите сообщение");
    }
  }, [editId])

  //reply message

  useEffect(() => {
    const replyObj = {
      messageId: replyId,
      chatDto: {
        senderId: adminId,
        recipientId: recipientId,
        content: content,
        isRead: false,
        attachmentIds: []
      }
    }
    console.log(replyId);
    console.log(replyObj);
    

    if (replyId && content) {
      if (stompClient && stompClient.connected) {
        stompClient.send('/app/replay', {}, JSON.stringify(replyObj));
        fetchMessages(adminId, recipientId);
        console.log("reply boldi");
      }
    } else {
      toast.error("Введите сообщение");
    }
  }, [replyId])

  return (
    <div className="h-[92%]">
      <div className="w-full py-5 flex gap-10 items-center flex-wrap ">
        <button onClick={toggleSidebar} className="md:hidden text-black mb-2">
          <CgMenuLeft className="text-[1.5rem] font-bold" />
        </button>

        <Input
          placeholder="Поиск по ФИО"
          prefix={<IoSearchOutline />}
          className="w-56"
          onChange={(e) => {
            const value = e.target.value;
            setFullName(value);
            GetChatList({
              status: role,
              fullName: value,
              setData: setChatData
            });
          }}
        />
        <Select
          defaultValue="ALL_MESSAGES"
          className="w-56"
          dropdownClassName="my-custom-dropdown"
          onChange={(value) => {
            setMessageStatus(value);
            GetChatList({
              status: role,
              messageStatus: value,
              setData: setChatData
            });
          }}
          options={[
            { value: 'ALL_MESSAGES', label: 'Все сообщения' },
            { value: 'UNREAD', label: 'Непрочитанные' },
            { value: 'READ', label: 'Прочитанные' },
          ]}
        />

        <NewChat />
        <Buttons onClick={readAllMessages}>Удалить все прочитанные</Buttons>
      </div>

      <div className="flex w-[100%] h-full relative">
        <div
          className={`${sidebarWidth} ${siteBar} ${siteBarClass} top-[80px] transition-all  md:translate-x-0 -translate-x-full sm:w-2/3 w-3/4 bg-[#eaeaea] drop-shadow-1 dark:bg-[#30303d] md:static fixed md:px-3 p-5  border md:py-5 h-full duration-300 flex flex-col`}>
          <div className='flex justify-end mb-4'>
            <button onClick={toggleSidebar} className="md:hidden text-black dark:text-white mb-2">
              <ArrowLeftOutlined className="text-[1.5rem] font-bold" />
            </button>
          </div>
          <ChatusersList user={chatData} role={role} userIds={setRecipientId} />
        </div>
        <div className="w-full relative ">
          {recipientId ? <Sms editId={setEditId} replyId={setreplyId} chatId={setChatId} senderId={adminId} sendMessage={sendMessage} chat={messages} content={content} setContent={setContent} /> : <Notselected />}
        </div>
      </div>
    </div>
  );
};

export default Chatdetail;
