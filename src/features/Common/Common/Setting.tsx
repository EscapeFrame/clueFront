export function UserProfile() {
    return(
        <s.ProfileImage src={myImage} alt="프로필" />
        <s.ProfileName>{name}</s.ProfileName>
        <s.ProfileStudentNumber>{studentNumber}</s.ProfileStudentNumber>
    )
}