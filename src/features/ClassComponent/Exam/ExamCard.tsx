import React, { useState, useEffect } from "react"
import * as S from "./styles"

type ExamCardProps = {
  examName: string
  examDate: string
  linkUrl: string
}

export default function ExamCard({ examName, examDate, linkUrl }: ExamCardProps) {
  const [countdown, setCountdown] = useState(3)
  const [clickable, setClickable] = useState(false)

  useEffect(() => {
    if (countdown === 0) {
      setClickable(true)
      return
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleClick = () => {
    if (clickable) {
      window.location.href = linkUrl
    }
  }

  return (
    <S.Card clickable={clickable} onClick={handleClick}>
      <S.InfoWrapper>
        <S.Title>{examName}</S.Title>
        <S.DateText>{examDate}</S.DateText>
      </S.InfoWrapper>
      <S.CountdownText>
        {clickable ? "시험 시작 가능" : `시작까지 ${countdown}초`}
      </S.CountdownText>
    </S.Card>
  )
}