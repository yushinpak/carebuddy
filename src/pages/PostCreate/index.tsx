// 게시글 작성 말고, 게시글 수정의 경우에는 카테고리 변경 불가능하도록 수정 !
// + 이미 카테고리가 있을 경우 받아오도록 수정
// groupId -> CommunityId(필드명 수정 필요!)

import React, { useState } from 'react';
import styled from 'styled-components';
import Select from '@/components/common/Select';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const TextAreaWrapper = styled.div`
  margin-bottom: 15px;
`;

const ImageUploadWrapper = styled.div``;

const ImageUploadLabel = styled.label`
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const FileName = styled.span`
  font-size: 14px;
`;

interface PostCreateProps {
  formData: {
    title?: string;
    content?: string;
    communityId?: string;
    postImage: string[];
  };
  onFormDataChange: (data: {
    title?: string;
    content?: string;
    communityId?: string;
    postImage?: string[];
  }) => void;
}

const SpeciesOptions = [
  { value: '', label: '종을 선택해주세요' },
  { value: '0', label: '강아지' },
  { value: '1', label: '고양이' },
];

const SelectOptions = [
  { value: '', label: '그룹을 선택해주세요' },
  { value: '66b5ba8c19ffced581357307', label: '생식기·중성화·유선' },
  { value: '66c687429ac226b8a246a791', label: '생식기·중성화·유선' },
];

const PostCreate: React.FC<PostCreateProps> = ({
  formData,
  onFormDataChange,
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFormDataChange({ ...formData, communityId: event.target.value });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onFormDataChange({ ...formData, content: event.target.value });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ ...formData, title: event.target.value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles(fileArray);

      const fileReaders = fileArray.map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders)
        .then((base64Strings) => {
          onFormDataChange({ ...formData, postImage: base64Strings });
        })
        .catch((error) => console.error('파일 변환 오류:', error));
    }
  };

  return (
    <Container>
      <SelectWrapper>
        <Select selectStyle="square" selectSize="sm" options={SpeciesOptions} />
        <Select
          selectStyle="square"
          selectSize="bg"
          options={SelectOptions}
          value={formData.communityId}
          onChange={handleSelectChange}
        />
      </SelectWrapper>
      <InputWrapper>
        <Input
          inputSize="bg"
          placeholder="제목을 입력해주세요."
          inputPadding="sm"
          value={formData.title}
          onChange={handleTitleChange}
        />
      </InputWrapper>
      <TextAreaWrapper>
        <TextArea
          placeholder="내용을 입력해주세요."
          value={formData.content}
          onChange={handleContentChange}
          style={{ width: '100%', padding: '8px', height: '200px' }}
        />
      </TextAreaWrapper>
      <ImageUploadWrapper>
        <ImageUploadLabel htmlFor="postImage">사진 첨부</ImageUploadLabel>
        <input
          type="file"
          multiple
          accept="image/*"
          id="postImage"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        {imageFiles.map((file) => (
          <ImagePreview key={file.name}>
            <PreviewImage src={URL.createObjectURL(file)} alt="미리보기" />
            <FileName>{file.name}</FileName>
          </ImagePreview>
        ))}
      </ImageUploadWrapper>
    </Container>
  );
};

export default PostCreate;
