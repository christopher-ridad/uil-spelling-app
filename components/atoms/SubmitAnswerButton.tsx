'use client'

interface SubmitAnswerButtonProps {
    id: string
    buttonText: string
}

export default function SubmitAnswerButton({ id, buttonText }: SubmitAnswerButtonProps) {
  return (
    <button id={id} type="submit">
      {buttonText}
    </button>
  );
}