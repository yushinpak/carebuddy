import { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface FormData {
  title: string;
  content: string;
  communityId: string;
  postImage: string[];
}

const usePostCreate = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    communityId: '',
    postImage: [],
  });

  const handleFormDataChange = (data: {
    title?: string;
    content?: string;
    categoryId?: string;
    postImage?: string[];
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handlePostSubmit = async () => {
    try {
      // mock.onPost('/api/posts').reply((config) => {
      //   const { title, content, groupId, postImage } = JSON.parse(config.data);
      //   console.log('게시물 생성:', { title, content, groupId, postImage });
      //   return [200, { title, content, groupId, postImage }];
      // });
      const response = await axiosInstance.post('posts', {
        ...formData,
        // userId: '66b9b34ae9a13c88c643e361',
        // communityId: '6617c6acb39abf604bbe8dc8',
      }); // 임시. 추후 백엔드에서 엔드포인트 변경 시 수정
      console.log('게시물 생성됨:', response.data);
      alert('게시글 작성 완료');
      onSuccess(); // 임시 - 추가 실행할 로직(변수로 받을 것)
    } catch (error) {
      console.error('게시물 생성 오류', error);
    }
  };

  return { formData, handleFormDataChange, handlePostSubmit };
};

export default usePostCreate;
