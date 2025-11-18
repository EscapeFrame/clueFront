import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil"; // Added useRecoilState
import { userState } from "@/shared/model/userState";
import * as s from "./styles";
import Button from "@/entities/UI/Button";
import { IoCameraOutline } from "react-icons/io5";
import Customapi from '@/shared/config/api'; // Import Customapi
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const UserSection: React.FC = () => {
    const currentUser = useRecoilValue(userState); // Renamed to avoid conflict with setter
    const [user, setUser] = useRecoilState(userState); // For updating global state
    const navigate = useNavigate(); // Initialize useNavigate

    const [fetchedProfileImageUrl, setFetchedProfileImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await Customapi.get('/api/user/me/image', {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setFetchedProfileImageUrl(imageUrl);
            } catch (error) {
                console.error('Failed to fetch profile image:', error);
                setFetchedProfileImageUrl(null);
            }
        };

        // Only fetch if currentUser is available and has a userId
        if (currentUser && currentUser.userId) {
            fetchProfileImage();
        }

        return () => {
            if (fetchedProfileImageUrl) {
                URL.revokeObjectURL(fetchedProfileImageUrl);
            }
        };
    }, [fetchedProfileImageUrl, currentUser]); // Add currentUser to dependency array

    // If currentUser is not yet loaded, return null or a loading indicator

    const [name, setName] = useState(currentUser?.username || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [grade, setGrade] = useState(currentUser?.grade || "");
    const [classNumber, setClassNumber] = useState(currentUser?.classNo || "");
    const [number, setNumber] = useState(currentUser?.number || "");
    const [description, setDescription] = useState(currentUser?.description || "");
    const [image, setImage] = useState<string | null>(currentUser?.myImage || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // To store the actual file for upload

    if (!currentUser || !currentUser.userId) { // Check for userId to ensure it's a valid user object
        return (
            <s.Section>
                <s.Wrapper>
                    <s.SectionTitle>로그인이 필요합니다</s.SectionTitle>
                    <s.SectionExplan>로그인하여 프로필 정보를 확인하고 관리하세요.</s.SectionExplan>
                </s.Wrapper>
                <Button text={"로그인하기"} width={'150px'} type={0} onClick={() => navigate('/login')} />
            </s.Section>
        );
    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImage(currentUser?.myImage || null); // Revert to current user image if no file selected
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let updatedUser = { ...currentUser }; // Start with current user data

        // 1. Handle Image Update
        if (selectedFile) {
            const imageFormData = new FormData();
            imageFormData.append('image', selectedFile);
            try {
                const imageRes = await Customapi.put('/api/user/me/image', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                updatedUser = { ...updatedUser, myImage: imageRes.data.myImage }; // Assuming API returns updated image URL
                alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
            } catch (error) {
                console.error('프로필 이미지 업데이트 실패:', error);
                alert('프로필 이미지 업데이트에 실패했습니다.');
                return; // Stop if image update fails
            }
        }

        // 2. Handle User Information Update
        const userDataToUpdate: { [key: string]: any } = {};
        if (name !== currentUser?.username) userDataToUpdate.username = name;
        if (grade !== currentUser?.grade) userDataToUpdate.grade = grade;
        if (classNumber !== currentUser?.classNo) userDataToUpdate.classNo = classNumber;
        if (number !== currentUser?.number) userDataToUpdate.number = number;
        if (description !== currentUser?.description) userDataToUpdate.description = description;
        // Email is not editable in the example, but if it were, it would be added here.

        if (Object.keys(userDataToUpdate).length > 0) {
            try {
                const userRes = await Customapi.patch('/api/user', userDataToUpdate);
                updatedUser = { ...updatedUser, ...userRes.data }; // Assuming API returns updated user data
                alert('사용자 정보가 성공적으로 업데이트되었습니다.');
            } catch (error) {
                console.error('사용자 정보 업데이트 실패:', error);
                alert('사용자 정보 업데이트에 실패했습니다.');
                return; // Stop if user info update fails
            }
        } else if (!selectedFile) {
            alert('변경할 내용이 없습니다.');
            return;
        }

        // Update global user state with the new data
        setUser(updatedUser);
    };

    // 백엔드에서 못 불러오면 받아온 사용자 반까지 표시
    const gradeOptions: number[] = Array.from({ length: 3 }, (_, i) => i + 1);
    const classOptions: number[] = Array.from({ length: 4 }, (_, i) => i + 1);

    return (
        <s.Section>
            <s.Wrapper>
                <s.SectionTitle>사용자 정보 수정</s.SectionTitle>
                <s.SectionExplan>프로필 정보를 업데이트하고 관리하세요.</s.SectionExplan>
            </s.Wrapper>

            <s.AvatarArea>
                <s.Avatar src={image || fetchedProfileImageUrl || currentUser?.myImage || undefined} alt="User avatar" />
                <s.AvatarRight>
                    <label>
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                        <s.FileButton><IoCameraOutline />&nbsp; 사진변경</s.FileButton>
                    </label>
                    <s.SubText>SVG, JPG, JPEG, PNG 파일만 업로드 가능합니다.</s.SubText>
                </s.AvatarRight>
            </s.AvatarArea>

            <s.Line />

            <s.FormArea onSubmit={handleSubmit}>
                <s.FormRow>
                    <s.FormGroup>
                        <label>이름<span>*</span></label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                        />
                    </s.FormGroup>

                    <s.FormGroup>
                        <label>이메일<span>*</span></label>
                        <input type="email" value={email} readOnly/>
                    </s.FormGroup>
                </s.FormRow>

                <s.FormRow>
                    <s.FormGroup>
                        <label>학년<span>*</span></label>
                        <s.RadioWrapper>
                            {gradeOptions.map((g: number) => (
                                <label key={g}>
                                    <input
                                        type="radio"
                                        name="grade"
                                        value={g}
                                        checked={grade === g}
                                        onChange={(e) => setGrade(parseInt(e.target.value))}
                                    />
                                    {g}학년
                                </label>
                            ))}
                        </s.RadioWrapper>
                    </s.FormGroup>

                    <s.FormGroup>
                        <label>반<span>*</span></label>
                        <s.RadioWrapper>
                            {classOptions.map((c: number) => (
                                <label key={c}>
                                    <input
                                        type="radio"
                                        name="class"
                                        value={c}
                                        checked={classNumber === c}
                                        onChange={(e) => setClassNumber(parseInt(e.target.value))}
                                    />
                                    {c}반
                                </label>
                            ))}
                        </s.RadioWrapper>
                    </s.FormGroup>
                </s.FormRow>

                <s.FormGroup>
                    <label>번호<span>*</span></label>
                    <input type="number" value={number || ''} onChange={(e) => setNumber(parseInt(e.target.value))} />
                </s.FormGroup>

                <s.FormGroup>
                    <label>소개</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="내용을 입력해주세요."
                    />
                </s.FormGroup>
            </s.FormArea>

            <s.ButtonWrapper>
                <Button text={"저장"} width={'100px'} type={0} onClick={handleSubmit} />
            </s.ButtonWrapper>
        </s.Section>
    );
};
