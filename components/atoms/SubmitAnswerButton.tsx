'use client'

interface SubmitAnswerButtonProps {
    buttonText: string,
    onClick?: () => void,
    color: string
}

export default function SubmitAnswerButton({ buttonText, onClick, color }: SubmitAnswerButtonProps) {
  return (
    <button
            onClick={onClick}
            className={`submit-answer-button ${color}`}
            type="submit"
        >
            {buttonText}
        </button>
  );
}